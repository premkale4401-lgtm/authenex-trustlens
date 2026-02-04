// frontend/src/app/dashboard/analyze/page.tsx (Analysis Interface)
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  X, 
  Shield, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  Scan,
  Brain,
  FileSearch,
  ArrowRight
} from "lucide-react";
import { useDropzone } from "react-dropzone";

const analysisTypes = [
  { id: "image", label: "Image Forensics", icon: ImageIcon, desc: "Detect manipulation, deepfakes, and metadata analysis" },
  { id: "video", label: "Video Analysis", icon: Video, desc: "Frame-by-frame verification and temporal consistency" },
  { id: "document", label: "Document Check", icon: FileText, desc: "PDF integrity and digital signature verification" },
];

const analysisSteps = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "scanning", label: "Scanning", icon: Scan },
  { id: "ai-analysis", label: "AI Analysis", icon: Brain },
  { id: "results", label: "Results", icon: FileSearch },
];

export default function AnalyzePage() {
  const [selectedType, setSelectedType] = useState("image");
  const [files, setFiles] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: selectedType === 'image' ? { 'image/*': [] } : selectedType === 'video' ? { 'video/*': [] } : { 'application/pdf': [] },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStep(1);
    
    // Simulate analysis steps
    setTimeout(() => setCurrentStep(2), 2000);
    setTimeout(() => setCurrentStep(3), 4000);
    setTimeout(() => {
      setResults({
        authenticity: 94,
        manipulated: false,
        confidence: "High",
        findings: [
          { type: "Metadata", status: "valid", detail: "EXIF data consistent" },
          { type: "Noise Analysis", status: "valid", detail: "Uniform noise pattern" },
          { type: "ELA", status: "warning", detail: "Minor compression artifacts detected" },
          { type: "Deepfake", status: "valid", detail: "No AI manipulation detected" }
        ]
      });
      setIsAnalyzing(false);
    }, 6000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">New Forensic Analysis</h1>
        <p className="text-slate-400">Select content type and upload files for verification</p>
      </div>

      {/* Analysis Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analysisTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left group ${
              selectedType === type.id
                ? "border-sky-500 bg-sky-500/10"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
              selectedType === type.id ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
            }`}>
              <type.icon className="w-6 h-6" />
            </div>
            <h3 className={`font-semibold mb-1 ${selectedType === type.id ? "text-white" : "text-slate-300"}`}>
              {type.label}
            </h3>
            <p className="text-sm text-slate-400">{type.desc}</p>
            
            {selectedType === type.id && (
              <motion.div
                layoutId="selected-indicator"
                className="absolute top-4 right-4 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <AnimatePresence mode="wait">
        {!results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                isDragActive
                  ? "border-sky-500 bg-sky-500/10"
                  : "border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800/30"
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center">
                <Upload className={`w-10 h-10 ${isDragActive ? "text-sky-400" : "text-slate-400"}`} />
              </div>
              <p className="text-lg font-medium text-white mb-2">
                {isDragActive ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-sm text-slate-400 mb-4">or click to browse from your computer</p>
              <button className="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors">
                Select Files
              </button>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <h4 className="text-sm font-medium text-slate-300">Selected Files ({files.length})</h4>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                          {selectedType === 'image' ? <ImageIcon className="w-5 h-5 text-purple-400" /> :
                           selectedType === 'video' ? <Video className="w-5 h-5 text-rose-400" /> :
                           <FileText className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                          <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-sky-400 hover:to-indigo-500 transition-all shadow-lg shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Start Analysis
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center space-y-6"
        >
          <div className="flex justify-center gap-2">
            {analysisSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex flex-col items-center gap-2 ${
                  index <= currentStep ? "text-sky-400" : "text-slate-600"
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    index < currentStep ? "bg-sky-500 border-sky-500 text-white" :
                    index === currentStep ? "border-sky-500 text-sky-400 animate-pulse" :
                    "border-slate-700 text-slate-600"
                  }`}>
                    {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                </div>
                {index < analysisSteps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? "bg-sky-500" : "bg-slate-800"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-slate-400">Processing forensic analysis... Please wait</p>
        </motion.div>
      )}

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-2xl text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center">
              <span className="text-3xl font-bold text-emerald-400">{results.authenticity}%</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentic Content</h2>
            <p className="text-emerald-400 font-medium">High Confidence Verification</p>
          </div>

          {/* Detailed Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.findings.map((finding: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  finding.status === 'valid' ? 'bg-emerald-500/5 border-emerald-500/20' :
                  finding.status === 'warning' ? 'bg-amber-500/5 border-amber-500/20' :
                  'bg-rose-500/5 border-rose-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    finding.status === 'valid' ? 'text-emerald-400' :
                    finding.status === 'warning' ? 'text-amber-400' :
                    'text-rose-400'
                  }`}>
                    {finding.status === 'valid' ? <CheckCircle2 className="w-5 h-5" /> :
                     finding.status === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                     <Shield className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{finding.type}</h4>
                    <p className="text-sm text-slate-400">{finding.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setResults(null);
                setFiles([]);
                setCurrentStep(0);
              }}
              className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors"
            >
              New Analysis
            </button>
            <button className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-400 transition-colors">
              Download Report
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}