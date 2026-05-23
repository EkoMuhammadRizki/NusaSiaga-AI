"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FloodLeafletMap = dynamic(
  () => import("@/components/maps/FloodLeafletMap").then((mod) => mod.FloodLeafletMap),
  { ssr: false, loading: () => <div className="min-h-[320px] w-full bg-slate-900 animate-pulse rounded-xl" /> }
);
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface FloodSimulationViewProps {
  rainfall: number;
  waterLevel: number;
  damBreak: boolean;
  evacuationBlocked: boolean;
}

export function FloodSimulationView({
  rainfall,
  waterLevel,
  damBreak,
  evacuationBlocked,
}: FloodSimulationViewProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [rainfall, waterLevel, damBreak, evacuationBlocked]);

  const floodIntensity = Math.min(1, (rainfall / 200) * 0.5 + (waterLevel / 5) * 0.3 + (damBreak ? 0.3 : 0));
  const population = Math.round(500000 + rainfall * 1200 + waterLevel * 80000 + (damBreak ? 200000 : 0));
  const area = Math.round(12 + rainfall * 0.08 + waterLevel * 3 + (damBreak ? 15 : 0));
  const safeRoutes = evacuationBlocked ? 2 : Math.max(1, 5 - Math.floor(waterLevel));
  const riskLevel =
    floodIntensity > 0.7 ? "KRITIS" : floodIntensity > 0.5 ? "TINGGI" : floodIntensity > 0.3 ? "SEDANG" : "RENDAH";

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Visualisasi Dampak Banjir
            {loading && <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-2xl border border-emerald-500/20 bg-[#0B1F3A]/80 p-2">
            <motion.div
              animate={{ opacity: loading ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
              className="min-h-[320px] sm:min-h-[400px] flex flex-col"
            >
              <FloodLeafletMap floodIntensity={floodIntensity} />
            </motion.div>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <p className="text-sm text-emerald-300 loading-pulse">AI mensimulasikan dampak...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Populasi Terdampak", value: population.toLocaleString("id-ID") },
          { label: "Area Terendam", value: `${area} km²` },
          { label: "Jalur Aman", value: `${safeRoutes} rute` },
          { label: "Risk Level Baru", value: riskLevel },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-white/50">{item.label}</p>
              <p className="mt-1 text-xl font-bold text-white">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
