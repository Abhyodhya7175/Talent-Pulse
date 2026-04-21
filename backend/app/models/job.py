from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class JobStatus(str, Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    DRAFT = "draft"
    EXPIRED = "expired"


class EmploymentType(str, Enum):
    FULL_TIME = "full-time"
    PART_TIME = "part-time"
    CONTRACT = "contract"
    INTERNSHIP = "internship"


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    department: Mapped[str] = mapped_column(String(120), nullable=False)
    location: Mapped[str] = mapped_column(String(120), nullable=False)
    employment_type: Mapped[EmploymentType] = mapped_column(SqlEnum(EmploymentType), nullable=False)
    salary_min: Mapped[int | None] = mapped_column(Integer, nullable=True)
    salary_max: Mapped[int | None] = mapped_column(Integer, nullable=True)
    required_skills: Mapped[str | None] = mapped_column(Text, nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[JobStatus] = mapped_column(SqlEnum(JobStatus), default=JobStatus.ACTIVE, nullable=False, index=True)
    views: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    applicants_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    ai_shortlisted_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    posted_by: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    posted_by_user = relationship("User", back_populates="jobs")
