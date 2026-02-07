// frontend/src/app/dashboard/page.tsx (Main Dashboard - Live News Feed)
"use client";

import { motion } from "framer-motion";
import NewsFeed from "@/components/news/NewsFeed";
import { Newspaper, TrendingUp, Shield, Zap, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Dashboard
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Real-time intelligence on cybercrime, deepfakes, and AI security threats.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            System Online
          </div>
        </motion.div>

        {/* Crime Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-transparent p-5 hover:border-rose-500/40 transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-rose-300/80 mb-1">Cybercrime Cases</p>
                <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">2,847</p>
              </div>
              <div className="p-2.5 bg-rose-500/20 rounded-xl">
                <Shield className="w-5 h-5 text-rose-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-rose-300 bg-rose-500/10 w-fit px-2 py-1 rounded-lg">
               <TrendingUp className="w-3 h-3" />
               +18% this month
            </div>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-5 hover:border-purple-500/40 transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-purple-300/80 mb-1">Deepfake Cases</p>
                <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">1,523</p>
              </div>
              <div className="p-2.5 bg-purple-500/20 rounded-xl">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-purple-300 bg-purple-500/10 w-fit px-2 py-1 rounded-lg">
               <TrendingUp className="w-3 h-3" />
               +24% this month
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-5 hover:border-amber-500/40 transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-amber-300/80 mb-1">AI Fraud</p>
                <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">892</p>
              </div>
              <div className="p-2.5 bg-amber-500/20 rounded-xl">
                <Newspaper className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-300 bg-amber-500/10 w-fit px-2 py-1 rounded-lg">
               <TrendingUp className="w-3 h-3" />
               +31% this month
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-5 hover:border-emerald-500/40 transition-all group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-300/80 mb-1">Arrests Made</p>
                <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">456</p>
              </div>
              <div className="p-2.5 bg-emerald-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
               <TrendingUp className="w-3 h-3" />
               +12% this month
            </div>
          </div>
        </motion.div>
      </div>

      {/* News Feed - Now with full width container for better masonry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent -z-10 blur-3xl opacity-20" />
        <NewsFeed />
      </motion.div>
    </div>
    
  );
}
