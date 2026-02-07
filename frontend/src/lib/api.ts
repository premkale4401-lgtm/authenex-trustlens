// Updated API library - Uses Next.js API routes (no external backend needed)

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const analyzeImage = async (file: File) => {
  try {
    console.log('📤 Starting image analysis...', file.name);
    
    // Convert to base64
    const base64Image = await toBase64(file);
    console.log('✓ Image converted to base64');
    
    // Get user ID from session (simplified - you may need to get this from auth context)
    const uid = "user-" + Date.now(); // Replace with actual user ID
    
    console.log('🔄 Calling /api/scan endpoint...');
    
    // Call Next.js API route
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        uid: uid
      })
    });
    
    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('❌ API Error:', error);
      throw new Error(error.error || error.detail || 'Analysis failed');
    }
    
    const data = await response.json();
    console.log('✅ Analysis complete:', data);
    
    // Transform to expected format
    const transformed = {
      trust_score: data.verdict === "Likely Human-Created" ? data.confidence : 100 - data.confidence,
      deepfake_probability: data.verdict === "Likely AI-Generated" ? data.confidence : 100 - data.confidence,
      verdict: data.verdict,
      explanation: data.reasoning,
      details: {
        findings: data.flags?.map((flag: string) => ({
          category: "AI Detection",
          score: 50,
          reason: flag
        })) || [],
        ...data.parameters
      }
    };
    
    console.log('✓ Transformed response:', transformed);
    return transformed;
    
  } catch (error) {
    console.error('💥 Image analysis error:', error);
    throw error;
  }
};

export const analyzeVideo = async (file: File) => {
  return {
    trust_score: 75,
    deepfake_probability: 25,
    verdict: "Video analysis not yet implemented",
    explanation: "Video analysis feature coming soon",
    details: { findings: [] }
  };
};

export const analyzeAudio = async (file: File) => {
  return {
    trust_score: 75,
    deepfake_probability: 25,
    verdict: "Audio analysis not yet implemented",
    explanation: "Audio analysis feature coming soon",
    details: { findings: [] }
  };
};

export const analyzeDocument = async (file: File) => {
  return {
    trust_score: 75,
    deepfake_probability: 25,
    verdict: "Document analysis not yet implemented",
    explanation: "Document analysis feature coming soon",
    details: { findings: [] }
  };
};

export const analyzeText = async (text: string) => {
  return {
    trust_score: 75,
    deepfake_probability: 25,
    verdict: "Text analysis not yet implemented",
    explanation: "Text analysis feature coming soon",
    details: { findings: [] }
  };
};

export const analyzeEmail = async (email: string) => {
  return {
    trust_score: 75,
    deepfake_probability: 25,
    verdict: "Email analysis not yet implemented",
    explanation: "Email analysis feature coming soon",
    details: { findings: [] }
  };
};
