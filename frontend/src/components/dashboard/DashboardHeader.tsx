// frontend/src/components/dashboard/DashboardHeader.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Bell, 
  Plus,
  Command,
  X,
  Check,
  AlertCircle,

  User,
  Clock,
  ArrowUpRight,
  LogOut,
  Settings
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Analysis Complete", message: "Image verification finished with 98% authenticity", time: "2 min ago", read: false, type: "success" },
    { id: 2, title: "New Case Assigned", message: "Case #2045 requires your review", time: "1 hour ago", read: false, type: "info" },
    { id: 3, title: "System Alert", message: "Deepfake detection model updated", time: "3 hours ago", read: true, type: "warning" },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-20 py-2.5 border border-slate-700 rounded-xl leading-5 bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-slate-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all sm:text-sm"
            placeholder="Search cases, analyses, or forensic reports..."
            onClick={() => setSearchOpen(true)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 rounded-lg">
              <Command className="w-3 h-3" />
              <span>K</span>
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        {/* New Analysis Button */}
        <Link
          href="/dashboard/analyze"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-medium text-sm hover:from-sky-400 hover:to-indigo-500 transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </Link>

        {/* Mobile Add Button */}
        <Link
          href="/dashboard/analyze"
          className="sm:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl hover:from-sky-400 hover:to-indigo-500 transition-all shadow-lg shadow-sky-500/25"
        >
          <Plus className="w-5 h-5" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-400">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer ${!notif.read ? 'bg-sky-500/5' : ''}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex gap-3">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'success' ? 'bg-emerald-500' : notif.type === 'warning' ? 'bg-amber-500' : 'bg-sky-500'}`} />
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm font-medium ${!notif.read ? 'text-white' : 'text-slate-300'}`}>
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <span className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-slate-400 mt-0.5">{notif.message}</p>
                              <p className="text-xs text-slate-500 mt-1.5">{notif.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-slate-800 bg-slate-900/50">
                    <Link
                      href="/dashboard/notifications"
                      className="block text-center text-sm text-sky-400 hover:text-sky-300 transition-colors py-1"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative ml-2">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 pl-3 border-l border-slate-800 outline-none"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{session?.user?.name || "Investigator"}</p>
              <p className="text-xs text-slate-400">Forensic Analyst</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 p-0.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User className="w-5 h-5 text-slate-300" />
                )}
              </div>
            </div>
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50 divide-y divide-slate-800"
                >
                  <div className="p-2">
                    <Link 
                      href="/dashboard/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all group"
                    >
                      <User className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>

                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all group"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs text-slate-400 bg-slate-800 rounded border border-slate-700">ESC</kbd>
              </div>
              <div className="p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Recent Searches</p>
                <div className="space-y-2">
                  {["Case #2044", "Deepfake analysis", "Image verification report"].map((item, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all text-left group"
                    >
                      <Clock className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                      <span className="flex-1">{item}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

