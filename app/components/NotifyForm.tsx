"use client";

import { useState, useEffect, FormEvent } from "react";
import { Send, CheckCircle2, ShieldCheck, Sparkles, Users } from "lucide-react";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "subscribed" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(1482);

  useEffect(() => {
    const isSubbed = localStorage.getItem("site_under_construction_subbed");
    if (isSubbed) {
      setStatus("subscribed");
    }
  }, []);

  const triggerConfetti = () => {
    try {
      // Dynamic import of canvas-confetti
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#fbbf24", "#06b6d4", "#a855f7", "#ffffff"],
        });
      });
    } catch {
      // Fallback silently if confetti fails
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    setTimeout(() => {
      setStatus("subscribed");
      setSubscriberCount((prev) => prev + 1);
      localStorage.setItem("site_under_construction_subbed", "true");
      triggerConfetti();
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 px-4">
      <div className="relative group">
        {/* Subtle Ambient Backdrop Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-600/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
          {status === "subscribed" ? (
            <div className="flex flex-col items-center text-center space-y-3 py-4 animate-float">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                You're on the VIP VIP List! <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              </h3>
              <p className="text-sm text-slate-300 max-w-md">
                We've reserved your early access spot. You'll receive a private invite code 24 hours before our official public unveil!
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("site_under_construction_subbed");
                  setStatus("idle");
                  setEmail("");
                }}
                className="mt-2 text-xs text-slate-500 hover:text-slate-400 underline"
              >
                Register another email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-100 tracking-tight">
                  Get Exclusive VIP Early Access
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Be among the first to explore our platform when we launch. No spam, ever.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-white/10 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                  {status === "error" && (
                    <p className="absolute left-2 -bottom-5 text-[11px] text-red-400 font-medium">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-95 transition-all duration-200 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Reserving...
                    </span>
                  ) : (
                    <>
                      <span>Notify Me</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Proof & Guarantee */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <strong className="text-slate-200 font-semibold">{subscriberCount.toLocaleString()}</strong> people already on the waitlist
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Unsubscribe anytime
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
