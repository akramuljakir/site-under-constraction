"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Sliders, Eye, EyeOff } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleMode, setParticleMode] = useState<"amber" | "cyan" | "neon">("amber");
  const [particleCount, setParticleCount] = useState<number>(65);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const getColorPalette = () => {
      if (particleMode === "cyan") return ["#06b6d4", "#3b82f6", "#60a5fa", "#a5f3fc"];
      if (particleMode === "neon") return ["#a855f7", "#ec4899", "#f43f5e", "#d8b4fe"];
      return ["#f59e0b", "#fbbf24", "#d97706", "#fef3c7"]; // amber (default)
    };

    const colors = getColorPalette();

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particleMode === "cyan" 
              ? `rgba(6, 182, 212, ${alpha})`
              : particleMode === "neon"
              ? `rgba(168, 85, 247, ${alpha})`
              : `rgba(245, 158, 11, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const force = (mouse.radius - mdist) / mouse.radius;
          const angle = Math.atan2(mdy, mdx);
          p.x -= Math.cos(angle) * force * 3;
          p.y -= Math.sin(angle) * force * 3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleMode, particleCount, isEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Floating control widget trigger */}
      <div className="pointer-events-auto fixed bottom-6 left-6 z-40">
        <div className="relative">
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-amber-400 border border-amber-500/20 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105"
            title="Canvas FX Settings"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>FX Theme</span>
          </button>

          {/* Controls Popover */}
          {showControls && (
            <div className="absolute bottom-12 left-0 w-64 p-4 rounded-xl glass-panel text-xs space-y-3 shadow-2xl border border-amber-500/30">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" /> Ambient Engine
                </span>
                <button
                  onClick={() => setIsEnabled(!isEnabled)}
                  className="text-slate-400 hover:text-white"
                  title={isEnabled ? "Disable Animation" : "Enable Animation"}
                >
                  {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                </button>
              </div>

              {isEnabled && (
                <>
                  <div>
                    <label className="text-slate-400 block mb-1.5">Color Palette</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setParticleMode("amber")}
                        className={`py-1 rounded text-[10px] font-semibold border ${
                          particleMode === "amber"
                            ? "bg-amber-500/20 border-amber-500 text-amber-300"
                            : "border-white/10 text-slate-400 hover:bg-white/5"
                        }`}
                      >
                        Amber Glow
                      </button>
                      <button
                        onClick={() => setParticleMode("cyan")}
                        className={`py-1 rounded text-[10px] font-semibold border ${
                          particleMode === "cyan"
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                            : "border-white/10 text-slate-400 hover:bg-white/5"
                        }`}
                      >
                        Cyber Cyan
                      </button>
                      <button
                        onClick={() => setParticleMode("neon")}
                        className={`py-1 rounded text-[10px] font-semibold border ${
                          particleMode === "neon"
                            ? "bg-purple-500/20 border-purple-500 text-purple-300"
                            : "border-white/10 text-slate-400 hover:bg-white/5"
                        }`}
                      >
                        Neon Pulse
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Particle Density</span>
                      <span className="text-amber-400 font-mono">{particleCount}</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="120"
                      value={particleCount}
                      onChange={(e) => setParticleCount(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded border-none accent-amber-500 cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
