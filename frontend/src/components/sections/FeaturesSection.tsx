"use client";

import { motion } from "framer-motion";
import { 
  FileCheck, 
  Scan, 
  Lock, 
  BarChart3, 
  Radio, 
  Cpu,
  ArrowUpRight
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Image Forensics",
    description: "Detect AI-generated images, deepfakes, and manipulated photos using advanced GAN fingerprinting and metadata analysis.",
    color: "sky",
    stat: "99.9% accuracy"
  },
  {
    icon: Scan,
    title: "Video Verification",
    description: "Temporal consistency analysis, frame-level interpolation detection, and lip-sync verification for comprehensive video authenticity.",
    color: "indigo",
    stat: "Real-time"
  },
  {
    icon: Lock,
    title: "Document Authenticity",
    description: "Font forensics, signature verification, layout analysis, and blockchain timestamp validation for legal document integrity.",
    color: "emerald",
    stat: "Court-ready"
  },
  {
    icon: BarChart3,
    title: "Email Intelligence",
    description: "Header forensics, SPF/DKIM validation, sender reputation analysis, and phishing detection powered by threat intelligence.",
    color: "rose",
    stat: "ISP-integrated"
  },
  {
    icon: Radio,
    title: "Audio Analysis",
    description: "Voice biometric matching, synthetic speech detection, acoustic environment analysis, and deepfake audio identification.",
    color: "amber",
    stat: "Neural net"
  },
  {
    icon: Cpu,
    title: "Text Detection",
    description: "Perplexity scoring, burstiness analysis, stylometry matching, and LLM attribution for synthetic text identification.",
    color: "violet",
    stat: "GPT-4 ready"
  }
];

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  sky: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", gradient: "from-sky-500 to-blue-500" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", gradient: "from-indigo-500 to-purple-500" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", gradient: "from-emerald-500 to-teal-500" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", gradient: "from-rose-500 to-pink-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", gradient: "from-amber-500 to-orange-500" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", gradient: "from-violet-500 to-fuchsia-500" },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Six Dimensions of{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Digital Forensics
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Comprehensive analysis across all digital content types, powered by 
            state-of-the-art neural networks and quantum-resistant verification.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const colors = colorClasses[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative glass-card p-8 hover:bg-slate-800/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div className="relative">
                  {/* Icon and stat */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
                      {feature.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-sky-400 transition-colors flex items-center gap-2">
                    {feature.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}