import logging
from app.core.database import SessionLocal
from app.core.config import settings
from app.services.user import create_user, get_user_by_email

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db() -> None:
    db = SessionLocal()
    
    user = get_user_by_email(db, email=settings.ADMIN_EMAIL)
    
    if not user:
        logger.info(f"Creating admin user: {settings.ADMIN_EMAIL}")
        create_user(
            db=db,
            email=settings.ADMIN_EMAIL,
            password=settings.ADMIN_PASSWORD,
            full_name="System Administrator",
            is_admin=True
        )
    else:
        logger.info("Superuser already exists.")
    
    db.close()

if __name__ == "__main__":
    init_db()