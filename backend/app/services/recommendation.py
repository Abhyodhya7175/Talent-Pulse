from app.models.job import Job
from app.models.user import User


def _split_skills(raw: str | None) -> set[str]:
    if not raw:
        return set()
    return {item.strip().lower() for item in raw.split(",") if item.strip()}


def calculate_match(job: Job, user: User) -> tuple[int, list[str], list[str]]:
    job_skills = _split_skills(job.required_skills)
    user_skills = _split_skills(user.skills)

    if not job_skills:
        return 70, [], []

    matched = sorted(job_skills & user_skills)
    missing = sorted(job_skills - user_skills)
    score = int((len(matched) / len(job_skills)) * 100)

    # Reward near matches to keep recommendations useful while profile is incomplete.
    if 0 < score < 40:
        score = 40

    return score, matched, missing
