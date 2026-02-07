# Authenex Backend

Professional FastAPI backend for AI content analysis.

## Setup

1. **Install Python 3.9+**

2. **Create virtual environment:**

   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure API key:**
   - Copy `.env` file
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_key_here
     ```

5. **Run server:**
   ```bash
   uvicorn main:app --reload
   ```

Server runs on: http://localhost:8000

## API Endpoints

### `GET /`

Health check

### `POST /analyze`

Image analysis

**Request:** multipart/form-data with file
**Response:**

```json
{
  "trust_score": 75.5,
  "deepfake_probability": 24.5,
  "verdict": "Likely Human-Created",
  "explanation": "...",
  "details": {
    "findings": [...],
    "texture_quality": 85,
    ...
  }
}
```

## Features

- ✅ FastAPI (modern, fast)
- ✅ Gemini 1.5 Flash (reliable model)
- ✅ Comprehensive error handling
- ✅ Detailed logging
- ✅ CORS configured for frontend
- ✅ Forensic-grade prompting
