"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Mail, ShieldCheck, Server, Globe, ArrowRight, CheckCircle2, PhoneCall, Lock, MapPin, Clock, ExternalLink, Wrench, Video, Cpu } from "lucide-react";
import { SITE_CONFIG } from "./config/siteConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  // Target Date parsed from SITE_CONFIG
  const [targetDate] = useState(() => {
    const parsed = new Date(SITE_CONFIG.targetLaunchDate);
    if (!isNaN(parsed.getTime())) return parsed;
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 800);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setShowContact(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-grid-subtle bg-[#0b0f19] text-slate-100 selection:bg-blue-600/30">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* <div className="relative w-12 h-10 flex items-center justify-center bg-white/10 rounded-xl p-1 shadow-sm overflow-hidden">
            <Image
              src={SITE_CONFIG.logoPath}
              alt={`${SITE_CONFIG.companyName} Logo`}
              width={140}
              height={40}
              priority
              className="w-full h-full object-contain"
            />
          </div> */}
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
              {SITE_CONFIG.companyName}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Abhayapuri, Assam • Est. {SITE_CONFIG.establishedYear} ({SITE_CONFIG.experienceYears} Years)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={SITE_CONFIG.onlineShopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-600/20 border border-orange-500/30 text-orange-400 hover:text-orange-300 text-xs font-semibold transition-all"
          >
            <span>Visit Online Shop</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => setShowContact(true)}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
          >
            Contact & Support
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>{SITE_CONFIG.statusBadge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          {SITE_CONFIG.headline}
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-4 leading-relaxed">
          {SITE_CONFIG.subtext}
        </p>

        {/* Minimal Countdown */}
        <div className="my-8 w-full max-w-xl">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-3">
            Estimated Service Restoration Window
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Days", val: timeLeft.days },
              { label: "Hours", val: timeLeft.hours },
              { label: "Minutes", val: timeLeft.minutes },
              { label: "Seconds", val: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="minimal-card p-4 rounded-xl text-center">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white block">
                  {unit.val.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1 block">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Email Notification Form */}
        <div className="w-full max-w-md my-2">
          {isSubscribed ? (
            <div className="minimal-card p-4 rounded-xl flex items-center justify-center gap-2 text-emerald-400 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! We will notify you when the store & site return online.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for status updates..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
              >
                {isLoading ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Minimal Corporate Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 text-left">
          <div className="minimal-card p-5 rounded-2xl">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Computer & Laptop Sales/Repair</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Genuine desktops, laptops, printers, and certified repairs using official parts.
            </p>
          </div>

          <div className="minimal-card p-5 rounded-2xl">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Video className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">CCTV & Surveillance</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Security camera supply, installation, and monitoring for homes, shops, and offices.
            </p>
          </div>

          <div className="minimal-card p-5 rounded-2xl">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Networking & E-Waste</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Office Wi-Fi, structured cabling, and free responsible e-waste recycling.
            </p>
          </div>
        </div>

        {/* Store Location & Contact Card */}
        <div className="minimal-card p-5 rounded-2xl w-full mt-6 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" /> Visit Our Storefront
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {SITE_CONFIG.address}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> {SITE_CONFIG.workingHours}
            </p>
          </div>

          <a
            href={`tel:${SITE_CONFIG.phoneHotline.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-bold transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call {SITE_CONFIG.phoneHotline}</span>
          </a>
        </div>
      </main>

      {/* Support & Inquiry Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="minimal-card p-6 rounded-2xl max-w-md w-full relative">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-white mb-1">Network Service Support</h3>
            <p className="text-xs text-slate-400 mb-4">
              {SITE_CONFIG.address}
            </p>

            {contactSent ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl text-center font-medium">
                Inquiry sent to Network Service customer desk.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-medium">
                    Your Name / Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-medium">
                    Inquiry / Repair Request
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe computer repair, CCTV installation, or sales inquiry..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
                >
                  Send Inquiry
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-blue-400" /> Phone/WhatsApp: {SITE_CONFIG.phoneHotline}
              </span>
              <span>{SITE_CONFIG.workingHours.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-slate-950/60 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Image
              src={SITE_CONFIG.logoPath}
              alt={`${SITE_CONFIG.companyName} Logo`}
              width={16}
              height={16}
              className="opacity-70"
            />
            <span>&copy; {new Date().getFullYear()} {SITE_CONFIG.copyrightText}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={SITE_CONFIG.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" /> WhatsApp: {SITE_CONFIG.phoneHotline}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              {SITE_CONFIG.supportEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
