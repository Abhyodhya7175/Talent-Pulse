from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.db.database import Base, engine
from app.models import EmploymentType, Job, JobStatus, Notification, User, UserRole


def init_db() -> None:
    Base.metadata.create_all(bind=engine)

    with Session(engine) as session:
        _seed_users(session)
        _seed_jobs(session)
        _seed_notifications(session)
        session.commit()


def _seed_users(session: Session) -> None:
    if session.scalar(select(User.id).limit(1)):
        return

    users = [
        User(
            full_name="Aditi Sharma",
            email="student@talentpulse.dev",
            password_hash=get_password_hash("student123"),
            role=UserRole.STUDENT,
            skills="python,fastapi,postgresql,react",
        ),
        User(
            full_name="Rahul Verma",
            email="recruiter@talentpulse.dev",
            password_hash=get_password_hash("recruiter123"),
            role=UserRole.RECRUITER,
            skills="hiring,screening,interviewing",
        ),
        User(
            full_name="System Admin",
            email="admin@talentpulse.dev",
            password_hash=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            skills="",
        ),
    ]
    session.add_all(users)
    session.flush()


def _seed_jobs(session: Session) -> None:
    if session.scalar(select(Job.id).limit(1)):
        return

    recruiter = session.scalar(select(User).where(User.role == UserRole.RECRUITER))
    if recruiter is None:
        return

    jobs = [
        Job(
            title="Backend Engineer (FastAPI)",
            department="Engineering",
            location="Bengaluru",
            employment_type=EmploymentType.FULL_TIME,
            salary_min=1200000,
            salary_max=1800000,
            required_skills="python,fastapi,postgresql,docker",
            description="Build and scale backend APIs for hiring workflows and recommendation services.",
            status=JobStatus.ACTIVE,
            views=148,
            applicants_count=38,
            ai_shortlisted_count=12,
            posted_by=recruiter.id,
        ),
        Job(
            title="Frontend Intern (React)",
            department="Product",
            location="Remote",
            employment_type=EmploymentType.INTERNSHIP,
            salary_min=250000,
            salary_max=400000,
            required_skills="react,javascript,tailwind,ui",
            description="Support dashboard UI improvements and integrate recruiter-facing features.",
            status=JobStatus.ACTIVE,
            views=93,
            applicants_count=22,
            ai_shortlisted_count=8,
            posted_by=recruiter.id,
        ),
    ]
    session.add_all(jobs)


def _seed_notifications(session: Session) -> None:
    if session.scalar(select(Notification.id).limit(1)):
        return

    student = session.scalar(select(User).where(User.role == UserRole.STUDENT))
    recruiter = session.scalar(select(User).where(User.role == UserRole.RECRUITER))
    if student is None or recruiter is None:
        return

    session.add_all(
        [
            Notification(
                user_id=student.id,
                type="recommendation",
                message="A new high-match role was found for your Python profile.",
            ),
            Notification(
                user_id=recruiter.id,
                type="application",
                message="3 new applicants were received for Backend Engineer (FastAPI).",
            ),
        ]
    )
