"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Trophy, RotateCcw, Zap, Sparkles, Award } from "lucide-react";

export default function InteractiveArcade() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [combo, setCombo] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<string | null>(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("site_arcade_high_score");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setIsGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("site_arcade_high_score", score.toString());
      }
      if (score >= 50) {
        setUnlockedBadge("Cyber Pioneer Tier S");
      } else if (score >= 25) {
        setUnlockedBadge("Quantum Tap Master Tier A");
      } else if (score >= 10) {
        setUnlockedBadge("Early Explorer Badge");
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setCombo(1);
    setIsGameOver(false);
    setUnlockedBadge(null);
    setIsPlaying(true);
    spawnNextNode();
  };

  const spawnNextNode = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    setActiveNode(randomIndex);
  };

  const handleNodeClick = (index: number) => {
    if (!isPlaying) return;
    if (index === activeNode) {
      const addedPoints = 1 * combo;
      setScore((prev) => prev + addedPoints);
      setCombo((prev) => Math.min(prev + 1, 5));
      spawnNextNode();
    } else {
      setCombo(1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>

        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold">
                Mini Arcade
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Cyber-Tap Energy Reactor
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
              <span>Best: {highScore}</span>
            </div>
          </div>
        </div>

        {!isPlaying && !isGameOver && (
          <div className="text-center py-6 space-y-4">
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Bored waiting for the site launch? Tap the glowing energy nodes before time expires to test your reflexes and unlock exclusive VIP launch badges!
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Start 15s Challenge</span>
            </button>
          </div>
        )}

        {isPlaying && (
          <div>
            <div className="flex justify-between items-center mb-4 text-xs font-mono">
              <div className="text-slate-300">
                Time Remaining: <span className="text-amber-400 font-bold text-sm">{timeLeft}s</span>
              </div>
              <div className="text-slate-300">
                Score: <span className="text-amber-400 font-bold text-sm">{score}</span>
              </div>
              <div className="text-emerald-400 font-bold">
                Combo: x{combo}
              </div>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-3 my-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                const isActive = activeNode === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleNodeClick(index)}
                    className={`h-20 sm:h-24 rounded-2xl transition-all duration-150 flex items-center justify-center relative ${
                      isActive
                        ? "bg-gradient-to-tr from-amber-500 to-orange-400 border-2 border-white shadow-lg shadow-amber-500/50 scale-95"
                        : "bg-slate-900/80 border border-white/10 hover:bg-slate-800/80"
                    }`}
                  >
                    {isActive && (
                      <div className="w-8 h-8 rounded-full bg-slate-950/40 flex items-center justify-center animate-ping">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" /> Challenge Finished
            </div>
            <h4 className="text-2xl font-black text-slate-100 font-mono">
              Final Score: {score}
            </h4>

            {unlockedBadge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold my-2 shadow-inner">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Unlocked: {unlockedBadge}!</span>
              </div>
            )}

            <div>
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
