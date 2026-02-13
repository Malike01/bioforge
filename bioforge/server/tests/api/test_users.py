from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.core.config import settings
from app.services.user import create_user

def get_admin_header(client, db):
    email = "admin_temp@bioforge.com"
    password = "adminpass"
    user = create_user(db, email=email, password=password, full_name="Temp Admin", is_admin=True)
    
    response = client.post(
        f"{settings.API_V1_STR}/auth/login", 
        data={"username": email, "password": password}
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_create_user_by_admin(client: TestClient, db: Session):
    headers = get_admin_header(client, db)
    
    data = {
        "email": "new_researcher@bioforge.com",
        "password": "newpassword123",
        "full_name": "New Researcher",
        "is_admin": False
    }
    
    response = client.post(f"{settings.API_V1_STR}/users/", json=data, headers=headers)
    
    assert response.status_code == 200
    content = response.json()

    assert content["email"] == data["email"]
    assert "id" in content

def test_create_user_by_guest_fails(client: TestClient):
    data = {
        "email": "hacker@bioforge.com",
        "password": "hacked",
        "full_name": "Hacker",
    }
    response = client.post(f"{settings.API_V1_STR}/users/", json=data)
    
    assert response.status_code == 401