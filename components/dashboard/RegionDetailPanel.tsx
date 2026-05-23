"use client";

import type { Region } from "@/lib/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { RiskGauge } from "@/components/charts/RiskGauge";
import { RainfallChart } from "@/components/charts/RainfallChart";
import { AlertTimeline } from "@/components/charts/AlertTimeline";
import { Separator } from "@/components/ui/separator";

interface RegionDetailPanelProps {
  region: Region | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegionDetailPanel({ region, open, onOpenChange }: RegionDetailPanelProps) {
  if (!region) return null;

  const timeline = [
    { time: "08:15", label: "Status naik ke SIAGA", level: "warning" as const },
    { time: "07:30", label: `Curah hujan ${region.rainfall} mm/24j`, level: "critical" as const },
    { time: "06:00", label: "Sensor sungai aktif", level: "info" as const },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{region.name}</SheetTitle>
          <p className="text-sm text-white/50">{region.province}</p>
        </SheetHeader>

        <div className="mt-6 flex justify-center">
          <RiskGauge score={region.riskScore} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={region.riskLevel === "kritis" ? "awas" : "siaga"}>
            Risiko {region.riskLevel}
          </Badge>
          <Badge variant="outline">Longsor {region.landslideRisk}%</Badge>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-white/40">Curah Hujan</p>
            <p className="font-bold text-white">{region.rainfall} mm</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-white/40">Muka Air</p>
            <p className="font-bold text-white">{region.waterLevel} m</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 col-span-2">
            <p className="text-white/40">Populasi Terdampak</p>
            <p className="font-bold text-white">{region.population.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <h4 className="mt-4 text-sm font-semibold text-white">Penyebab Risiko</h4>
        <ul className="mt-2 space-y-1">
          {region.causes.map((c, i) => (
            <li key={i} className="text-xs text-white/60">
              • {c}
            </li>
          ))}
        </ul>

        <h4 className="mt-4 text-sm font-semibold text-white">Rekomendasi Aksi</h4>
        <ul className="mt-2 space-y-1">
          {region.recommendations.map((r, i) => (
            <li key={i} className="text-xs text-emerald-300/80">
              → {r}
            </li>
          ))}
        </ul>

        <h4 className="mt-4 text-sm font-semibold text-white">Histori Banjir</h4>
        <ul className="mt-2 space-y-1">
          {region.floodHistory.map((h, i) => (
            <li key={i} className="text-xs text-white/50">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <RainfallChart height={120} />
        </div>

        <h4 className="mt-4 text-sm font-semibold text-white">Timeline Alert</h4>
        <AlertTimeline events={timeline} />
      </SheetContent>
    </Sheet>
  );
}
