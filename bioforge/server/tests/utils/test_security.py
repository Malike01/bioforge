from app.utils import security

def test_password_hashing():
    password = "secret_password"
    hashed = security.get_password_hash(password)
    
    assert hashed != password
    assert security.verify_password(password, hashed) is True
    assert security.verify_password("wrong_password", hashed) is False

def test_token_generation():
    email = "test@bioforge.com"
    token = security.create_access_token(subject=email)
    
    assert isinstance(token, str)
    assert len(token) > 0