"use client";

import { CheckCircle, Loader2, Circle, Flame, Cpu, ShieldCheck, Rocket } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: any;
  status: "completed" | "in_progress" | "upcoming";
  percent: number;
  date: string;
}

export default function RoadmapProgress() {
  const milestones: Milestone[] = [
    {
      id: 1,
      title: "Core System & Database Architecture",
      description: "High-throughput cloud architecture, microservices setup, and secure database schemas.",
      icon: Cpu,
      status: "completed",
      percent: 100,
      date: "Phase 1 - Done",
    },
    {
      id: 2,
      title: "Design System & Micro-Interactions",
      description: "Crafting glassmorphic UI tokens, dark/light themes, and fluid component library.",
      icon: Flame,
      status: "completed",
      percent: 100,
      date: "Phase 2 - Done",
    },
    {
      id: 3,
      title: "AI Integration & Security Audits",
      description: "Integrating LLM engine models, SOC-2 compliance checks, and penetration testing.",
      icon: ShieldCheck,
      status: "in_progress",
      percent: 75,
      date: "Phase 3 - Active",
    },
    {
      id: 4,
      title: "Global CDN & Public Unveil",
      description: "Global edge deployment, stress testing, and VIP launch invitation distribution.",
      icon: Rocket,
      status: "upcoming",
      percent: 0,
      date: "Phase 4 - Up Next",
    },
  ];

  const overallProgress = 78;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Development Status
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mt-0.5">
              Build Roadmap & Milestones
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                {overallProgress}%
              </span>
              <span className="block text-[10px] text-slate-400 uppercase font-medium">
                Overall Progress
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 mb-8">
          <div className="w-full h-3 bg-slate-900/90 rounded-full p-0.5 border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-1000 relative"
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                          m.status === "completed"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : m.status === "in_progress"
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-slate-800/50 border-white/10 text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-slate-400">{m.date}</span>
                    </div>

                    {/* Status Badge */}
                    {m.status === "completed" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3" /> Done
                      </span>
                    )}
                    {m.status === "in_progress" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                        <Loader2 className="w-3 h-3 animate-spin" /> In Progress
                      </span>
                    )}
                    {m.status === "upcoming" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10 text-slate-400 text-[10px] font-medium">
                        <Circle className="w-3 h-3" /> Scheduled
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-slate-100 text-sm">{m.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Sub progress bar */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Status</span>
                  <span
                    className={`font-mono font-bold ${
                      m.status === "completed"
                        ? "text-emerald-400"
                        : m.status === "in_progress"
                        ? "text-amber-400"
                        : "text-slate-500"
                    }`}
                  >
                    {m.percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
