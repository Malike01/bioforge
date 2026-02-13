from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.api import deps
from app.core.database import get_db
from app.models.user import User
from app.models.support import SupportTicket
from app.schemas.support import TicketCreate, TicketResponse
from app.core.mail import send_invite_email 

router = APIRouter()

@router.post("/", response_model=TicketResponse)
def create_ticket(
    ticket_in: TicketCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
):
    ticket = SupportTicket(
        user_id=current_user.id,
        subject=ticket_in.subject,
        category=ticket_in.category,
        message=ticket_in.message
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    print(f"NEW TICKET: User {current_user.email} opened a ticket: {ticket.subject}")

    return ticket