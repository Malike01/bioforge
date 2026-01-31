from fastapi import APIRouter, HTTPException
from app.schemas.design import DesignValidationRequest, ValidationResponse
from app.services.bio_validator import BioValidator

router = APIRouter()
validator = BioValidator()

@router.post("/validate", response_model=ValidationResponse)
async def validate_circuit(design: DesignValidationRequest):
    """
    It takes the bio-CAD design, checks it against biological rules, 
    and returns the compiled DNA sequence.

    """
    try:
        result = validator.validate(design)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))