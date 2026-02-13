from pydantic import BaseModel
from datetime import datetime

class TicketCreate(BaseModel):
    subject: str
    category: str
    message: str

class TicketResponse(BaseModel):
    id: int
    subject: str
    created_at: datetime
    is_resolved: bool

    class Config:
        from_attributes = True