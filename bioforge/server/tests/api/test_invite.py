from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.invitation import Invitation

def test_invite_user_by_admin(
    client: TestClient, 
    db: Session, 
    admin_token_headers: dict, 
    mocker
):
    mock_send_email = mocker.patch("app.api.endpoints.invite.send_invite_email")
    
    # 2. Request Data
    email_to_invite = "colleague@uni.edu"
    data = {"email": email_to_invite}
    
    # 3.Submit Request (with Admin Token)
    response = client.post(
        f"{settings.API_V1_STR}/invite/", 
        json=data, 
        headers=admin_token_headers
    )
    
    # 4. Controllers
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    
    # Has a record been created in the database
    invite_record = db.query(Invitation).filter(Invitation.email == email_to_invite).first()
    assert invite_record is not None
    assert invite_record.token is not None
    
    mock_send_email.assert_called_once() # Since it runs in the background, check if it's synchronizing in the test environment.
    
def test_invite_user_by_guest_fails(client: TestClient):
    # Trial without token
    data = {"email": "hacker@bioforge.com"}
    response = client.post(f"{settings.API_V1_STR}/invite/", json=data)
    ""
    assert response.status_code == 401