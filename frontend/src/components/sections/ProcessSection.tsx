"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Secure Ingestion",
    description: "Drag and drop any digital asset. We support 200+ formats with automatic metadata preservation and cryptographic hashing for chain of custody.",
    features: ["End-to-end encryption", "Metadata extraction", "Hash verification"]
  },
  {
    number: "02",
    icon: Cpu,
    title: "Neural Analysis",
    description: "Our ensemble of specialized AI models processes content through 50+ forensic checkpoints, detecting anomalies invisible to human eyes.",
    features: ["50+ detection models", "Sub-second processing", "Confidence scoring"]
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Verified Report",
    description: "Receive court-ready documentation with explainable AI insights, anomaly visualization, and reproducible evidence for legal proceedings.",
    features: ["PDF export", "API integration", "Blockchain timestamp"]
  }
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Forensic Pipeline in{" "}
            <span className="text-emerald-400">Three Steps</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From ingestion to verified report, our automated pipeline ensures 
            accuracy, transparency, and legal admissibility.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-8 h-full border-t-4 border-t-sky-500/50 hover:border-t-sky-400 transition-colors">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8 px-3 py-1 bg-sky-500 text-white text-sm font-bold rounded">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 mt-2">
                    <step.icon className="w-8 h-8 text-sky-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-200 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}