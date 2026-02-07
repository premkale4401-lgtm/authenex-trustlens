
"use client";

import { useEffect, useState, useRef } from "react";
import { 
  MessageSquare, X, Mic, Send, Minimize2, 
  Maximize2, Volume2, VolumeX, ShieldCheck, 
  Activity, AlertTriangle, Bot 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AuthenexChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); // Type 'any' for window.SpeechRecognition
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech APIs safely (browser-only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Listen for open-chat event
      const handleOpenChat = () => setIsOpen(true);
      window.addEventListener('open-chat', handleOpenChat);

      // Config STT
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          // Auto-send on voice input for conversational flow
          handleSend(transcript, "voice");
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };
      }

      // Config TTS
      synthRef.current = window.speechSynthesis;

      return () => {
        window.removeEventListener('open-chat', handleOpenChat);
      };
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (isSpeaking) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      // Stop speaking if currently speaking to allow user to interrupt
      if (isSpeaking) {
        synthRef.current?.cancel();
        setIsSpeaking(false);
      }
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Mic start failed", e);
      }
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current) return;
    
    // Stop any current speech
    synthRef.current.cancel();

    // Clean text for speech (remove markdown asterisks like *text* or **text**)
    const cleanText = text.replace(/[*#]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.pitch = 1; // Neutral
    utterance.rate = 1.1; // Slightly faster/human pace
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const handleSend = async (messageText: string = input, mode: "text" | "voice" = isVoiceMode ? "voice" : "text") => {
    if (!messageText.trim()) return;

    const userMsg: Message = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Backend expects: message, history, mode
      // Convert current messages to history format for Gemini API if needed
      // Map 'model' -> 'model' and 'user' -> 'user' for history
      const history = messages.map(m => ({
        role: m.role === "model" ? "model" : "user", // Ensure strict role mapping
        parts: [{ text: m.text }] 
      }));

      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history: history, // Send simplified history
          mode: mode 
        }),
      });

      const data = await res.json();
      
      const botMsg: Message = { role: "model", text: data.response };
      setMessages((prev) => [...prev, botMsg]);

      // If voice mode or voice input was used, speak the response
      if (mode === "voice") {
        speakResponse(data.response);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-slate-950/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                     <Bot className="w-6 h-6 text-white" />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Authenex AI</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    Forensic Intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                 <button 
                   onClick={toggleVoiceMode}
                   className={cn(
                     "p-2 rounded-lg transition-colors",
                     isVoiceMode ? "bg-sky-500/20 text-sky-400" : "text-slate-500 hover:text-slate-300"
                   )}
                   title={isVoiceMode ? "Voice Mode ON" : "Text Mode"}
                 >
                   {isVoiceMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                 </button>
                 <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                   <X className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
               {messages.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                    <ShieldCheck className="w-12 h-12 text-slate-600 mb-3" />
                    <p className="text-slate-400 text-sm">
                      Authenex AI Core Initialized.<br/>
                      Ready for forensic analysis.
                    </p>
                 </div>
               )}
               
               {messages.map((msg, idx) => (
                 <div key={idx} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                   <div className={cn(
                     "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                     msg.role === "user" 
                       ? "bg-sky-600 text-white rounded-tr-none" 
                       : "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-none"
                   )}>
                     {msg.text}
                   </div>
                 </div>
               ))}
               
               {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-slate-800/50 p-3 rounded-2xl rounded-tl-none flex gap-1">
                     <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                   </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800 pb-safe">
               {isVoiceMode ? (
                 <div className="flex flex-col items-center justify-center gap-3 py-2">
                    <button 
                      onClick={handleMicClick}
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl",
                        isListening 
                          ? "bg-red-500 animate-pulse shadow-red-500/30" 
                          : "bg-gradient-to-br from-sky-500 to-blue-600 hover:scale-105 shadow-sky-500/30"
                      )}
                    >
                      <Mic className="w-8 h-8 text-white" />
                    </button>
                    <p className="text-xs font-medium text-slate-400">
                      {isListening ? "Listening..." : "Tap to Speak"}
                    </p>
                    {isSpeaking && (
                      <div className="text-xs text-sky-400 animate-pulse flex items-center gap-1">
                        <Volume2 className="w-3 h-3" /> Speaking...
                      </div>
                    )}
                 </div>
               ) : (
                 <div className="flex items-center gap-2">
                   <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
                     placeholder="Ask about deepfakes..."
                     className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-600"
                   />
                   <button 
                     onClick={() => handleSend()}
                     disabled={isLoading || !input.trim()}
                     className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                   >
                     <Send className="w-4 h-4" />
                   </button>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 transition-all z-50 overflow-hidden"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          
          <Bot className="w-7 h-7 text-white relative z-10" />
          
          {/* Online Indicator Dot */}
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full z-20"></span>
        </motion.button>
      )}
    </div>
  );
}
