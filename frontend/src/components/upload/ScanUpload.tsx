"use client";

import { useState, useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useDropzone } from "react-dropzone";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, UploadCloud, CheckCircle, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";

export default function ScanUpload() {
  const { user } = useAuthContext();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    disabled: loading,
  });

  const handleScan = async () => {
    if (!image || !user) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Call Analysis API
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, uid: user.uid }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan failed");
      }

      // 2. Save Result to Firestore
      // Note: We are saving client-side because of the bridge architecture.
      // Ensure firestore.rules allows this for authenticated users.
      const scanData = {
        uid: user.uid,
        imageUrl: "omitted-for-privacy", // Or allow user to save if we had storage
        verdict: data.verdict,
        confidence: data.confidence,
        model: data.model,
        reasoning: data.reasoning,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "scans"), scanData);

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  if (!user) {
    return (
      <div className="p-6 text-center border border-slate-800 rounded-xl bg-slate-900/50">
        <p className="text-slate-400">Please log in to access the secure scanner.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      
      {/* Upload Area */}
      {!image && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive ? "border-sky-500 bg-sky-500/10" : "border-slate-700 hover:border-sky-400/50 hover:bg-slate-800/50"}
          `}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 mx-auto mb-4 text-sky-400" />
          <p className="text-lg font-medium text-slate-200">
            {isDragActive ? "Drop image here..." : "Drag & drop an image, or click to select"}
          </p>
          <p className="text-sm text-slate-500 mt-2">Supports JPG, PNG, WEBP (Max 5MB)</p>
        </div>
      )}

      {/* Preview & Action */}
      {image && !result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50 shadow-2xl">
            <img src={image} alt="Preview" className="w-full h-64 object-contain bg-black/20" />
            
            <button 
              onClick={resetScan}
              className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with Gemini 1.5...
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Run Deepfail Analysis
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 md:p-8 space-y-6 animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <h3 className="text-xl font-semibold text-slate-200">Analysis Result</h3>
            <span className="text-xs font-mono text-slate-500">{result.model}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`
              p-6 rounded-xl border flex flex-col items-center justify-center text-center gap-2
              ${result.verdict === 'Likely AI' ? 'bg-red-500/10 border-red-500/30' : 
                result.verdict === 'Likely Human' ? 'bg-emerald-500/10 border-emerald-500/30' : 
                'bg-amber-500/10 border-amber-500/30'}
            `}>
              <span className={`text-3xl font-bold 
                ${result.verdict === 'Likely AI' ? 'text-red-400' : 
                  result.verdict === 'Likely Human' ? 'text-emerald-400' : 
                  'text-amber-400'}
              `}>
                {result.verdict}
              </span>
              <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Verdict</span>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col items-center justify-center text-center gap-2">
              <span className="text-3xl font-bold text-sky-400">{result.confidence}%</span>
              <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Confidence Score</span>
            </div>
          </div>

          {result.reasoning && (
             <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
               <p className="text-sm text-slate-300 leading-relaxed font-mono">
                 <span className="text-sky-500 font-bold block mb-1">AI Reasoning:</span>
                 {result.reasoning}
               </p>
             </div>
          )}

          <button 
            onClick={resetScan}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
          >
            Scan Another Image
          </button>
        </div>
      )}
    </div>
  );
}
