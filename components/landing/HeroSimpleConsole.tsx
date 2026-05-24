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
  { id: 1, loc: "Jakarta", msg: "Anomali Curah Hujan", time: "2 mnt lalu", status: "Kritis", color: "text-red-400", bg: "bg-red-500/10" },
  { id: 2, loc: "Semarang", msg: "Tinggi Muka Air +12cm", time: "5 mnt lalu", status: "Peringatan", color: "text-orange-400", bg: "bg-orange-500/10" },
  { id: 3, loc: "Makassar", msg: "Sinkronisasi Sensor Selesai", time: "12 mnt lalu", status: "Aktif", color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const metrics = [
  { label: "TINGKAT AKURASI AI", value: 98.4, suffix: "%", icon: Cpu },
  { label: "SENSOR AKTIF", value: 1248, suffix: "", icon: Radio },
  { label: "LATENSI", value: 42, suffix: "ms", icon: Zap },
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
    <div className="relative flex h-[360px] sm:h-[420px] md:h-[480px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#040a16] shadow-2xl transition-all duration-300">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081225] to-[#040a16]" />
      <div className="absolute inset-0 opacity-[0.03] geo-grid" />

      {/* Header - More Compact */}
      <div className="relative z-10 border-b border-white/5 bg-white/[0.02] px-3 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </div>
          <span className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.25em] text-white/70 uppercase font-display">
            Komando Risiko Nasional
          </span>
        </div>
        <div className="flex items-center gap-3 text-white/30">
          <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase font-display tabular-nums">
            {currentTime}
          </span>
        </div>
      </div>

      {/* Main Content Area - Optimized Spacing */}
      <div className="relative z-10 grid flex-1 grid-cols-12 overflow-hidden">
        
        {/* Left: Metrics (4 cols) */}
        <div className="col-span-4 border-r border-white/5 p-2 sm:p-4 space-y-2 sm:space-y-4">
          <div className="grid gap-2 sm:grid-cols-1 sm:gap-3">
            {metrics.map((m, i) => (
              <motion.div 
                key={m.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col gap-0.5 sm:gap-1 rounded-xl bg-white/[0.02] p-2 sm:p-3 border border-white/5"
              >
                <div className="flex items-center gap-1.5">
                  <m.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400/50 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-[6px] sm:text-[8px] font-black text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">{m.label}</span>
                </div>
                <div className="text-sm sm:text-xl font-black text-white font-display leading-tight">
                  <AnimatedNumber value={m.value} suffix={m.suffix} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-2 sm:p-3">
            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
              <Database className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-400/50" />
              <span className="text-[6px] sm:text-[8px] font-black text-white/20 uppercase tracking-widest">Sinkronisasi Data</span>
            </div>
            <div className="flex gap-0.5 sm:gap-1 h-5 sm:h-8 items-end">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
                <motion.div
                  key={v}
                  animate={{ height: [3, Math.random() * 12 + 3, 3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: v * 0.1 }}
                  className="flex-1 rounded-full bg-cyan-500/20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Feed (8 cols) */}
        <div className="col-span-8 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="text-[6px] sm:text-[8px] font-black text-white/20 uppercase tracking-widest">Feed Informasi Risiko</h4>
            <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[6px] sm:text-[7px] font-bold text-emerald-400 uppercase tracking-tighter">Live</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-1.5 sm:space-y-2 overflow-y-auto scrollbar-hide">
            {alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2 sm:p-3 transition-all hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={cn("h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full", alert.color.replace("text", "bg"))} />
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[9px] sm:text-[11px] font-black text-white leading-none">{alert.loc}</span>
                      <span className="text-[7px] sm:text-[8px] font-bold text-white/20 uppercase tracking-tighter">{alert.time}</span>
                    </div>
                    <p className="text-[8px] sm:text-[10px] font-medium text-white/40 mt-0.5 sm:mt-1 leading-tight">{alert.msg}</p>
                  </div>
                </div>
                <div className={cn("rounded px-1.5 sm:px-2 py-0.5 text-[6px] sm:text-[8px] font-black tracking-widest uppercase border", alert.bg, alert.color, alert.color.replace("text", "border"))}>
                  {alert.status}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] p-2 sm:p-3 flex items-start gap-2 sm:gap-3"
          >
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[6px] sm:text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-0.5 sm:mb-1">Strategi Mitigasi AI</p>
              <p className="text-[8px] sm:text-[10px] font-medium text-white/50 leading-tight">Mengoptimalkan jaringan sensor wilayah untuk mengantisipasi koridor curah hujan.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Status - Compact */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.01] px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-500/30" />
            <span className="text-[6px] sm:text-[8px] font-black text-white/20 uppercase tracking-widest">Sistem: Stabil</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-white/20">
            <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest">Delay 12ms</span>
          </div>
        </div>
        <div className="flex gap-0.5 sm:gap-1 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-0.5 w-2 sm:w-3 rounded-full bg-emerald-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
