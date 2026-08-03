"use client";

import { useState } from "react";
import { Zap, Bot, Shield, Sparkles, ArrowRight, Layers, Lock, Cpu } from "lucide-react";

interface Feature {
  id: string;
  icon: any;
  title: string;
  badge: string;
  summary: string;
  details: string;
  techSpecs: string[];
}

export default function FeatureSneakPeek() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      id: "speed",
      icon: Zap,
      title: "Ultra-Fast Global Engine",
      badge: "< 30ms Edge Latency",
      summary: "Built on distributed edge node network ensuring near-instantaneous load times worldwide.",
      details: "Our engine executes serverless edge functions within milliseconds of user interaction. Zero cold starts, optimized asset streaming, and automatic multi-region failover.",
      techSpecs: ["HTTP/3 & QUIC Protocol", "V8 Isolated Runtime", "Instant Cache Invalidation"],
    },
    {
      id: "ai",
      icon: Bot,
      title: "Autonomous AI Assistant",
      badge: "Gemini Powered",
      summary: "Context-aware intelligence that assists with complex code generation, refactoring, and debugging.",
      details: "Leverages cutting-edge LLMs fine-tuned specifically for full-stack web applications. Real-time predictive autocomplete and automatic test generation.",
      techSpecs: ["Context Window 2.0M Tokens", "Multi-modal Code Synthesis", "Zero-Data Retention Policy"],
    },
    {
      id: "security",
      icon: Shield,
      title: "Zero-Trust Encryption",
      badge: "SOC-2 Ready",
      summary: "End-to-end security architecture protecting user data with quantum-resistant encryption standard.",
      details: "Every data packet is signed and encrypted client-side. Integrated role-based access control (RBAC), automatic vulnerability scanning, and audit logging.",
      techSpecs: ["AES-256 GCM Payload", "Automated Compliance Audits", "Encrypted Key Vault"],
    },
    {
      id: "collab",
      icon: Layers,
      title: "Real-Time Canvas Workspace",
      badge: "Multi-User Sync",
      summary: "Seamless multi-user editing with conflict-free replicated data types (CRDTs) and live presence.",
      details: "Collaborate with teammates simultaneously without lag. Features live cursor tracking, instant visual diffs, and inline audio/video spatial communication.",
      techSpecs: ["WebSocket / WebRTC Mesh", "CRDT State Resolution", "60 FPS Visual Sync"],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Sneak Peek
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          What We're Crafting Behind The Scenes
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
          Here is a sneak peek into the key capabilities being baked directly into our new platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveFeature(item)}
              className="group glass-card p-6 rounded-3xl cursor-pointer relative overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300"
            >
              {/* Background gradient effect on hover */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-amber-300 text-[11px] font-mono font-semibold">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {item.summary}
              </p>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Inspect Tech Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Tech Specs Drawer/Modal */}
      {activeFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-amber-500/30 shadow-2xl relative">
            <button
              onClick={() => setActiveFeature(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <activeFeature.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-semibold">
                  {activeFeature.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-100">
                  {activeFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {activeFeature.details}
            </p>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Technical Blueprint
              </span>
              {activeFeature.techSpecs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-amber-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveFeature(null)}
              className="w-full mt-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Close Spec Sheet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
