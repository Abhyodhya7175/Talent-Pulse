from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_role
from app.db.database import get_db
from app.models.job import Job, JobStatus
from app.models.user import User, UserRole
from app.schemas.job import JobCreate, JobOut, JobUpdate

router = APIRouter(prefix="/jobs", tags=["jobs"])


def _skills_to_text(skills: list[str]) -> str:
    return ",".join(sorted({skill.strip() for skill in skills if skill.strip()}))


def _to_job_out(job: Job) -> JobOut:
    return JobOut(
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
    )


@router.get("", response_model=list[JobOut])
def list_jobs(
    q: str | None = Query(default=None, description="Search by title, department, location, or skills"),
    status_filter: JobStatus | None = Query(default=None, alias="status"),
    only_mine: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Job)
    filters = []

    if q:
        term = f"%{q.strip()}%"
        filters.append(
            or_(
                Job.title.ilike(term),
                Job.department.ilike(term),
                Job.location.ilike(term),
                Job.required_skills.ilike(term),
            )
        )

    if status_filter:
        filters.append(Job.status == status_filter)

    if only_mine:
        filters.append(Job.posted_by == current_user.id)

    if current_user.role == UserRole.STUDENT:
        filters.append(Job.status == JobStatus.ACTIVE)

    if filters:
        query = query.where(and_(*filters))

    jobs = db.scalars(query.order_by(Job.created_at.desc())).all()
    return [_to_job_out(job) for job in jobs]


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    job.views += 1
    db.add(job)
    db.commit()
    db.refresh(job)
    return _to_job_out(job)


@router.post("", response_model=JobOut, status_code=status.HTTP_201_CREATED)
def create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.RECRUITER, UserRole.ADMIN)),
):
    job = Job(
        title=payload.title,
        department=payload.department,
        location=payload.location,
        employment_type=payload.employment_type,
        salary_min=payload.salary_min,
        salary_max=payload.salary_max,
        required_skills=_skills_to_text(payload.required_skills),
        description=payload.description,
        status=payload.status,
        expires_at=payload.expires_at,
        posted_by=current_user.id,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return _to_job_out(job)


@router.patch("/{job_id}", response_model=JobOut)
def update_job(
    job_id: int,
    payload: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.RECRUITER, UserRole.ADMIN)),
):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    if current_user.role == UserRole.RECRUITER and job.posted_by != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only edit your own postings")

    updates = payload.model_dump(exclude_unset=True)
    if "required_skills" in updates and updates["required_skills"] is not None:
        updates["required_skills"] = _skills_to_text(updates["required_skills"])

    for field, value in updates.items():
        setattr(job, field, value)

    db.add(job)
    db.commit()
    db.refresh(job)
    return _to_job_out(job)


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.RECRUITER, UserRole.ADMIN)),
):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    if current_user.role == UserRole.RECRUITER and job.posted_by != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only delete your own postings")

    db.delete(job)
    db.commit()
