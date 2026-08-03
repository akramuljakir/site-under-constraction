"use client";

import { useEffect, useState } from "react";
import { Clock, Calendar, Bell } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Target date set to 45 days in future from current date
  const [targetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  const [reminderAdded, setReminderAdded] = useState(false);

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
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSetCalendarReminder = () => {
    // Generate ICS calendar file or open Google Calendar link
    const title = encodeURIComponent("🚀 Next-Gen Platform Launch");
    const details = encodeURIComponent("Grand unveiling of our brand new digital experience!");
    const startDate = targetDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${startDate}`;
    window.open(calendarUrl, "_blank");
    setReminderAdded(true);
    setTimeout(() => setReminderAdded(false), 3000);
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => {
    const formatted = value.toString().padStart(2, "0");
    return (
      <div className="flex flex-col items-center">
        <div className="relative group">
          {/* Ambient Glow behind card */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
          
          {/* Card Body */}
          <div className="relative flex items-center justify-center w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-xl backdrop-blur-xl">
            <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 tracking-tight">
              {formatted}
            </span>

            {/* Glass line divider */}
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-amber-500/10 pointer-events-none"></div>
          </div>
        </div>
        <span className="mt-3 text-xs sm:text-sm uppercase tracking-widest font-semibold text-slate-400">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 flex flex-col items-center">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-8 shadow-inner">
        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
        <span>Estimated Launch Countdown</span>
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8 justify-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      {/* Calendar integration action */}
      <div className="mt-8">
        <button
          onClick={handleSetCalendarReminder}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all shadow-md hover:scale-105"
        >
          {reminderAdded ? (
            <>
              <Bell className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span className="text-emerald-400">Added to Google Calendar!</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Add Launch Date to Calendar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
