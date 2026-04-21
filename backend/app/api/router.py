from fastapi import APIRouter

from app.api.routes import auth, jobs, notifications, recommendations, users

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(jobs.router)
api_router.include_router(recommendations.router)
api_router.include_router(notifications.router)
