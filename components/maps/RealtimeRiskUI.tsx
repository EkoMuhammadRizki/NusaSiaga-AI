"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { regions } from "@/lib/data/regions";
import type { Region } from "@/lib/types";
import { Activity, CloudRain, Radio, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    title: "Data Streams",
    value: "847",
    subtext: "Satelit, Radar, & IoT Hidrologi",
    icon: Radio,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Tropical Rainfall",
    value: "142 mm",
    subtext: "Kontekstual Curah Hujan Ekstrem",
    icon: CloudRain,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Active Early Warning",
    value: "12 Areas",
    subtext: "Skala Prioritas Evakuasi BNPB",
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

// Coordinates mapped to the 120x80 viewBox island paths
const regionCoords: Record<string, { cx: number; cy: number }> = {
  jakarta: { cx: 35, cy: 51 },
  bandung: { cx: 38, cy: 53.5 },
  semarang: { cx: 52, cy: 52.5 },
  pontianak: { cx: 42, cy: 25 },
  makassar: { cx: 82, cy: 40 },
};

function getRiskColor(score: number) {
  if (score > 70) return "rgb(239, 68, 68)"; // Merah (Kritis)
  if (score >= 60) return "rgb(249, 115, 22)"; // Oranye (Siaga)
  if (score >= 40) return "rgb(234, 179, 8)"; // Kuning (Waspada)
  return "rgb(16, 185, 129)"; // Hijau (Aman)
}

function getRiskStatus(score: number) {
  if (score > 70) return "KRITIS";
  if (score >= 60) return "SIAGA";
  if (score >= 40) return "WASPADA";
  return "AMAN";
}

export function RealtimeRiskUI({ className }: { className?: string }) {
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl bg-slate-950 p-5 border border-slate-800 shadow-2xl", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            Disaster Digital Twin
            <span className="relative flex h-2 w-2 ml-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          </h2>
          <p className="mt-1 text-xs text-slate-400 font-medium">Predictive Simulation & Risk Intelligence Platform</p>
        </div>
      </div>

      {/* Metrics Row (Outside Map) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition-all hover:bg-slate-900">
            <div className={cn("rounded-lg p-2.5", metric.bg, metric.border, "border")}>
              <metric.icon className={cn("h-5 w-5", metric.color)} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.title}</span>
              <span className="mt-0.5 text-xl font-bold tracking-tight text-slate-100">{metric.value}</span>
              <span className="mt-1 text-[10px] font-medium leading-snug text-slate-400">{metric.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Map Canvas */}
      <div className="relative mt-2 flex-1 min-h-[400px] w-full rounded-xl bg-[#09090b] border border-slate-800/50 overflow-hidden group">
        <svg viewBox="0 0 120 80" className="h-full w-full object-contain p-4" preserveAspectRatio="xMidYMid meet">
          
          {/* Island Paths (Minimalist Dark Slate) */}
          <g className="text-slate-900 fill-current stroke-slate-800/50" strokeWidth="0.4">
            <path d="M5 25 L15 15 L35 30 L25 45 L5 25" /> {/* Sumatra */}
            <path d="M40 10 L60 10 L65 25 L55 35 L40 30 L40 10" /> {/* Kalimantan */}
            <path d="M30 50 L75 50 L75 55 L30 55 L30 50" /> {/* Java */}
            <path d="M75 15 L85 15 L85 25 L95 25 L95 30 L85 30 L85 45 L80 45 L80 30 L75 30 L75 15" /> {/* Sulawesi */}
            <path d="M100 25 L115 25 L120 40 L115 55 L100 50 L105 40 L100 25" /> {/* Papua */}
            <path d="M78 52 L105 52 L105 55 L78 55 Z" /> {/* Bali & NT */}
          </g>

          {/* Markers */}
          {regions.map((region) => {
            const coords = regionCoords[region.id] || { cx: region.cx, cy: region.cy };
            const color = getRiskColor(region.riskScore);
            const status = getRiskStatus(region.riskScore);

            return (
              <g 
                key={region.id} 
                className="cursor-pointer transition-transform duration-300 hover:scale-[1.15]"
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                style={{ transformOrigin: `${coords.cx}px ${coords.cy}px` }}
              >
                {/* Marker Node */}
                <circle cx={coords.cx} cy={coords.cy} r="0.8" fill={color} />
                <circle cx={coords.cx} cy={coords.cy} r="1.5" fill="none" stroke={color} strokeWidth="0.3" opacity="0.6" />
                
                {/* City Label */}
                <text 
                  x={coords.cx + 2.5} 
                  y={coords.cy + 0.6} 
                  fontSize="2" 
                  fontWeight="600" 
                  className="fill-slate-400 pointer-events-none select-none transition-colors group-hover:fill-slate-300"
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive Tooltip / Popover */}
        <AnimatePresence>
          {hoveredRegion && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute z-50 flex flex-col gap-1.5 rounded-xl border border-slate-800 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-md"
              style={{
                // Convert 120x80 viewBox coords to percentages roughly for positioning
                left: `${((regionCoords[hoveredRegion.id]?.cx || hoveredRegion.cx) / 120) * 100}%`,
                top: `${((regionCoords[hoveredRegion.id]?.cy || hoveredRegion.cy) / 80) * 100}%`,
                transform: "translate(-50%, -120%)",
                minWidth: "140px"
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2">
                <span className="font-semibold text-slate-200 text-sm tracking-tight">{hoveredRegion.name}</span>
                <span 
                  className="rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase border" 
                  style={{ 
                    backgroundColor: `${getRiskColor(hoveredRegion.riskScore)}15`, 
                    color: getRiskColor(hoveredRegion.riskScore),
                    borderColor: `${getRiskColor(hoveredRegion.riskScore)}30`
                  }}
                >
                  {getRiskStatus(hoveredRegion.riskScore)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="text-slate-400 font-medium">Risk Index</span>
                <span className="font-mono font-bold text-slate-100">{hoveredRegion.riskScore}<span className="text-slate-500 text-[10px]">/100</span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
