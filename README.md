# Authenex - AI Content Detection Platform

## Security Notice

**⚠️ IMPORTANT: API Keys are Protected**

The following files are **automatically ignored** by Git (never committed):

- `.env.local` ✅
- `.env` ✅
- `.env.*` ✅

Your `GEMINI_API_KEY` will **never** be pushed to GitHub.

## Quick Start

1. **Add API Key**

   ```bash
   # Edit frontend/.env.local
   GEMINI_API_KEY=your_actual_key_here
   ```

2. **Start Application**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access**
   - Open: http://localhost:3000
   - Login with Google
   - Navigate to Dashboard → Analyze
   - Upload image for AI detection

## Features

- **AI-Generated Content Detection**
  - Image forensic analysis
  - Detailed quality scoring (5 metrics)
  - Specific issue identification
  - Confidence ratings

- **No Python Backend Required**
  - 100% Next.js/TypeScript
  - Fast, reliable analysis
  - Simple deployment

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Gemini 1.5 Flash API
- Firebase (Auth & Firestore)
- NextAuth.js
- TailwindCSS

## Environment Variables

Required in `frontend/.env.local`:

```
GEMINI_API_KEY=          # Get from ai.google.dev
GOOGLE_CLIENT_ID=        # Google OAuth
GOOGLE_CLIENT_SECRET=    # Google OAuth
NEXTAUTH_SECRET=         # Random secret
NEXT_PUBLIC_FIREBASE_*=  # Firebase config
```

## Safety

✅ All sensitive files ignored via `.gitignore`  
✅ API keys never committed  
✅ Example files provided (`.env.example`)  
✅ Server-side API routes only

## Support

For issues or questions, check `/walkthrough.md` artifact.
