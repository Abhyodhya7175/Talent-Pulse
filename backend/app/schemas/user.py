from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    skills: list[str] = []
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    skills: list[str] | None = None
