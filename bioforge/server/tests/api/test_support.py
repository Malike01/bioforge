from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.support import SupportTicket

def test_create_support_ticket(client: TestClient, db: Session, normal_user_token_headers: dict):
    # 1. Ticket Data
    data = {
        "subject": "App crashes on login",
        "category": "bug",
        "message": "When I try to login with Safari, it crashes."
    }

    # 2. Request
    response = client.post(
        f"{settings.API_V1_STR}/support/",
        json=data,
        headers=normal_user_token_headers
    )

    # 3.Controller Response
    assert response.status_code == 200
    content = response.json()
    assert content["subject"] == data["subject"]
    assert content["is_resolved"] is False

    # DB Control
    ticket = db.query(SupportTicket).filter(SupportTicket.subject == data["subject"]).first()
    assert ticket is not None
    assert ticket.category == "bug"