"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const gradientColors = [
      { r: 14, g: 165, b: 233 },   // Sky 500
      { r: 99, g: 102, b: 241 },   // Indigo 500
      { r: 16, g: 185, b: 129 },   // Emerald 500
      { r: 14, g: 165, b: 233 },   // Back to Sky
    ];

    const draw = () => {
      time += 0.003;

      const gradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width * 0.5 + canvas.width * 0.5,
        0,
        Math.cos(time * 0.7) * canvas.width * 0.5 + canvas.width * 0.5,
        canvas.height
      );

      gradientColors.forEach((color, i) => {
        const offset = (i / (gradientColors.length - 1) + Math.sin(time + i) * 0.1) % 1;
        gradient.addColorStop(Math.max(0, Math.min(1, offset)), 
          `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Second layer
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.5) * 200,
        canvas.height * 0.3 + Math.cos(time * 0.3) * 100,
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        canvas.width * 0.8
      );

      gradient2.addColorStop(0, "rgba(99, 102, 241, 0.05)");
      gradient2.addColorStop(0.5, "rgba(14, 165, 233, 0.03)");
      gradient2.addColorStop(1, "transparent");

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}