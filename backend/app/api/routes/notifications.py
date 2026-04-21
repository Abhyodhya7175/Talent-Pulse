from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.notification import Notification
from app.models.user import User
from app.schemas.notification import NotificationOut

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=list[NotificationOut])
def list_notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = db.scalars(
        select(Notification).where(Notification.user_id == current_user.id).order_by(Notification.created_at.desc())
    ).all()
    return items


@router.patch("/{notification_id}/read", response_model=NotificationOut)
def mark_notification_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = db.get(Notification, notification_id)
    if not item or item.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")

    item.is_read = True
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
