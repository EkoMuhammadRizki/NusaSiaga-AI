"use client";

import { sensors } from "@/lib/data/sensors";
import { regions } from "@/lib/data/regions";

export function SensorNodes() {
  return (
    <g>
      {sensors.slice(0, 6).map((sensor, i) => {
        const region = regions.find((r) => r.id === sensor.regionId);
        if (!region) return null;
        const offsetX = (i % 3) * 2 - 2;
        const offsetY = Math.floor(i / 3) * 2 - 1;
        const color =
          sensor.status === "active"
            ? "#10b981"
            : sensor.status === "delayed"
              ? "#eab308"
              : "#ef4444";
        return (
          <g key={sensor.id}>
            <circle
              cx={region.cx + offsetX}
              cy={region.cy + offsetY}
              r="1"
              fill={color}
              className={sensor.status === "active" ? "live-dot" : ""}
            />
            <circle
              cx={region.cx + offsetX}
              cy={region.cy + offsetY}
              r="2"
              fill="none"
              stroke={color}
              strokeWidth="0.2"
              opacity="0.5"
            />
          </g>
        );
      })}
    </g>
  );
}
