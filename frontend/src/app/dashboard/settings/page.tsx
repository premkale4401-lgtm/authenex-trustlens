"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Moon, 
  Globe, 
  ChevronRight,
  Shield,
  Lock,
  User,
  Smartphone,
  Eye,
  Key,
  CheckCircle2,
  AlertTriangle,
  Trash2
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [securitySettings, setSecuritySettings] = useState([
    { id: "2fa", label: "Two-Factor Authentication", enabled: true, description: "Secure your account with 2FA" },
    { id: "biometric", label: "Biometric Login", enabled: false, description: "Use fingerprint or face recognition" },
    { id: "alerts", label: "Security Alerts", enabled: true, description: "Get notified of suspicious activity" },
  ]);

  const toggleSecurity = (id: string) => {
    setSecuritySettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const basicSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: Moon,
          label: "Dark Mode",
          description: "Always use dark theme",
          control: (
            <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md" />
            </div>
          )
        },
        {
          icon: Globe,
          label: "Language",
          description: "English (US)",
          control: (
            <button className="text-sky-400 hover:text-sky-300 text-sm font-medium flex items-center gap-1">
              Change <ChevronRight className="w-4 h-4" />
            </button>
          )
        }
      ]
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Email Notifications",
          description: "Receive weekly summaries",
          control: (
            <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md" />
            </div>
          )
        },
        {
          icon: Smartphone,
          label: "Push Notifications",
          description: "Receive updates on your device",
          control: (
            <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md" />
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 relative">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and security.</p>
      </div>

      <div className="grid gap-6">
        {basicSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-6">{section.title}</h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                  {item.control}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Security Section (Enhanced) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
        >
          <h2 className="text-xl font-bold text-white px-1">Security & Privacy</h2>
          
          {/* Security Score */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Security Score</h3>
                <p className="text-slate-400 text-sm">Your account security status</p>
              </div>
              <div className="w-20 h-20 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="#1e293b" strokeWidth="8" fill="none" />
                  <motion.circle 
                    cx="40" cy="40" r="36" 
                    stroke="#10b981" 
                    strokeWidth="8" 
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 226" }}
                    animate={{ strokeDasharray: "204 226" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-400">90</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-white font-medium text-sm">Strong Password</p>
                <p className="text-slate-400 text-xs">Last changed 30 days ago</p>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Smartphone className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-white font-medium text-sm">2FA Enabled</p>
                <p className="text-slate-400 text-xs">Using authenticator app</p>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-white font-medium text-sm">Recovery Email</p>
                <p className="text-slate-400 text-xs">Not set up yet</p>
              </div>
            </div>
          </div>

          {/* Detailed Security Settings */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Security Configuration</h3>
            <div className="space-y-4">
              {securitySettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      setting.enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {setting.id === '2fa' && <Lock className="w-5 h-5" />}
                      {setting.id === 'biometric' && <User className="w-5 h-5" />}
                      {setting.id === 'alerts' && <Bell className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{setting.label}</p>
                      <p className="text-slate-400 text-sm">{setting.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSecurity(setting.id)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      setting.enabled ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <motion.div
                      layout
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md ${
                        setting.enabled ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-rose-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Delete Account</p>
                <p className="text-slate-400 text-sm">Permanently delete your account and all data</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl font-medium transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>

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
