"use client";

import { sensors } from "@/lib/data/sensors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statusConfig = {
  active: { color: "bg-emerald-500", label: "Aktif", pulse: true },
  delayed: { color: "bg-yellow-500", label: "Tertunda", pulse: false },
  offline: { color: "bg-red-500", label: "Offline", pulse: false },
  maintenance: { color: "bg-white/30", label: "Maintenance", pulse: false },
};

export function SensorStatusPanel({ filterRegionId }: { filterRegionId?: string | null }) {
  const displayedSensors = filterRegionId
    ? sensors.filter((s) => s.regionId === filterRegionId)
    : sensors;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-base">Status Sensor Live</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {displayedSensors.slice(0, 6).map((sensor) => {
          const cfg = statusConfig[sensor.status];
          return (
            <div
              key={sensor.id}
              className="flex items-center justify-between rounded-xl border border-white/10 p-3 transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    cfg.color,
                    cfg.pulse && "live-dot"
                  )}
                />
                <div>
                  <p className="text-sm font-semibold tracking-tight text-white">{sensor.name}</p>
                  <p className="text-[10px] font-medium text-slate-500">
                    {sensor.lastReading} · Baterai {sensor.battery}%
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{cfg.label}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
