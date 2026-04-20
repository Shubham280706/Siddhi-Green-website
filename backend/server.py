import asyncio
import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Configure logging early so all modules pick it up
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


VALID_SERVICES = {
    "eia", "sustainability", "waste", "audit", "quality", "green", "other"
}


class ContactFormData(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = ""
    service: str
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name is required")
        if len(v) > 120:
            raise ValueError("Name must be under 120 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_valid(cls, v: str) -> str:
        import re
        digits = re.sub(r"\D", "", v)
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must contain 7–15 digits")
        return v.strip()

    @field_validator("service")
    @classmethod
    def service_valid(cls, v: str) -> str:
        if v not in VALID_SERVICES:
            raise ValueError(f"Invalid service. Choose one of: {', '.join(sorted(VALID_SERVICES))}")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message is required")
        if len(v) > 2000:
            raise ValueError("Message must be under 2000 characters")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str
    results: dict


# ---------------------------------------------------------------------------
# Existing routes
# ---------------------------------------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check["timestamp"], str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


# ---------------------------------------------------------------------------
# Contact form endpoint
# ---------------------------------------------------------------------------

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(form: ContactFormData):
    data = form.model_dump()
    results = {"supabase": False, "whatsapp": False}
    errors = []

    # Run all three integrations concurrently; failures are non-fatal and logged.
    async def run_supabase():
        try:
            from services.supabase_service import insert_submission
            await asyncio.to_thread(insert_submission, data)
            results["supabase"] = True
        except Exception as exc:
            logger.error("Supabase insert failed: %s", exc)
            errors.append(f"supabase: {exc}")

    async def run_whatsapp():
        try:
            from services.whatsapp_service import send_whatsapp_confirmation
            await asyncio.to_thread(send_whatsapp_confirmation, data)
            results["whatsapp"] = True
        except Exception as exc:
            logger.error("WhatsApp failed: %s", exc)
            errors.append(f"whatsapp: {exc}")

    await asyncio.gather(run_supabase(), run_whatsapp())

    logger.info(
        "Contact form processed for %s | supabase=%s whatsapp=%s",
        data["email"], results["supabase"], results["whatsapp"],
    )

    # Return 200 even if some integrations failed – the submission itself succeeded.
    return ContactResponse(
        success=True,
        message="Thank you! We'll get back to you within 24 hours.",
        results=results,
    )


# ---------------------------------------------------------------------------
# App wiring
# ---------------------------------------------------------------------------

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
