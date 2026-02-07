"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  Shield, 
  FileText, 
  MessageCircle, 
  Mail, 
  ChevronRight, 
  ChevronDown,
  AlertTriangle,
  Lock,
  Zap,
  Clock,
  HelpCircle,
  Bug,
  FileQuestion,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Image as ImageIcon,
  Mic,
  FileType,
  AtSign,
  Type
} from "lucide-react";
import Link from "next/link";

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

const detectionMethods = [
  {
    id: "images",
    icon: ImageIcon,
    title: "Image Analysis",
    description: "Detects AI-generated or manipulated images through visual artifact analysis, generation signatures, and manipulation traces.",
    signals: ["Visual artifacts and inconsistencies", "AI generation signatures", "Manipulation traces", "Metadata analysis"]
  },
  {
    id: "audio",
    icon: Mic,
    title: "Audio Analysis",
    description: "Identifies synthetic voices and audio manipulation through signal processing and frequency anomaly detection.",
    signals: ["Synthetic voice indicators", "Signal anomalies", "Frequency inconsistencies", "Compression artifacts"]
  },
  {
    id: "documents",
    icon: FileType,
    title: "Document Analysis",
    description: "Examines documents for formatting inconsistencies, metadata signals, and structural anomalies.",
    signals: ["Formatting inconsistencies", "Metadata verification", "Structural anomalies", "Font analysis"]
  },
  {
    id: "emails",
    icon: AtSign,
    title: "Email Analysis",
    description: "Detects phishing attempts, sender spoofing, and fraudulent content through header and content analysis.",
    signals: ["Phishing indicators", "Sender spoofing patterns", "Header anomalies", "Linguistic fraud signals"]
  },
  {
    id: "text",
    icon: Type,
    title: "Text Analysis",
    description: "Identifies AI-generated text through pattern recognition, stylistic analysis, and statistical language features.",
    signals: ["AI generation patterns", "Stylistic uniformity", "Statistical anomalies", "Perplexity scoring"]
  }
];

const faqs = [
  {
    question: "What file formats are supported?",
    answer: "Authenex supports a wide range of formats: Images (JPEG, PNG, TIFF, WebP, BMP), Audio (MP3, WAV, FLAC, AAC, OGG), Documents (PDF, DOCX, TXT, RTF), and raw text input. For best results, use original, uncompressed files."
  },
  {
    question: "How accurate is the detection?",
    answer: "Accuracy varies by content type and quality. High-quality original files typically yield 90-95% accuracy. Compressed, edited, or low-resolution content may reduce accuracy. Results are probability-based and should be combined with human judgment."
  },
  {
    question: "How long does analysis take?",
    answer: "Most analyses complete within 30-60 seconds. Complex documents or large audio files may take 2-3 minutes. Enterprise users receive priority processing with faster turnaround times."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. All content is processed securely using encryption in transit and at rest. Files are automatically deleted after analysis (within 24 hours) and are never used to train models or shared with third parties."
  },
  {
    question: "What does 'Inconclusive' mean?",
    answer: "An inconclusive result indicates that Authenex cannot make a confident determination. This may occur with heavily processed content, insufficient data, or novel manipulation techniques. We recommend manual review in these cases."
  },
  {
    question: "Can Authenex detect all deepfakes?",
    answer: "No detection system is 100% effective. Authenex identifies most commercially available deepfake techniques, but new methods emerge continuously. Results should be part of a broader verification strategy."
  }
];

const troubleshootingItems = [
  {
    icon: XCircle,
    title: "Upload Failures",
    description: "File won't upload or process",
    solution: "Check file size (max 100MB), ensure format is supported, verify stable internet connection, and try clearing browser cache. If issues persist, contact support."
  },
  {
    icon: Clock,
    title: "Slow Analysis",
    description: "Analysis taking longer than expected",
    solution: "Large files or high server load may cause delays. Try reducing file size or quality. Enterprise users can check priority queue status in their dashboard."
  },
  {
    icon: AlertCircle,
    title: "Inconclusive Results",
    description: "Low confidence or unclear results",
    solution: "Provide original, uncompressed files. Avoid screenshots or copies. Ensure content hasn't been edited or processed by other tools before submission."
  },
  {
    icon: Shield,
    title: "Access Issues",
    description: "Cannot access features or results",
    solution: "Verify your subscription plan supports the feature. Check if your session expired. Clear cookies and log in again. Contact support for account-related issues."
  }
];

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    action: "support@authenex.com",
    href: "mailto:support@authenex.com",
    available: "24/7"
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Browse comprehensive guides and API docs",
    action: "View Documentation",
    href: "/docs",
    available: "Always available"
  },
  {
    icon: Bug,
    title: "Report Issue",
    description: "Submit bugs or technical problems",
    action: "Submit Report",
    href: "/dashboard/help/report",
    available: "Response in 4-8 hours"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Enterprise users: Priority live support",
    action: "Start Chat",
    href: "#",
    available: "Business hours",
    premium: true
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("overview");

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <HelpCircle className="w-3 h-3" />
              Help Center
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              How can we help you?
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 max-w-2xl mb-8"
            >
              Find answers about Authenex features, detection processes, result interpretation, and troubleshooting. Our support team is here to assist with forensic analysis workflows.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative max-w-2xl"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-700 rounded">⌘</span>
                <span className="px-2 py-1 bg-slate-700 rounded">K</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { id: "overview", label: "Overview", icon: BookOpen },
          { id: "detection", label: "Detection Methods", icon: Shield },
          { id: "troubleshooting", label: "Troubleshooting", icon: Zap },
          { id: "contact", label: "Contact Support", icon: MessageCircle },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => {
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeSection === item.id
                  ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                  : "bg-slate-900/50 border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">{item.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="space-y-16">
        {/* What is Authenex */}
        <motion.section
          id="overview"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">What is Authenex</h2>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 lg:p-8">
            <p className="text-slate-300 leading-relaxed mb-6">
              Authenex is an AI-powered forensic detection platform designed to analyze and assess the authenticity of digital content. The platform provides probability-based assessments to help forensic analysts, security professionals, and organizations detect AI-generated, manipulated, or fraudulent content.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: ImageIcon, label: "Images", desc: "Visual content" },
                { icon: Mic, label: "Audio", desc: "Voice & sound" },
                { icon: FileType, label: "Documents", desc: "PDFs & files" },
                { icon: AtSign, label: "Emails", desc: "Message analysis" },
                { icon: Type, label: "Text", desc: "Plain text" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-slate-800/30 rounded-xl text-center group hover:bg-slate-800/50 transition-all"
                  >
                    <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-sky-500/10 group-hover:text-sky-400 transition-all">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-sky-400" />
                    </div>
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-400 font-medium text-sm mb-1">Probability-Based Assessment</p>
                <p className="text-slate-400 text-sm">Authenex provides likelihood scores rather than absolute determinations. Results should be interpreted as forensic indicators, not definitive proof.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Detection Methods */}
        <motion.section
          id="detection"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Detection Process</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {detectionMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{method.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Analytical Signals</p>
                        <div className="flex flex-wrap gap-2">
                          {method.signals.map((signal) => (
                            <span 
                              key={signal} 
                              className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md"
                            >
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Multi-Signal Analysis
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Authenex combines multiple analytical signals using ensemble methods to produce final results. This approach increases accuracy and reduces false positives by cross-referencing different detection techniques. Each content type undergoes specialized preprocessing before signal extraction.
            </p>
          </div>
        </motion.section>

        {/* Understanding Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Understanding Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Likely Authentic</h4>
              <p className="text-slate-400 text-sm">Content shows strong indicators of human creation with no detectable manipulation signals.</p>
            </div>
            
            <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
              <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center mb-4">
                <XCircle className="w-5 h-5 text-rose-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Likely AI-Generated</h4>
              <p className="text-slate-400 text-sm">Multiple signals indicate synthetic or manipulated content with high confidence.</p>
            </div>
            
            <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Inconclusive</h4>
              <p className="text-slate-400 text-sm">Insufficient signals or conflicting indicators prevent confident determination.</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
            <h4 className="text-white font-semibold mb-4">Confidence Score Interpretation</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <span className="text-emerald-400 font-semibold">90-100%</span>
                </div>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-emerald-500 rounded-full" />
                </div>
                <span className="text-slate-400 text-sm w-32">Very High Confidence</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <span className="text-sky-400 font-semibold">70-89%</span>
                </div>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-sky-500 rounded-full" />
                </div>
                <span className="text-slate-400 text-sm w-32">High Confidence</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <span className="text-amber-400 font-semibold">50-69%</span>
                </div>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-amber-500 rounded-full" />
                </div>
                <span className="text-slate-400 text-sm w-32">Moderate Confidence</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <span className="text-slate-400 font-semibold">&lt;50%</span>
                </div>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-slate-500 rounded-full" />
                </div>
                <span className="text-slate-400 text-sm w-32">Low Confidence</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <FileQuestion className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800/50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/30 transition-all"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Troubleshooting */}
        <motion.section
          id="troubleshooting"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Troubleshooting</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {troubleshootingItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm mb-3">{item.description}</p>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-slate-300 text-sm">
                          <span className="text-emerald-400 font-medium">Solution: </span>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Privacy & Limitations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Privacy & Data Handling</h3>
              </div>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Content is encrypted in transit and at rest using AES-256</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Automatic deletion within 24 hours of analysis completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>No content used for model training or improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>No third-party sharing or external API calls with content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Processing occurs in isolated, secure environments</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Limitations & Responsible Use</h3>
              </div>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Heavily compressed or edited content may reduce accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Novel manipulation techniques may evade detection initially</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Results should complement, not replace, human judgment</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Cross-reference with other verification methods when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Regular updates required to maintain detection effectiveness</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Support Channels */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Get Support</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {channel.action === "Start Chat" ? (
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                      className="block w-full text-left h-full p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl hover:border-sky-500/30 hover:bg-slate-800/30 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-sky-500/10 transition-all">
                          <Icon className="w-5 h-5 text-slate-400 group-hover:text-sky-400" />
                        </div>
                        {channel.premium && (
                          <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full">
                            Enterprise
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-semibold mb-1">{channel.title}</h4>
                      <p className="text-slate-400 text-sm mb-4">{channel.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sky-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          {channel.action}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                        <span className="text-slate-500 text-xs">{channel.available}</span>
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={channel.href}
                      className="block h-full p-6 bg-slate-900/50 border border-slate-800/50 rounded-2xl hover:border-sky-500/30 hover:bg-slate-800/30 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-sky-500/10 transition-all">
                          <Icon className="w-5 h-5 text-slate-400 group-hover:text-sky-400" />
                        </div>
                        {channel.premium && (
                          <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full">
                            Enterprise
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-semibold mb-1">{channel.title}</h4>
                      <p className="text-slate-400 text-sm mb-4">{channel.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sky-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          {channel.action}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                        <span className="text-slate-500 text-xs">{channel.available}</span>
                      </div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-slate-800/50 pt-8"
        >
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wider">Disclaimer</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Authenex provides AI-assisted authenticity assessments for forensic and investigative purposes. Results are probabilistic and should not be used as the sole basis for legal, financial, medical, or regulatory decisions. Always combine Authenex analysis with human expertise and additional verification methods. The platform is provided "as is" without warranties of any kind. Users are responsible for compliance with applicable laws and regulations regarding digital content analysis.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}