"""
Professional FastAPI Backend for Authenex
Clean, reliable, and fully functional
"""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from PIL import Image
import io
import os
import json
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Authenex AI Analysis API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("❌ WARNING: GEMINI_API_KEY not found in .env file!")
else:
    genai.configure(api_key=API_KEY)
    print("✅ Gemini API configured")

# Pydantic models
class AnalysisResponse(BaseModel):
    trust_score: float
    deepfake_probability: float
    verdict: str
    explanation: str
    details: dict

@app.get("/")
async def root():
    """Health check"""
    return {
        "service": "Authenex Backend",
        "status": "running",
        "version": "1.0.0",
        "gemini_configured": bool(API_KEY)
    }

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze an image for AI generation indicators
    Returns comprehensive forensic analysis
    """
    if not API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")
    
    try:
        print(f"📤 Received file: {file.filename}")
        
        # Read and validate image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        print(f"✅ Image loaded: {image.size}, {image.mode}")
        
        # Initialize Gemini model
        model = genai.GenerativeModel("gemini-1.5-flash")
        print("✅ Gemini model initialized")
        
        # Forensic analysis prompt
        prompt = """Analyze this image for AI generation indicators.

Examine:
- Visual artifacts (smoothing, unnatural textures)
- Anatomical issues (if human subjects)
- Technical markers (noise, compression, edges)
- AI signatures (diffusion patterns, GAN artifacts)

Return ONLY valid JSON (no markdown):
{
  "verdict": "Likely AI-Generated" | "Likely Human-Created" | "Uncertain",
  "confidence": <0-100>,
  "reasoning": "<detailed 2-3 sentence explanation>",
  "findings": [<array of specific issues found>],
  "parameters": {
    "texture_quality": <0-100>,
    "edge_consistency": <0-100>,
    "lighting_coherence": <0-100>,
    "anatomical_accuracy": <0-100 or null>,
    "noise_pattern": <0-100>
  }
}"""
        
        # Generate analysis
        print("🔍 Calling Gemini API...")
        response = model.generate_content([prompt, image])
        raw_text = response.text
        print(f"✅ API responded ({len(raw_text)} chars)")
        
        # Parse JSON response
        clean_text = raw_text.strip()
        clean_text = re.sub(r'```json\s*', '', clean_text)
        clean_text = re.sub(r'```\s*', '', clean_text)
        
        try:
            analysis = json.loads(clean_text)
            print("✅ JSON parsed successfully")
        except json.JSONDecodeError as e:
            print(f"❌ JSON parse error: {e}")
            print(f"Raw text: {raw_text[:500]}")
            raise HTTPException(status_code=502, detail="AI returned invalid JSON")
        
        # Validate required fields
        if "verdict" not in analysis or "confidence" not in analysis:
            raise HTTPException(status_code=502, detail="Missing required fields in analysis")
        
        # Transform to frontend format
        result = {
            "trust_score": 100 - analysis["confidence"] if analysis["verdict"] == "Likely AI-Generated" else analysis["confidence"],
            "deepfake_probability": analysis["confidence"] if analysis["verdict"] == "Likely AI-Generated" else 100 - analysis["confidence"],
            "verdict": analysis["verdict"],
            "explanation": analysis.get("reasoning", "Analysis complete"),
            "details": {
                "findings": [
                    {"category": "AI Detection", "score": 50, "reason": f} 
                    for f in analysis.get("findings", [])
                ],
                **(analysis.get("parameters", {}))
            }
        }
        
        print(f"✅ Analysis complete: {result['verdict']} ({result['deepfake_probability']:.1f}%)")
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
