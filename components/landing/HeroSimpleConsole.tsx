"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Activity, 
  Radio, 
  Cpu, 
  Zap,
  ChevronRight,
  Bell,
  Wifi,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  { id: 1, loc: "Jakarta", msg: "Rainfall Anomaly", time: "2m ago", status: "Critical", color: "text-red-400", bg: "bg-red-500/10" },
  { id: 2, loc: "Semarang", msg: "Water Level +12cm", time: "5m ago", status: "Warning", color: "text-orange-400", bg: "bg-orange-500/10" },
  { id: 3, loc: "Makassar", msg: "Sensor Sync Complete", time: "12m ago", status: "Active", color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const metrics = [
  { label: "AI CONFIDENCE", value: 98.4, suffix: "%", icon: Cpu },
  { label: "ACTIVE SENSORS", value: 1248, suffix: "", icon: Radio },
  { label: "LATENCY", value: 42, suffix: "ms", icon: Zap },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {displayValue % 1 === 0 ? displayValue.toLocaleString() : displayValue.toFixed(1)}
      {suffix}
    </span>
  );
}

export function HeroSimpleConsole() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().split(' ')[4] + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-[480px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#040a16] shadow-2xl">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081225] to-[#040a16]" />
      <div className="absolute inset-0 opacity-[0.03] geo-grid" />

      {/* Header - More Compact */}
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-5 py-3.5 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </div>
          <span className="text-[9px] font-black tracking-[0.25em] text-white/70 uppercase font-display">
            National Risk Command
          </span>
        </div>
        <div className="flex items-center gap-3 text-white/30">
          <span className="text-[9px] font-black tracking-widest uppercase font-display tabular-nums">
            {currentTime}
          </span>
        </div>
      </div>

      {/* Main Content Area - Optimized Spacing */}
      <div className="relative z-10 grid flex-1 grid-cols-12 overflow-hidden">
        
        {/* Left: Metrics (4 cols) */}
        <div className="col-span-4 border-r border-white/5 p-4 space-y-4">
          <div className="grid gap-3">
            {metrics.map((m, i) => (
              <motion.div 
                key={m.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col gap-1 rounded-xl bg-white/[0.02] p-3 border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <m.icon className="h-3 w-3 text-emerald-400/50 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">{m.label}</span>
                </div>
                <div className="text-xl font-black text-white font-display leading-tight">
                  <AnimatedNumber value={m.value} suffix={m.suffix} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-3 w-3 text-cyan-400/50" />
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Database Sync</span>
            </div>
            <div className="flex gap-1 h-8 items-end">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
                <motion.div
                  key={v}
                  animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: v * 0.1 }}
                  className="flex-1 rounded-full bg-cyan-500/20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Feed (8 cols) */}
        <div className="col-span-8 p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[8px] font-black text-white/20 uppercase tracking-widest">Intelligence Feed</h4>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7px] font-bold text-emerald-400 uppercase tracking-tighter">Live</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
            {alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("h-1.5 w-1.5 rounded-full", alert.color.replace("text", "bg"))} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-white leading-none">{alert.loc}</span>
                      <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">{alert.time}</span>
                    </div>
                    <p className="text-[10px] font-medium text-white/40 mt-1 leading-tight">{alert.msg}</p>
                  </div>
                </div>
                <div className={cn("rounded-lg px-2 py-0.5 text-[8px] font-black tracking-widest uppercase border", alert.bg, alert.color, alert.color.replace("text", "border"))}>
                  {alert.status}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] p-3 flex items-start gap-3"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">AI Mitigation Strategy</p>
              <p className="text-[10px] font-medium text-white/50 leading-tight">Optimizing regional sensor grid for incoming precipitation corridors.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Status - Compact */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.01] px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3 text-emerald-500/30" />
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Engine: Stable</span>
          </div>
          <div className="flex items-center gap-2 text-white/20">
            <Zap className="h-3 w-3" />
            <span className="text-[8px] font-black uppercase tracking-widest">12ms Delay</span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-0.5 w-3 rounded-full bg-emerald-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
