"use client";

import { motion } from "framer-motion";
import { IndonesiaMapSVG } from "@/components/maps/IndonesiaMapSVG";
import { AlertTriangle, CloudRain, Radio } from "lucide-react";

const floatingCards = [
  { label: "Risiko Jakarta", value: "87", icon: AlertTriangle, className: "left-3 top-3" },
  { label: "Curah Hujan", value: "142 mm", icon: CloudRain, className: "right-3 bottom-14" },
  { label: "Sensor Aktif", value: "847", icon: Radio, className: "left-3 bottom-14" },
];

export function HeroMapVisualization() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3A]/80 p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="text-xs font-medium text-white/50">Peta Risiko Nasional</p>
        <div className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="text-[10px] font-semibold text-red-300">LIVE</span>
        </div>
      </div>

      <IndonesiaMapSVG
        variant="hero"
        showRadar={false}
        showSensors={false}
        showEvacuation={false}
        showLegend
      />

      {floatingCards.map((card, i) => (
        <motion.div
          key={card.label}
          className={`glass-card absolute z-10 max-w-[130px] rounded-lg px-2.5 py-1.5 ${card.className}`}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <card.icon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <div className="min-w-0">
              <p className="truncate text-[9px] font-medium tracking-wider text-slate-400 uppercase">{card.label}</p>
              <p className="text-analytics text-sm text-white glow-text-emerald">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
