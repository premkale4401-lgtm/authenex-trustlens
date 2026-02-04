"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { signIn } from "next-auth/react";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-emerald-500/10" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-10 lg:p-16 text-center border-sky-500/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-sky-500/20"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
            Ready to Defend{" "}
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Digital Truth?
            </span>
          </h2>
          
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Join over 150 enterprises and government agencies using Authenex 
            to combat synthetic media and preserve information integrity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => signIn()}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/30 text-slate-300 hover:text-sky-400 font-semibold transition-all">
              Schedule Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            No credit card required • 14-day free trial • SOC 2 compliant
          </p>
        </motion.div>
      </div>
    </section>
  );
}