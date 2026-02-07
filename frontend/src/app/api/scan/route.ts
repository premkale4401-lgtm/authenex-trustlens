import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  console.log("=== /api/scan called ===");
  console.log("API_KEY present:", !!API_KEY);
  console.log("API_KEY length:", API_KEY?.length);
  
  if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY missing!");
    return NextResponse.json(
      { error: "Server Configuration Error: GEMINI_API_KEY missing" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    console.log("📥 Request body received, image length:", body.image?.length, "uid:", body.uid);
    
    const { image, uid } = body;

    if (!image || !uid) {
      console.error("❌ Missing image or uid");
      return NextResponse.json(
        { error: "Missing image or user ID" },
        { status: 400 }
      );
    }

    console.log("🤖 Initializing Gemini...");
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 2048,
      }
    });
    console.log("✓ Gemini initialized");

    // Enhanced forensic prompt
    const prompt = `You are an expert AI-generated content forensic analyst.

Analyze this image and return ONLY valid JSON (no markdown):
{
  "verdict": "Likely AI-Generated" | "Likely Human-Created" | "Uncertain",
  "confidence": <number 0-100>,
  "reasoning": "<2-3 sentence summary>",
  "detailedAnalysis": {
    "visualQuality": "<assessment>",
    "anatomicalAccuracy": "<if applicable>",
    "technicalIndicators": "<analysis>",
    "aiSignatures": "<markers>"
  },
  "parameters": {
    "textureConsistency": <0-100>,
    "edgeQuality": <0-100>,
    "lightingCoherence": <0-100>,
    "anatomicalAccuracy": <0-100 or null>,
    "noisePattern": <0-100>
  },
  "flags": [<array of specific issues>]
}`;

    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    console.log("🔍 Calling Gemini API...");
    const startTime = Date.now();
    
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    const duration = Date.now() - startTime;
    console.log(`✅ Gemini responded in ${duration}ms`);
    console.log("Raw response:", text.substring(0, 200));
    
    // Parse JSON
    let analysis;
    try {
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      analysis = JSON.parse(cleanText);
      console.log("✓ JSON parsed successfully");
    } catch (e) {
      console.error("❌ JSON parse error:", e);
      console.log("Failed text:", text);
      return NextResponse.json(
        { error: "AI analysis returned invalid data", raw: text.substring(0, 500) },
        { status: 502 }
      );
    }

    // Validate
    if (!analysis.verdict || typeof analysis.confidence !== 'number') {
      console.error("❌ Invalid analysis format:", analysis);
      return NextResponse.json(
        { error: "Invalid analysis response format" },
        { status: 502 }
      );
    }

    const finalResponse = {
      ...analysis,
      model: "gemini-1.5-flash",
      timestamp: new Date().toISOString(),
      processingTime: duration
    };
    
    console.log("✅ Sending response:", finalResponse.verdict, finalResponse.confidence + "%");
    return NextResponse.json(finalResponse);

  } catch (error: any) {
    console.error("💥 API Error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: "Analysis failed", detail: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
