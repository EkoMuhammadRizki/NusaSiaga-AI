"use client";

import { useState } from "react";
import { SimulationControls } from "@/components/dashboard/SimulationControls";
import { FloodSimulationView } from "@/components/dashboard/FloodSimulationView";

export default function SimulationPage() {
  const [rainfall, setRainfall] = useState(120);
  const [waterLevel, setWaterLevel] = useState(2.5);
  const [damBreak, setDamBreak] = useState(false);
  const [evacuationBlocked, setEvacuationBlocked] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Digital Twin — Simulasi Bencana</h1>
        <p className="text-sm text-white/50">
          Model dampak banjir berbasis skenario curah hujan dan kondisi infrastruktur
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SimulationControls
            rainfall={rainfall}
            waterLevel={waterLevel}
            damBreak={damBreak}
            evacuationBlocked={evacuationBlocked}
            onRainfallChange={setRainfall}
            onWaterLevelChange={setWaterLevel}
            onDamBreakChange={setDamBreak}
            onEvacuationBlockedChange={setEvacuationBlocked}
          />
        </div>
        <div className="lg:col-span-2">
          <FloodSimulationView
            rainfall={rainfall}
            waterLevel={waterLevel}
            damBreak={damBreak}
            evacuationBlocked={evacuationBlocked}
          />
        </div>
      </div>
    </div>
  );
}
