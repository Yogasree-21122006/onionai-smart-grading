import os
import io
import base64
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from analyzer import analyze_onion_image
from mandi_pricing import get_mandi_rates, calculate_fair_pricing
from shelf_life_advisory import generate_storage_advisory
from certificate_generator import generate_digital_certificate, verify_batch_certificate

app = FastAPI(
    title="OnionAI - Smart Onion Grading & Fair Pricing Ecosystem API",
    description="Empowering Indian farmers with edge-ready computer vision grading and anti-exploitation market valuation",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PricingRequest(BaseModel):
    grade: str
    quantity_kg: float
    market_id: Optional[str] = "coimbatore"

class StorageAdvisoryRequest(BaseModel):
    grade: str
    defect_pct: float
    quantity_kg: float

class CertificateRequest(BaseModel):
    grade: str
    size_category: str
    defect_rate: float
    fair_rate_per_kg: float
    quantity_kg: float
    market_name: str
    farmer_name: Optional[str] = "Farmer Ravi"
    location: Optional[str] = "Coimbatore, Tamil Nadu"
    app_url_base: Optional[str] = "https://onionai-smart-grading.vercel.app"

@app.get("/")
def root():
    return {
        "app": "OnionAI API",
        "status": "Online",
        "mission": "Zero Post-Harvest Loss & Fair Farmer Valuation"
    }

@app.post("/api/grade")
async def grade_onion_image(file: UploadFile = File(...)):
    """Accepts image upload (from camera or file), performs CV analysis and returns grades, sizing, defects & overlays."""
    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Empty image uploaded")
        
        result = analyze_onion_image(image_bytes)
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")

@app.get("/api/preset/{preset_name}")
def grade_preset_image(preset_name: str):
    """Executes instant analysis on pre-calibrated sample images (grade_a, grade_b, grade_c, batch_tray)"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_map = {
        "grade_a": os.path.join(base_dir, "sample_images", "grade_a_export.jpg"),
        "grade_b": os.path.join(base_dir, "sample_images", "grade_b_medium.jpg"),
        "grade_c": os.path.join(base_dir, "sample_images", "grade_c_mold_sprout.jpg"),
        "batch_tray": os.path.join(base_dir, "sample_images", "batch_tray.jpg")
    }
    
    file_path = file_map.get(preset_name)
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Preset sample image not found")
        
    with open(file_path, "rb") as f:
        image_bytes = f.read()
        
    result = analyze_onion_image(image_bytes)
    return JSONResponse(content=result)

@app.get("/api/mandi-rates")
def list_mandi_rates():
    """Returns live simulated e-NAM / AGMARKNET market rates across major Indian APMCs"""
    return {"markets": get_mandi_rates()}

@app.post("/api/calculate-price")
def get_price_estimation(payload: PricingRequest):
    """Calculates fair price, estimated batch value and farmer savings vs middleman lowball rates"""
    result = calculate_fair_pricing(payload.grade, payload.quantity_kg, payload.market_id)
    return result

@app.post("/api/storage-advisory")
def get_storage_advisory(payload: StorageAdvisoryRequest):
    """Returns shelf-life prediction and value-added product processing recommendations (powder/paste)"""
    result = generate_storage_advisory(payload.grade, payload.defect_pct, payload.quantity_kg)
    return result

@app.post("/api/generate-certificate")
def create_certificate(payload: CertificateRequest):
    """Generates tamper-evident digital grading pass with SHA-256 hash & live scannable QR Code"""
    result = generate_digital_certificate(
        grade=payload.grade,
        size_category=payload.size_category,
        defect_rate=payload.defect_rate,
        fair_rate_per_kg=payload.fair_rate_per_kg,
        quantity_kg=payload.quantity_kg,
        market_name=payload.market_name,
        farmer_name=payload.farmer_name,
        location=payload.location,
        app_url_base=payload.app_url_base or "https://onionai-smart-grading.vercel.app"
    )
    return result

@app.get("/api/verify/{batch_id}")
def verify_certificate(batch_id: str):
    """Public verification lookup for buyers, traders and judges"""
    result = verify_batch_certificate(batch_id)
    return result

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
