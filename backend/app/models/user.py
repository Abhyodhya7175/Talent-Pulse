from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import DateTime, Enum as SqlEnum, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class UserRole(str, Enum):
    STUDENT = "student"
    RECRUITER = "recruiter"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(SqlEnum(UserRole), nullable=False, index=True)
    skills: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    jobs = relationship("Job", back_populates="posted_by_user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
