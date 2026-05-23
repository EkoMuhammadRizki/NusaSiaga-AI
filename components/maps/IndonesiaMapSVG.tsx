"use client";

import { motion } from "framer-motion";
import { regions } from "@/lib/data/regions";
import { cn } from "@/lib/utils";
import type { Region } from "@/lib/types";
import { FloodHeatmapLayer } from "./FloodHeatmapLayer";
import { IndonesiaIslands } from "./IndonesiaIslands";
import { MapLegend } from "./MapLegend";
import { EvacuationRoute } from "./EvacuationRoute";
import { SensorNodes } from "./SensorNodes";

const labelLayout: Record<
  string,
  { dy: number; dx: number; anchor: "start" | "middle" | "end" }
> = {
  pontianak: { dy: -5, dx: 0, anchor: "middle" },
  jakarta: { dy: 6, dx: -2, anchor: "end" },
  bandung: { dy: 8, dx: 0, anchor: "middle" },
  semarang: { dy: 6, dx: 2, anchor: "start" },
  makassar: { dy: -5, dx: 0, anchor: "middle" },
};

function markerColor(level: Region["riskLevel"]) {
  switch (level) {
    case "kritis":
      return "#ef4444";
    case "tinggi":
      return "#f97316";
    case "sedang":
      return "#eab308";
    default:
      return "#10b981";
  }
}

interface IndonesiaMapSVGProps {
  selectedId?: string | null;
  onRegionSelect?: (region: Region) => void;
  highlightFilter?: string;
  showRadar?: boolean;
  showSensors?: boolean;
  showEvacuation?: boolean;
  showLegend?: boolean;
  floodIntensity?: number;
  className?: string;
  variant?: "default" | "hero" | "compact";
}

export function IndonesiaMapSVG({
  selectedId,
  onRegionSelect,
  highlightFilter = "",
  showRadar = false,
  showSensors = false,
  showEvacuation = false,
  showLegend = true,
  floodIntensity = 0,
  className,
  variant = "default",
}: IndonesiaMapSVGProps) {
  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  const filtered = regions.filter(
    (r) =>
      !highlightFilter ||
      r.name.toLowerCase().includes(highlightFilter.toLowerCase()) ||
      r.province.toLowerCase().includes(highlightFilter.toLowerCase())
  );

  const heightClass = isHero
    ? "h-full min-h-[300px]"
    : isCompact
      ? "h-full min-h-[180px]"
      : "h-full min-h-[260px]";

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl",
        isHero && "bg-[#081828]/40 backdrop-blur-sm",
        className
      )}
    >
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="xMidYMid meet"
        className={cn("h-full w-full", heightClass)}
        role="img"
        aria-label="Peta risiko bencana Indonesia"
      >
        <defs>
          <linearGradient id="mapOcean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a2844" />
            <stop offset="100%" stopColor="#061018" />
          </linearGradient>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(14, 58, 95, 0.3)" />
            <stop offset="100%" stopColor="rgba(6, 15, 28, 0)" />
          </radialGradient>
          <filter id="markerGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {!isHero && <rect width="120" height="80" fill="url(#mapOcean)" />}
        <rect width="120" height="80" fill="url(#mapVignette)" />

        <IndonesiaIslands />

        {isHero && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
            className="pointer-events-none"
          >
            {/* Holographic scanning lines across the map */}
            {[10, 20, 30, 40, 50, 60, 70].map((y) => (
              <line 
                key={y} 
                x1="0" y1={y} x2="120" y2={y} 
                stroke="#10b981" 
                strokeWidth="0.1" 
                strokeDasharray="1 3"
              />
            ))}
          </motion.g>
        )}

        <FloodHeatmapLayer
          regions={filtered}
          floodIntensity={floodIntensity}
          subtle={isHero || isCompact}
        />

        {showEvacuation && <EvacuationRoute />}
        {showSensors && <SensorNodes />}

        {filtered.map((region) => {
          const isSelected = selectedId === region.id;
          const layout = labelLayout[region.id] ?? { dy: 6, dx: 0, anchor: "middle" as const };
          const color = markerColor(region.riskLevel);
          const pinR = isSelected ? 3.2 : 2.8;

          return (
            <g
              key={region.id}
              className="cursor-pointer"
              onClick={() => onRegionSelect?.(region)}
              role="button"
              aria-label={`${region.name}, skor risiko ${region.riskScore}`}
            >
              {/* Pin stem */}
              <line
                x1={region.cx}
                y1={region.cy}
                x2={region.cx}
                y2={region.cy + 2}
                stroke={color}
                strokeWidth="0.4"
                opacity="0.8"
              />
              <motion.circle
                cx={region.cx}
                cy={region.cy}
                r={pinR}
                fill={color}
                stroke="#fff"
                strokeWidth={isSelected ? 0.6 : 0.35}
                filter={isSelected ? "url(#markerGlow)" : undefined}
                whileHover={{ scale: 1.15 }}
                style={{ transformOrigin: `${region.cx}px ${region.cy}px` }}
              />
              <circle
                cx={region.cx}
                cy={region.cy}
                r={pinR + 2}
                fill="none"
                stroke={color}
                strokeWidth="0.25"
                opacity="0.4"
              />
              <text
                x={region.cx + layout.dx}
                y={region.cy + layout.dy}
                textAnchor={layout.anchor}
                fill="rgba(255,255,255,0.92)"
                fontSize="3"
                fontWeight="600"
                className="pointer-events-none select-none"
              >
                {region.name}
              </text>
              <text
                x={region.cx + layout.dx}
                y={region.cy + layout.dy + 3.2}
                textAnchor={layout.anchor}
                fill="rgba(255,255,255,0.45)"
                fontSize="2.2"
                className="pointer-events-none"
              >
                {region.riskScore}
              </text>
            </g>
          );
        })}

        {showLegend && <MapLegend compact={isCompact || isHero} />}

        {/* Subtle radar arc — corner only, not full screen */}
        {showRadar && (
          <g transform="translate(95, 12)" opacity="0.5">
            <circle cx={0} cy={0} r={10} fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="0.4" />
            <path
              d="M 0 0 L 0 -10 A 10 10 0 0 1 7 -7 Z"
              fill="rgba(16,185,129,0.15)"
              className="origin-center animate-[spin_4s_linear_infinite]"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
