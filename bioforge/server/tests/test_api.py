from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "BioForge System Operational", "status": "active"}

def test_validate_endpoint_integration():
    """Verifies that the endpoint receives and returns JSON."""
    payload = {
        "nodes": [
            {
                "id": "node-1",
                "type": "custom", 
                "position": {"x": 0, "y": 0},
                "data": {"label": "Promoter", "type": "SO:0000167", "sequence": "AAAA"}
            }
        ],
        "edges": []
    }
    
    response = client.post("/api/v1/design/validate", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    assert "is_valid" in data
    assert "compiled_sequence" in data
    assert data["compiled_sequence"] == "AAAA"