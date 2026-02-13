from pathlib import Path
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.core.config import settings

TEMPLATE_FOLDER = Path(__file__).parent.parent / 'templates'

# We will be switching to AWS SES
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=TEMPLATE_FOLDER
)

async def send_invite_email(email_to: str, inviter_name: str, invite_link: str):
    message = MessageSchema(
        subject=f"{inviter_name} invited you to collaborate on BioForge",
        recipients=[email_to],
        template_body={
            "inviter_name": inviter_name,
            "action_url": invite_link,
            "project_name": "BioForge"
        },
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message, template_name="invite_email.html")