from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator, model_validator


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    environment: str = "development"
    project_name: str = "Talent Pulse API"
    api_prefix: str = "/api/v1"
    secret_key: str = "change-this-in-production"
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"
    database_url: str = "sqlite:///./talent_pulse.db"
    allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    enable_seed_data: bool = True

    @field_validator("environment")
    @classmethod
    def normalize_environment(cls, value: str) -> str:
        return value.strip().lower()

    @model_validator(mode="after")
    def validate_production_settings(self):
        if self.environment == "production":
            if self.secret_key == "change-this-in-production":
                raise ValueError("SECRET_KEY must be set to a strong value in production")
            if self.enable_seed_data:
                raise ValueError("ENABLE_SEED_DATA must be false in production")
        return self

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
