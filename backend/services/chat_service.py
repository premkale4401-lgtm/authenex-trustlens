
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment")
else:
    genai.configure(api_key=GEMINI_API_KEY)

# Strict System Prompt for Forensic Persona
SYSTEM_PROMPT = """
You are AUTHENEX AI, a production-grade forensic intelligence assistant.

ROLE & PURPOSE:
- You are a domain-locked forensic AI embedded inside a cybersecurity product.
- You are NOT a general virtual assistant.
- Your primary functions are: Deepfake detection, AI-generated content identification, Media authenticity analysis, and Trust/Risk explanation.

STRICT BEHAVIOR PROTOCOLS:
1.  **Probabilistic Only**: NEVER output absolute certainty (e.g., "This IS a deepfake"). ALWAYS use probabilistic language (e.g., "High likelihood of manipulation", "Indicators suggest AI generation").
2.  **No Slang/Emojis**: Maintain a calm, professional, and authoritative tone suitable for legal/enterprise environments.
3.  **Concise**: Default responses must be short and precise. Use bullet points for analysis. Expand only if asked for "details", "why", or "how".
4.  **Safety First**: 
    - NEVER accuse specific individuals of crimes.
    - NEVER provide legal advice.
    - NEVER claim your analysis is court-admissible proof.
    - If a user asks for advice on committing fraud or generating deepfakes, politely REFUSE and redirect to ethical usage.

ANALYSIS LOGIC (Follow these frameworks):

- **IMAGE ANALYSIS**:
  - Scan for: GAN noise, texture uniformity, lighting coherence, edge inconsistencies, facial symmetry artifacts.
  - Output Format: Verdict (Human/AI/Uncertain), Confidence Score (%), Top 3 Indicators, Risk Level (Low/Med/High).

- **AUDIO ANALYSIS**:
  - Scan for: Spectral consistency, phase alignment, breath pattern realism, compression mismatch.
  - Output Format: Authenticity Likelihood, Confidence Score (%), Primary Anomaly.

- **TEXT AUTHENTICITY**:
  - Scan for: Perplexity variance, repetition entropy, semantic drift.
  - Output Format: "High likelihood of AI assistance", "Inconclusive", etc.

VOICE MODE SPECIFIC (If mode="voice"):
- Keep sentences extremely short.
- Pause between sections.
- Read confidence percentages slowly.
- Use spoken-friendly explanations (avoid complex Markdown tables).

DISCLAIMER:
All forensic outputs must end/include: "This analysis provides a probabilistic assessment and is not legal proof."
"""

# strict model selection logic
def get_best_model():
    try:
        print("DEBUG: Listing available models...")
        all_models = list(genai.list_models())
        chat_models = [m for m in all_models if 'generateContent' in m.supported_generation_methods]
        
        print(f"DEBUG: Found {len(chat_models)} chat models: {[m.name for m in chat_models]}")
        
        # Priority: Flash (speed/cost) > Pro (quality) > Any
        # We explicitly look for these strings in the name
        priorities = ['flash', 'gemini-1.5-pro', 'gemini-1.0-pro', 'gemini-pro']
        
        for p in priorities:
            for m in chat_models:
                if p in m.name and 'vision' not in m.name: # Avoid vision-only if separate
                    print(f"DEBUG: Selected model: {m.name}")
                    return genai.GenerativeModel(m.name)
        
        # Fallback to first available
        if chat_models:
            print(f"DEBUG: Fallback model: {chat_models[0].name}")
            return genai.GenerativeModel(chat_models[0].name)
            
        raise Exception("No models with 'generateContent' capability found.")
        
    except Exception as e:
        print(f"ERROR selecting model: {e}")
        # Final fallback
        return genai.GenerativeModel('gemini-pro')

model = get_best_model()

async def get_chat_response(message: str, history: list = [], mode: str = "text"):
    """
    Generates a response from Authenex AI based on message and history.
    Args:
        message: The user's input message.
        history: List of previous chat messages (dict with 'role' and 'parts').
        mode: 'text' or 'voice' - adjusts response brevity.
    """
    try:
        print(f"DEBUG: Input Message: {message}")
        print(f"DEBUG: Mode: {mode}")
        
        # Verify Key
        if not GEMINI_API_KEY:
             raise Exception("Server Error: GEMINI_API_KEY is not set.")

        # sanitize history for Gemini
        # Gemini expects history as: [{'role': 'user', 'parts': ['msg']}, {'role': 'model', 'parts': ['msg']}]
        gemini_history = []
        for msg in history:
            role = msg.get('role')
            parts = msg.get('parts', [])
            
            # Extract text from parts if it's a list of dicts from frontend
            # Frontend sends: parts: [{ text: "..." }]
            # Gemini Python SDK often prefers parts as list of strings or proper Content objects
            text_parts = []
            for p in parts:
                if isinstance(p, dict) and 'text' in p:
                    text_parts.append(p['text'])
                elif isinstance(p, str):
                    text_parts.append(p)
            
            if role and text_parts:
                gemini_history.append({'role': role, 'parts': text_parts})

        print(f"DEBUG: Processed History: {gemini_history}")

        # Construct chat session
        chat = model.start_chat(history=gemini_history)
        
        full_prompt = f"{SYSTEM_PROMPT}\n\n[USER INPUT]: {message}"
        if mode == "voice":
            full_prompt += "\n\n[INSTRUCTION]: Respond for VOICE OUTPUT. Be brief, spoken-friendly, no complex formatting."

        print("DEBUG: Sending message to Gemini...")
        response = chat.send_message(full_prompt)
        print("DEBUG: Response received.")
        
        return {
            "response": response.text,
            "confidence": 0.0,
            "risk_level": "N/A"
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"CRITICAL ERROR in get_chat_response: {e}")
        return {
            "response": f"System Error: {str(e)}", # Return actual error to user for debugging (MVP only)
            "error": str(e)
        }
