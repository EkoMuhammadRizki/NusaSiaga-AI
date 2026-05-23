"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SimulationControlsProps {
  rainfall: number;
  waterLevel: number;
  damBreak: boolean;
  evacuationBlocked: boolean;
  onRainfallChange: (v: number) => void;
  onWaterLevelChange: (v: number) => void;
  onDamBreakChange: (v: boolean) => void;
  onEvacuationBlockedChange: (v: boolean) => void;
}

export function SimulationControls({
  rainfall,
  waterLevel,
  damBreak,
  evacuationBlocked,
  onRainfallChange,
  onWaterLevelChange,
  onDamBreakChange,
  onEvacuationBlockedChange,
}: SimulationControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontrol Simulasi Digital Twin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between">
            <Label>Curah Hujan (mm/24j)</Label>
            <span className="text-sm font-bold text-emerald-400">{rainfall}</span>
          </div>
          <Slider
            value={[rainfall]}
            min={0}
            max={200}
            step={5}
            onValueChange={([v]) => onRainfallChange(v)}
            className="mt-2"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <Label>Tinggi Muka Air (m)</Label>
            <span className="text-sm font-bold text-emerald-400">{waterLevel.toFixed(1)}</span>
          </div>
          <Slider
            value={[waterLevel * 10]}
            min={0}
            max={50}
            step={1}
            onValueChange={([v]) => onWaterLevelChange(v / 10)}
            className="mt-2"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-3 hover:bg-white/5">
          <input
            type="checkbox"
            checked={damBreak}
            onChange={(e) => onDamBreakChange(e.target.checked)}
            className="h-4 w-4 rounded accent-emerald-500"
          />
          <div>
            <p className="text-sm font-medium text-white">Simulasi Tanggul Jebol</p>
            <p className="text-xs text-white/50">Memperbesar area terendam 40%</p>
          </div>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-3 hover:bg-white/5">
          <input
            type="checkbox"
            checked={evacuationBlocked}
            onChange={(e) => onEvacuationBlockedChange(e.target.checked)}
            className="h-4 w-4 rounded accent-emerald-500"
          />
          <div>
            <p className="text-sm font-medium text-white">Jalur Evakuasi Tertutup</p>
            <p className="text-xs text-white/50">Mengurangi jalur aman tersedia</p>
          </div>
        </label>
      </CardContent>
    </Card>
  );
}
