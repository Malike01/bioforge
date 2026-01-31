import pytest
from app.services.bio_validator import BioValidator
from app.schemas.design import DesignValidationRequest, DesignNode, BioType

# Fixture: Creates a common object for testing.
@pytest.fixture
def validator():
    return BioValidator()

def test_dna_cleaning(validator):
    """It tests the cleaning of a dirty DNA sequence."""
    dirty_seq = "  atgc  U  \n "
    clean = validator._validate_dna_sequence(dirty_seq)
    assert clean == "ATGCU"

def test_invalid_dna_chars(validator):
    """It tests for the rejection of invalid characters."""
    bad_seq = "ATGZX" # Z and X are invalid
    result = validator._validate_dna_sequence(bad_seq)
    assert result is None

def test_valid_grammar_flow(validator):
    """Promoter -> RBS """
    # Mock Data
    nodes = [
        DesignNode(id="1", type="custom", position={}, data={"label":"P", "type": BioType.PROMOTER}),
        DesignNode(id="2", type="custom", position={}, data={"label":"R", "type": BioType.RBS})
    ]
    edges = [{"id": "e1", "source": "1", "target": "2"}]
    
    req = DesignValidationRequest(nodes=nodes, edges=edges)
    response = validator.validate(req)
    
    assert response.is_valid is True
    assert len(response.messages) == 0

def test_invalid_grammar_flow(validator):
    """Terminator -> Promoter """
    nodes = [
        DesignNode(id="1", type="custom", position={}, data={"label":"T", "type": BioType.TERMINATOR}),
        DesignNode(id="2", type="custom", position={}, data={"label":"P", "type": BioType.PROMOTER})
    ]
    edges = [{"id": "e1", "source": "1", "target": "2"}]
    
    req = DesignValidationRequest(nodes=nodes, edges=edges)
    response = validator.validate(req)
    
    assert response.is_valid is False
    assert "cannot be followed by" in response.messages[0].message