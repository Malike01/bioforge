from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.api import deps
from app.core.database import get_db
from app.models.user import User
from app.models.invitation import Invitation
from app.core.mail import send_invite_email
from app.core.config import settings

router = APIRouter()

class InviteRequest(BaseModel):
    email: EmailStr

@router.post("/")
async def invite_user(
    invite_in: InviteRequest,
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
):

    invitation = Invitation(
        email=invite_in.email,
        sender_id=current_user.id
    )
    db.add(invitation)
    db.commit()
    db.refresh(invitation)
    
    invite_link = f"{settings.FRONTEND_URL}/register?token={invitation.token}"
    
    background_tasks.add_task(
        send_invite_email, 
        email_to=invite_in.email, 
        inviter_name=current_user.full_name or "A colleague", 
        invite_link=invite_link
    )
    
    return {"status": "success", "message": "Invitation sent"}