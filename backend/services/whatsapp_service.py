import logging
import os
import re

from twilio.rest import Client

from utils.retry import with_retry

logger = logging.getLogger(__name__)

SERVICE_MAP = {
    "eia": "Environmental Impact Assessment",
    "sustainability": "Sustainability Consulting",
    "waste": "Waste Management",
    "audit": "Environmental Auditing",
    "quality": "Air & Water Quality Management",
    "green": "Green Building Certification",
    "other": "Other",
}


def _normalise_phone(raw: str) -> str:
    """Strips spaces/dashes; prepends +91 for bare 10-digit Indian numbers."""
    phone = re.sub(r"[\s\-()]", "", raw)
    if not phone.startswith("+"):
        digits = re.sub(r"\D", "", phone)
        if len(digits) == 10:
            phone = "+91" + digits
        else:
            phone = "+" + digits
    return phone


@with_retry(max_attempts=3, delay=2.0, backoff=2.0)
def send_whatsapp_confirmation(data: dict) -> str:
    client = Client(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"])

    phone = _normalise_phone(data.get("phone", ""))
    service_label = SERVICE_MAP.get(data.get("service", ""), data.get("service", "N/A"))
    admin_phone = os.environ.get("ADMIN_PHONE", "our office")

    body = (
        f"Hello {data['name']}! 👋\n\n"
        f"Thank you for reaching out to *Siddhi Green Enviro Solutions*.\n\n"
        f"We've received your enquiry regarding *{service_label}* "
        f"and our team will get back to you within 24 hours.\n\n"
        f"📧 Enquiry registered for: {data['email']}\n\n"
        f"For urgent queries call us: {admin_phone}\n\n"
        f"Best regards,\nSiddhi Green Team 🌿"
    )

    message = client.messages.create(
        from_=f"whatsapp:{os.environ['TWILIO_WHATSAPP_FROM']}",
        to=f"whatsapp:{phone}",
        body=body,
    )
    logger.info("WhatsApp sent to %s (SID: %s)", phone, message.sid)
    return message.sid
