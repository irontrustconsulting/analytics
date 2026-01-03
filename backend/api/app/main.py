from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.config.app_config import AppConfig
from app.config.template_registry import QueryRegistry
from app.db.athena import AthenaExecutor
from app.api.v1.routes import router as analytics_router
from app.api.v2.v2_routes import router as v2_router

# Load .env so CONFIG_BUCKET becomes available
load_dotenv()

def create_app() -> FastAPI:
    app = FastAPI(title="Cyber Analytics API")

    # ---------------------------------------------------
    # 1) Load app_config.json from S3
    # ---------------------------------------------------
    config_bucket = os.getenv("APP_CONFIG_BUCKET")
    if not config_bucket:
        raise RuntimeError("Missing CONFIG_BUCKET in environment variables (.env)")

    config = AppConfig.load_from_s3(bucket=config_bucket)
    app.state.config = config

    # ---------------------------------------------------
    # 2) Load SQL templates from the bucket/prefix in config
    # ---------------------------------------------------
    app.state.registry = QueryRegistry(config)

    # ---------------------------------------------------
    # 3) Create Athena executor
    # ---------------------------------------------------
    app.state.executor = AthenaExecutor()

    # ---------------------------------------------------
    # (optional) Debug print
    # ---------------------------------------------------
    print(f"Loaded {len(app.state.registry.templates.registry)} SQL templates")
    # print("AppConfig loaded:", config.model_dump())

    # ---------------------------------------------------
    # 4) Add CORS (React frontend needs this)
    # ---------------------------------------------------
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],     # for dev only; tighten later
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ---------------------------------------------------
    # 5) Mount routes
    # ---------------------------------------------------
    app.include_router(analytics_router, prefix="/v1/tenants")
    app.include_router(v2_router, prefix="/v2")

    return app


app = create_app()
