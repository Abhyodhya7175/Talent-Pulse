from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    project_name: str = "Talent Pulse API"
    api_prefix: str = "/api/v1"
    secret_key: str = "change-this-in-production"
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"
    database_url: str = "sqlite:///./talent_pulse.db"
    allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
