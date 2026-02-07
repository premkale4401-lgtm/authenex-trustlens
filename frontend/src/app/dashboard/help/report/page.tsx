"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Bug, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Mic
} from "lucide-react";
import Link from "next/link";

export default function ReportIssuePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    severity: "",
    title: "",
    description: "",
    file: null as File | null
  });

  const issueTypes = [
    { value: "bug", label: "Bug / Error", icon: Bug },
    { value: "analysis", label: "Analysis Issue", icon: FileText },
    { value: "upload", label: "Upload Problem", icon: ImageIcon },
    { value: "audio", label: "Audio Processing", icon: Mic },
    { value: "other", label: "Other", icon: AlertTriangle },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-12 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Report Submitted</h2>
          <p className="text-slate-400 mb-8">Thank you for your feedback. Our team will investigate and respond within 4-8 hours.</p>
          <Link
            href="/dashboard/help"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="mb-8">
        <Link
          href="/dashboard/help"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Help Center
        </Link>
        <h1 className="text-3xl font-bold text-white">Report an Issue</h1>
        <p className="text-slate-400 mt-2">Submit bugs, errors, or unexpected behavior</p>
      </div>

      <div className="max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 lg:p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Issue Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {issueTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.type === type.value
                        ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                        : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Severity</label>
            <div className="flex gap-3">
              {["Low", "Medium", "High", "Critical"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: level })}
                  className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                    formData.severity === level
                      ? level === "Critical" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                        level === "High" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                        "bg-sky-500/10 border-sky-500/20 text-sky-400"
                      : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-white"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              required
              placeholder="Brief description of the issue"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              required
              rows={5}
              placeholder="Detailed description of what happened, steps to reproduce, and expected behavior..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Attachment (Optional)</label>
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-slate-600 transition-colors cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
              />
              <ImageIcon className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">
                {formData.file ? formData.file.name : "Drop files here or click to upload"}
              </p>
              <p className="text-slate-500 text-xs mt-1">Screenshots, logs, or sample files (max 10MB)</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/25"
            >
              <Send className="w-4 h-4" />
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}