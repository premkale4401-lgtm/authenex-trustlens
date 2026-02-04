"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown,
  BarChart3,
  Scan,
  FolderKanban
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function TopNav() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = session ? [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Analysis", href: "/analyze", icon: Scan },
    { name: "Cases", href: "/cases", icon: FolderKanban },
  ] : [];

  if (status === "loading") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </nav>
    );
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-sky-500/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity rounded-lg" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Authenex
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] font-medium text-sky-400 uppercase tracking-wider">
                TrustLens
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {!session ? (
              <>
                <button
                  onClick={() => signIn()}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => signIn()}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white text-sm font-semibold transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-sky-500/30 transition-all"
                >
                  <img
                    src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}&background=0ea5e9&color=fff`}
                    alt="Profile"
                    className="w-7 h-7 rounded-full border border-slate-600"
                  />
                  <span className="hidden sm:block text-sm text-slate-300 max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl shadow-sky-500/10 overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-800">
                        <p className="font-medium text-slate-200 text-sm truncate">{session.user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                      </div>
                      <div className="p-1.5">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800/50 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              {!session && (
                <button
                  onClick={() => { setIsMenuOpen(false); signIn(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}