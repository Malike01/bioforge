from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.core.config import settings
from app.services.user import create_user
from bioforge.server.app.models.user import User
from bioforge.server.tests.conftest import admin_token_headers, db

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

    def test_delete_user_by_admin(client: TestClient, db: Session, admin_token_headers: dict):
    user_to_delete = create_user(db, email="delete_me@bio.com", password="123", full_name="Delete Me")
    user_id = user_to_delete.id

    response = client.delete(
        f"{settings.API_V1_STR}/users/{user_id}",
        headers=admin_token_headers
    )

    # 3. Control
    assert response.status_code == 200
    # Was it deleted from the database
    deleted_user = db.query(User).filter(User.id == user_id).first()
    assert deleted_user is None

def test_admin_cannot_delete_self(client: TestClient, db: Session):
    # 1.Create an admin account and get a token
    email = "suicide_admin@bio.com"
    password = "admin"
    admin_user = create_user(db, email=email, password=password, is_admin=True)
    
    # Log-in
    login_res = client.post(f"{settings.API_V1_STR}/auth/login", data={"username": email, "password": password})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Try to erase yourself
    response = client.delete(
        f"{settings.API_V1_STR}/users/{admin_user.id}",
        headers=headers
    )

    # 3.400 Bad Request
    assert response.status_code == 400
    assert "cannot delete your own" in response.json()["detail"]

def test_delete_user_by_non_admin_fails(client: TestClient, db: Session):
    normal_user = create_user(db, email="normal@bio.com", password="123")
    # Log-in
    login_res = client.post(f"{settings.API_V1_STR}/auth/login", data={"username": "normal@bio.com", "password": "123"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Try to delete someone else.
    target_user = create_user(db, email="target@bio.com", password="123")
    
    response = client.delete(
        f"{settings.API_V1_STR}/users/{target_user.id}",
        headers=headers
    )

    # 3. 403 Forbidden
    assert response.status_code == 403