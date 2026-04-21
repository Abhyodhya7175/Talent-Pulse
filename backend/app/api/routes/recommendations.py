from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.db.database import get_db
from app.models.job import Job, JobStatus
from app.models.user import User, UserRole
from app.schemas.job import RecommendationOut
from app.services.recommendation import calculate_match

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("", response_model=list[RecommendationOut])
def get_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.STUDENT)),
):
    jobs = db.scalars(select(Job).where(Job.status == JobStatus.ACTIVE).order_by(Job.created_at.desc())).all()
    result: list[RecommendationOut] = []

    for job in jobs:
        score, matched_skills, missing_skills = calculate_match(job, current_user)
        result.append(
            RecommendationOut(
                id=job.id,
                title=job.title,
                department=job.department,
                location=job.location,
                employment_type=job.employment_type,
                salary_min=job.salary_min,
                salary_max=job.salary_max,
                required_skills=[item.strip() for item in (job.required_skills or "").split(",") if item.strip()],
                description=job.description,
                status=job.status,
                views=job.views,
                applicants_count=job.applicants_count,
                ai_shortlisted_count=job.ai_shortlisted_count,
                posted_by=job.posted_by,
                created_at=job.created_at,
                expires_at=job.expires_at,
                match_score=score,
                matched_skills=matched_skills,
                missing_skills=missing_skills,
            )
        )

    return sorted(result, key=lambda item: item.match_score, reverse=True)
