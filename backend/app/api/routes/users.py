from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserOut, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


def _to_user_out(user: User) -> UserOut:
    skills = [item.strip() for item in (user.skills or "").split(",") if item.strip()]
    return UserOut(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        role=user.role,
        skills=skills,
        created_at=user.created_at,
    )


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return _to_user_out(current_user)


@router.patch("/me", response_model=UserOut)
def update_me(payload: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if payload.full_name is not None:
        current_user.full_name = payload.full_name
    if payload.skills is not None:
        current_user.skills = ",".join(sorted({skill.strip() for skill in payload.skills if skill.strip()}))

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return _to_user_out(current_user)
