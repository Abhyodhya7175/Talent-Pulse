from datetime import datetime

from pydantic import BaseModel, Field

from app.models.job import EmploymentType, JobStatus


class JobBase(BaseModel):
    title: str = Field(min_length=3, max_length=150)
    department: str = Field(min_length=2, max_length=120)
    location: str = Field(min_length=2, max_length=120)
    employment_type: EmploymentType
    salary_min: int | None = None
    salary_max: int | None = None
    required_skills: list[str] = []
    description: str = Field(min_length=20)
    status: JobStatus = JobStatus.ACTIVE
    expires_at: datetime | None = None


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=150)
    department: str | None = Field(default=None, min_length=2, max_length=120)
    location: str | None = Field(default=None, min_length=2, max_length=120)
    employment_type: EmploymentType | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    required_skills: list[str] | None = None
    description: str | None = Field(default=None, min_length=20)
    status: JobStatus | None = None
    expires_at: datetime | None = None


class JobOut(BaseModel):
    id: int
    title: str
    department: str
    location: str
    employment_type: EmploymentType
    salary_min: int | None
    salary_max: int | None
    required_skills: list[str] = []
    description: str
    status: JobStatus
    views: int
    applicants_count: int
    ai_shortlisted_count: int
    posted_by: int
    created_at: datetime
    expires_at: datetime | None

    model_config = {"from_attributes": True}


class RecommendationOut(JobOut):
    match_score: int
    matched_skills: list[str] = []
    missing_skills: list[str] = []
