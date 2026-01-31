from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

# 1. Sequence Ontology ID
class BioType(str, Enum):
    PROMOTER = "SO:0000167"
    RBS = "SO:0000139"
    CDS = "SO:0000316"
    TERMINATOR = "SO:0000141"
    UNKNOWN = "unknown"

class BioComponentData(BaseModel):
    label: str
    type: BioType
    sequence: Optional[str] = None # DNA sequence (ATGC...)

# 3. React Flow Node
class DesignNode(BaseModel):
    id: str
    type: str = "default" # React Flow node type
    data: BioComponentData
    position: Dict[str, float]

# 4. React Flow Edge
class DesignEdge(BaseModel):
    id: str
    source: str
    target: str

# 5. API Request
class DesignValidationRequest(BaseModel):
    nodes: List[DesignNode]
    edges: List[DesignEdge]

# 6. API Response
class ValidationMessage(BaseModel):
    node_id: Optional[str] = None
    message: str
    severity: str # "error", "warning", "info"

class ValidationResponse(BaseModel):
    is_valid: bool
    messages: List[ValidationMessage]
    compiled_sequence: Optional[str] = None