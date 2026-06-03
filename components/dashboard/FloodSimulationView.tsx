"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const FloodLeafletMap = dynamic(
  () => import("@/components/maps/FloodLeafletMap").then((mod) => mod.FloodLeafletMap),
  { ssr: false, loading: () => <div className="min-h-[320px] w-full bg-slate-900 animate-pulse rounded-xl" /> }
);

interface FloodSimulationViewProps {
  rainfall: number;
  waterLevel: number;
  damBreak: boolean;
  evacuationBlocked: boolean;
  populasi: number;
  area: number;
  jalurAman: number;
  riskLevel: "RENDAH" | "SIAGA" | "KRITIS";
  floodIntensity: number;
  filterRegionId?: string | null;
}

export function FloodSimulationView({
  rainfall,
  waterLevel,
  damBreak,
  evacuationBlocked,
  populasi,
  area,
  jalurAman,
  riskLevel,
  floodIntensity,
  filterRegionId,
}: FloodSimulationViewProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [rainfall, waterLevel, damBreak, evacuationBlocked]);

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
              <FloodLeafletMap 
                floodIntensity={floodIntensity} 
                damBreak={damBreak} 
                evacuationBlocked={evacuationBlocked} 
                filterRegionId={filterRegionId}
              />
            </motion.div>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <p className="text-sm text-emerald-300 font-medium animate-pulse">AI mensimulasikan dampak...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* EVACUATION BLOCKED ALERT */}
      {evacuationBlocked && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-400 backdrop-blur transition-all duration-300"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 animate-pulse text-amber-500" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold tracking-tight text-amber-400">Peringatan: Jalur Evakuasi Utama Terblokir!</h4>
            <p className="mt-1 text-xs leading-relaxed text-amber-400/80">
              Beberapa rute keluar utama terendam air tinggi. Segera alihkan warga terdampak ke rute alternatif yang tersisa (2 rute aman yang masih aktif).
            </p>
          </div>
        </motion.div>
      )}

      {/* METRIC ROW */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Populasi Terdampak */}
        <Card className="transition-all duration-300 border-white/5 bg-[#0F172A]/60">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">Populasi Terdampak</p>
            <p className="mt-1 text-xl font-bold text-white transition-all duration-300">
              {populasi.toLocaleString("id-ID")} <span className="text-xs font-normal text-slate-500">jiwa</span>
            </p>
          </CardContent>
        </Card>

        {/* Area Terendam */}
        <Card className="transition-all duration-300 border-white/5 bg-[#0F172A]/60">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">Area Terendam</p>
            <p className="mt-1 text-xl font-bold text-white transition-all duration-300">
              {area} <span className="text-xs font-normal text-slate-500">km²</span>
            </p>
          </CardContent>
        </Card>

        {/* Jalur Aman */}
        <Card className={`transition-all duration-300 border-white/5 ${evacuationBlocked ? 'bg-amber-950/20 border-amber-500/20' : 'bg-[#0F172A]/60'}`}>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">Jalur Aman</p>
            <p className={`mt-1 text-xl font-bold transition-all duration-300 ${evacuationBlocked ? 'text-amber-400' : 'text-white'}`}>
              {jalurAman} <span className="text-xs font-normal text-slate-500">rute</span>
            </p>
          </CardContent>
        </Card>

        {/* Risk Level Baru */}
        <Card className="transition-all duration-300 border-white/5 bg-[#0F172A]/60">
          <CardContent className="p-4 text-center flex flex-col items-center justify-center min-h-[72px]">
            <p className="text-xs text-slate-400 font-medium mb-1">Risk Level Baru</p>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${
                riskLevel === "KRITIS"
                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                  : riskLevel === "SIAGA"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}
            >
              {riskLevel}
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
