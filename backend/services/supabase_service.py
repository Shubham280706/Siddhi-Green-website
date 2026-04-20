import logging
import os

from supabase import create_client, Client

from utils.retry import with_retry

logger = logging.getLogger(__name__)

TABLE = "contact_submissions"


def _get_client() -> Client:
    return create_client(
        os.environ["SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_KEY"],
    )


@with_retry(max_attempts=3, delay=1.5, backoff=2.0)
def insert_submission(data: dict) -> None:
    client = _get_client()
    client.table(TABLE).insert({
        "name":    data["name"],
        "email":   data["email"],
        "phone":   data["phone"],
        "company": data.get("company", ""),
        "service": data["service"],
        "message": data["message"],
    }).execute()
    logger.info("Supabase row inserted for %s", data["email"])
