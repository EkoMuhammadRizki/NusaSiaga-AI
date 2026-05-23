"use client";

import type { Region } from "@/lib/types";

interface FloodHeatmapLayerProps {
  regions: Region[];
  floodIntensity?: number;
  subtle?: boolean;
}

function riskColor(level: Region["riskLevel"]) {
  switch (level) {
    case "kritis":
      return { fill: "239, 68, 68", stroke: "249, 115, 22" };
    case "tinggi":
      return { fill: "249, 115, 22", stroke: "234, 179, 8" };
    case "sedang":
      return { fill: "234, 179, 8", stroke: "16, 185, 129" };
    default:
      return { fill: "16, 185, 129", stroke: "16, 185, 129" };
  }
}

export function FloodHeatmapLayer({
  regions,
  floodIntensity = 0,
  subtle = false,
}: FloodHeatmapLayerProps) {
  return (
    <g className="pointer-events-none">
      {regions.map((region) => {
        const intensity = Math.min(1, (region.riskScore / 100) * 0.5 + floodIntensity * 0.35);
        const radius = subtle ? 3.5 + intensity * 2 : 4 + intensity * 3.5;
        const colors = riskColor(region.riskLevel);
        return (
          <circle
            key={`heat-${region.id}`}
            cx={region.cx}
            cy={region.cy}
            r={radius}
            fill={`rgba(${colors.fill}, ${0.12 + intensity * 0.15})`}
            stroke={`rgba(${colors.stroke}, ${0.25 + intensity * 0.2})`}
            strokeWidth="0.35"
          />
        );
      })}
    </g>
  );
}
