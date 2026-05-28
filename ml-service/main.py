"""FastAPI ML service — internal use by Node.js backend only."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from predict import run_prediction

app = FastAPI(title="Skincare ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    Age: int = Field(..., ge=1, le=120)
    Skin_Type: str
    Skin_Tone: str
    Climate: str
    Diet: str
    Hormonal_Status: str
    Budget_Level: str
    Acne_Severity: float = Field(..., ge=0, le=10)
    Dryness_Severity: float = Field(..., ge=0, le=10)
    Pigmentation_Severity: float = Field(..., ge=0, le=10)
    Aging_Severity: float = Field(..., ge=0, le=10)
    Sensitivity_Severity: float = Field(..., ge=0, le=10)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(body: PredictRequest):
    try:
        return run_prediction(body.model_dump())
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}") from exc
