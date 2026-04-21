# Talent Pulse Backend (FastAPI)

FastAPI backend for role-based authentication, recruiter job posting management, student recommendations, and notifications.

## Features

- JWT authentication (`register`, `login`)
- Role-based access (`student`, `recruiter`, `admin`)
- Recruiter/Admin job CRUD APIs
- Student recommendation API with basic skill-match scoring
- User profile API (`/users/me`)
- Notifications list + mark-as-read
- SQLite persistence with startup seed data

## Quick Start

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

API docs: http://127.0.0.1:8000/docs

## Seed Accounts

- Student: `student@talentpulse.dev` / `student123`
- Recruiter: `recruiter@talentpulse.dev` / `recruiter123`
- Admin: `admin@talentpulse.dev` / `admin123`

## API Prefix

All API routes are under `/api/v1`.

## Main Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `GET /api/v1/jobs`
- `POST /api/v1/jobs`
- `PATCH /api/v1/jobs/{job_id}`
- `DELETE /api/v1/jobs/{job_id}`
- `GET /api/v1/recommendations`
- `GET /api/v1/notifications`
- `PATCH /api/v1/notifications/{notification_id}/read`
