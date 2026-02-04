"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Shield, 
  Zap,
  CheckCircle2,
  Globe,
  Users,
  Award
} from "lucide-react";
import { useSession, signIn } from "next-auth/react";

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Now with GPT-4 Detection
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-slate-100">Verify Truth in</span>
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent pb-1">
                Digital Reality
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Authenex combines neural forensics, quantum-resistant verification, 
              and explainable AI to detect synthetic media with 99.9% accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-10">
              {!session ? (
                <>
                  <button 
                    onClick={() => signIn()}
                    className="group px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5"
                  >
                    <Zap className="w-5 h-5" />
                    Start Free Analysis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group px-8 py-4 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/30 text-slate-300 hover:text-sky-400 font-semibold transition-all flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </button>
                </>
              ) : (
                <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5">
                  <Shield className="w-5 h-5" />
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              {[
                { icon: CheckCircle2, text: "SOC 2 Type II" },
                { icon: Award, text: "FISMA Compliant" },
                { icon: Globe, text: "GDPR Ready" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-slate-500">
                  <badge.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Abstract Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[400px] lg:h-[500px] hidden md:block"
          >
            {/* Central hub */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80"
            >
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={deg}
                  className="absolute w-3 h-3 bg-sky-500 rounded-full"
                  style={{
                    top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: 0.6 + (i % 3) * 0.2,
                  }}
                />
              ))}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <line
                    key={deg}
                    x1="50"
                    y1="50"
                    x2={50 + 45 * Math.cos((deg * Math.PI) / 180)}
                    y2={50 + 45 * Math.sin((deg * Math.PI) / 180)}
                    stroke="rgba(14, 165, 233, 0.2)"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                  />
                ))}
              </svg>
            </motion.div>

            {/* Orbiting rings */}
            {[1, 1.5, 2].map((scale, i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/20"
                style={{
                  width: `${scale * 200}px`,
                  height: `${scale * 200}px`,
                }}
              />
            ))}

            {/* Center icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 backdrop-blur-xl rounded-2xl border border-sky-500/30 flex items-center justify-center">
              <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-sky-400" />
            </div>

            {/* Floating stats cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 left-0 glass-card p-4 border-sky-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Verification</p>
                  <p className="text-lg font-bold text-slate-200">99.9%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-20 right-0 glass-card p-4 border-indigo-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Active Users</p>
                  <p className="text-lg font-bold text-slate-200">12,847</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}