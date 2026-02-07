
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    # Write error to file so we can see it
    with open("available_models.txt", "w", encoding="utf-8") as f:
        f.write("No API key found in env")
    exit()

genai.configure(api_key=api_key)

try:
    with open("models.txt", "w", encoding="utf-8") as f:
        f.write("MODELS_START\n")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                if "gemini" in m.name:
                    # Print first 30 chars only to avoid wrapping
                    short_name = m.name[:40] 
                    f.write(f"MODEL:{short_name}\n")
        f.write("MODELS_END\n")
    print("Done")
except Exception as e:
    print(f"Error: {e}")
