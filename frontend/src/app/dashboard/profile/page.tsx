"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Camera, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  AlertTriangle,
  Edit3,
  Save,
  X,
  Award,
  Activity,
  Lock,
  Smartphone,
  Bell,
  Trash2
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

// Mock data - replace with actual API calls
const userStats = {
  memberSince: "2024-01-15",
  lastActive: "2 hours ago",
  totalAnalyses: 156,
  verifiedCases: 142,
  accuracy: 94.5,
  reputation: 4.8,
  plan: "Professional",
  planExpiry: "2025-01-15"
};

const recentActivity = [
  { id: 1, type: "analysis", title: "Video authenticity check completed", target: "interview_clip.mp4", time: "2 hours ago", status: "verified" },
  { id: 2, type: "case", title: "New case created", target: "Social Media Investigation #24", time: "5 hours ago", status: "active" },
  { id: 3, type: "analysis", title: "Image metadata extracted", target: "suspicious_photo.jpg", time: "1 day ago", status: "flagged" },
  { id: 4, type: "achievement", title: "Earned badge", target: "100 Analyses Completed", time: "2 days ago", status: "completed" },
  { id: 5, type: "analysis", title: "Audio spectrogram analysis", target: "voice_sample.wav", time: "3 days ago", status: "verified" },
];

const achievements = [
  { id: 1, title: "Early Adopter", description: "Joined during beta phase", icon: "🚀", unlocked: true, date: "2024-01-15" },
  { id: 2, title: "Century Club", description: "Completed 100 analyses", icon: "💯", unlocked: true, date: "2024-03-20" },
  { id: 3, title: "Perfect Score", description: "100% accuracy streak (50+)", icon: "🎯", unlocked: true, date: "2024-04-10" },
  { id: 4, title: "Master Detective", description: "Solved 500 cases", icon: "🔍", unlocked: false, progress: 156, total: 500 },
  { id: 5, title: "Speed Demon", description: "Analysis under 30 seconds", icon: "⚡", unlocked: false, progress: 0, total: 1 },
];

const securitySettings = [
  { id: "2fa", label: "Two-Factor Authentication", enabled: true, description: "Secure your account with 2FA" },
  { id: "biometric", label: "Biometric Login", enabled: false, description: "Use fingerprint or face recognition" },
  { id: "alerts", label: "Security Alerts", enabled: true, description: "Get notified of suspicious activity" },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "Alexandra Chen",
    email: session?.user?.email || "alex.chen@forensics.io",
    role: "Senior Digital Forensics Analyst",
    location: "San Francisco, CA",
    website: "https://ac-forensics.com",
    bio: "Digital forensics specialist with 8+ years experience in media authentication and deepfake detection. Certified in multimedia analysis and blockchain verification.",
    timezone: "America/Los_Angeles",
    language: "English (US)",
    theme: "dark"
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Hero Section with Cover Image */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 rounded-3xl overflow-hidden mb-8 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-purple-500/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        
        {/* Cover Edit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 p-2 bg-slate-900/50 backdrop-blur-md rounded-lg border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all opacity-0 group-hover:opacity-100"
        >
          <Camera className="w-4 h-4" />
        </motion.button>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6">
          {/* Avatar */}
          <motion.div 
            className="relative"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#020617] shadow-2xl relative bg-slate-800">
              <Image
                src={session?.user?.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"}
                alt="Profile"
                fill
                className="object-cover"
              />
              <AnimatePresence>
                {avatarHover && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/60 flex items-center justify-center cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div 
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#020617]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>

          <div className="flex-1 mb-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-1"
            >
              {profileData.name}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-400"
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-sky-400" />
                  {profileData.role}
                </span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  {profileData.location}
                </span>
              </div>
              

            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-sky-500/25"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium flex items-center gap-2 transition-all"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              variants={itemVariants}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Compact Credit Wallet */}
            <div className="lg:col-span-3 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <div>
                        <h3 className="text-slate-400 text-sm font-medium">Available Credits</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-white tracking-tight">2,450</span>
                          <span className="text-sm text-slate-500">/ 5,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                      <div className="hidden md:flex flex-col items-center px-4 border-l border-slate-800/50">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Refill Date</span>
                        <span className="text-white font-medium">Feb 15, 2025</span>
                      </div>
                      
                      <button className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-sky-500/20">
                        Add Credits
                      </button>
                    </div>
                  </div>

                  {/* Usage Bar */}
                  <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden relative group">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "49%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                    </motion.div>
                    <div className="absolute top-0 right-0 h-full w-px bg-slate-700/50 hidden group-hover:block" />
                    {/* Tooltip on hover could go here */}
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-400 px-1 -mt-2">
                    <span>Monthly Usage: 49%</span>
                    <span>1,200 credits used this period</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* About Section */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-sky-400" />
                About
              </h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 resize-none"
                />
              ) : (
                <p className="text-slate-300 leading-relaxed">{profileData.bio}</p>
              )}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="bg-transparent text-slate-300 focus:outline-none border-b border-slate-600 focus:border-sky-500 w-full"
                      />
                    ) : (
                      <p className="text-slate-300 text-sm">{profileData.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <LinkIcon className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Website</p>
                    {isEditing ? (
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        className="bg-transparent text-slate-300 focus:outline-none border-b border-slate-600 focus:border-sky-500 w-full"
                      />
                    ) : (
                      <a href={profileData.website} className="text-sky-400 text-sm hover:underline">{profileData.website}</a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Member Since</p>
                    <p className="text-slate-300 text-sm">{new Date(userStats.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Last Active</p>
                    <p className="text-slate-300 text-sm">{userStats.lastActive}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plan Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                    Current Plan
                  </span>
                  <Shield className="w-5 h-5 text-sky-400" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-1">{userStats.plan}</h4>
                <p className="text-slate-400 text-sm mb-6">Renews on {new Date(userStats.planExpiry).toLocaleDateString()}</p>
                
                <div className="space-y-3 mb-6">
                  {["Unlimited analyses", "Priority processing", "API access", "Advanced reporting"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-medium transition-all shadow-lg shadow-sky-500/25">
                  Upgrade Plan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-800/50">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="divide-y divide-slate-800/50">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 flex items-center gap-4 hover:bg-slate-800/30 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'verified' ? 'bg-emerald-500/10 text-emerald-400' :
                    activity.status === 'flagged' ? 'bg-amber-500/10 text-amber-400' :
                    activity.status === 'active' ? 'bg-sky-500/10 text-sky-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    {activity.type === 'analysis' && <FileCheck className="w-5 h-5" />}
                    {activity.type === 'case' && <Shield className="w-5 h-5" />}
                    {activity.type === 'achievement' && <Award className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium group-hover:text-sky-400 transition-colors">{activity.title}</p>
                    <p className="text-slate-400 text-sm">{activity.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-sm">{activity.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                      activity.status === 'verified' ? 'bg-emerald-500/10 text-emerald-400' :
                      activity.status === 'flagged' ? 'bg-amber-500/10 text-amber-400' :
                      activity.status === 'active' ? 'bg-sky-500/10 text-sky-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20' 
                    : 'bg-slate-900/50 border-slate-800/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                    achievement.unlocked ? 'bg-amber-500/20' : 'bg-slate-800'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                        {achievement.title}
                      </h4>
                      {achievement.unlocked && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{achievement.description}</p>
                    
                    {!achievement.unlocked ? (
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.total}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-full bg-slate-600 rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-amber-400/80 text-xs">Unlocked on {new Date(achievement.date!).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}



      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Account?</h3>
              <p className="text-slate-400 mb-6">
                This action cannot be undone. All your data, analyses, and cases will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {/* Handle delete */}}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-400 text-white rounded-xl font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}