"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 99.9, suffix: "%", label: "Detection Accuracy", sub: "Independent benchmark" },
  { value: 50, suffix: "M+", label: "Files Analyzed", sub: "Since 2022" },
  { value: 150, suffix: "+", label: "Enterprise Clients", sub: "Fortune 500 & Gov" },
  { value: 150, suffix: "ms", label: "Avg Response Time", sub: "Edge-deployed" }
];

export default function StatsSection() {
  return (
    <section className="relative py-20 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-slate-300 font-medium mb-1">{stat.label}</p>
              <p className="text-slate-500 text-sm">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}