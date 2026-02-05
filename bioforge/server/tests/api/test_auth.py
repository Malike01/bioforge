from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.core.config import settings
from app.services.user import create_user

def test_login_access_token(client: TestClient, db: Session):
    email = "login_test@bioforge.com"
    password = "secure_password"
    create_user(db, email=email, password=password, full_name="Login Test User")
    
    login_data = {
        "username": email,
        "password": password
    }
    response = client.post(f"{settings.API_V1_STR}/auth/login", data=login_data)
    
    assert response.status_code == 200
    tokens = response.json()
    assert "access_token" in tokens
    assert tokens["token_type"] == "bearer"

def test_login_wrong_password(client: TestClient, db: Session):
    email = "fail_test@bioforge.com"
    create_user(db, email=email, password="correct_password")
    
    login_data = {
        "username": email,
        "password": "wrong_password"
    }
    response = client.post(f"{settings.API_V1_STR}/auth/login", data=login_data)
    
    assert response.status_code == 401