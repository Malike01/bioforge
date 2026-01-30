from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BioForge API",
    description="Backend for Synthetic Biology CAD & LIMS",
    version="0.1.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "BioForge System Operational", "status": "active"}

@app.get("/health")
def health_check():
    return {"db": "connected", "ai_service": "standby"}