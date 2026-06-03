"use client";

import { useState, useMemo, useEffect } from "react";
import { SimulationControls } from "@/components/dashboard/SimulationControls";
import { FloodSimulationView } from "@/components/dashboard/FloodSimulationView";
import { regions } from "@/lib/data/regions";

// Centralized Custom Hook for Simulation State Management
export function useSimulation(filterRegionId?: string | null) {
  const region = useMemo(() => {
    return regions.find((r) => r.id === filterRegionId) || regions.find((r) => r.id === "semarang")!;
  }, [filterRegionId]);

  const [curahHujan, setCurahHujan] = useState<number>(142);
  const [tinggiMukaAir, setTinggiMukaAir] = useState<number>(2.1);
  const [tanggulJebol, setTanggulJebol] = useState<boolean>(false);
  const [jalurEvakuasiTertutup, setJalurEvakuasiTertutup] = useState<boolean>(false);

  // Sync starting values with the region's actual current conditions
  useEffect(() => {
    if (region) {
      setCurahHujan(region.rainfall);
      setTinggiMukaAir(region.waterLevel);
    }
  }, [region]);

  // Predictive Mock Engine
  const impact = useMemo(() => {
    // 1. POPULASI TERDAMPAK: Baseline 2% of population, changes based on rainfall and water level
    const basePopulasi = Math.round(region.population * 0.02);
    let populasi = basePopulasi;
    const rainFactor = curahHujan / region.rainfall;
    const waterFactor = tinggiMukaAir / region.waterLevel;
    populasi = Math.round(populasi * (0.3 + 0.35 * Math.pow(rainFactor, 1.5) + 0.35 * Math.pow(waterFactor, 1.8)));

    // Jika checkbox 'tanggulJebol' AKTIF -> Populasi Terdampak melonjak 2x lipat
    if (tanggulJebol) {
      populasi = populasi * 2;
    }

    // 2. AREA TERENDAM (km²): Baseline 0.45 * riskScore
    const baseArea = Math.round(region.riskScore * 0.45);
    let area = baseArea + (curahHujan - region.rainfall) * 0.15 + (tinggiMukaAir - region.waterLevel) * 6;

    // Jika curahHujan > rainfall * 1.2 ATAU tinggiMukaAir > waterLevel * 1.5 -> Area Terendam naik signifikan
    if (curahHujan > region.rainfall * 1.2 || tinggiMukaAir > region.waterLevel * 1.5) {
      area = area * 1.5;
    }

    // Jika checkbox 'tanggulJebol' AKTIF -> Area Terendam bertambah luas
    if (tanggulJebol) {
      area = area * 1.4;
    }

    area = Math.max(1.0, parseFloat(area.toFixed(1)));

    // 3. JALUR AMAN: Baseline based on riskScore
    let jalurAman = region.riskScore > 80 ? 6 : region.riskScore > 60 ? 8 : 10;
    if (tinggiMukaAir > region.waterLevel * 1.8) jalurAman -= 1;
    if (tinggiMukaAir > region.waterLevel * 2.5) jalurAman -= 2;
    if (curahHujan > region.rainfall * 2.0) jalurAman -= 1;

    // Jika checkbox 'jalurEvakuasiTertutup' AKTIF -> Angka "Jalur Aman" berkurang tinggal 2 jalur
    if (jalurEvakuasiTertutup) {
      jalurAman = 2;
    }

    jalurAman = Math.max(1, jalurAman);

    // 4. RISK LEVEL BADGE: Color-coded conditional severity
    let riskLevel: "RENDAH" | "SIAGA" | "KRITIS" = "RENDAH";
    if (curahHujan > region.rainfall * 1.5 || tinggiMukaAir > region.waterLevel * 1.8) {
      riskLevel = "SIAGA";
    }
    if (tanggulJebol) {
      riskLevel = "KRITIS";
    }

    // Dynamic flood intensity factor for Leaflet map visualisation
    const floodIntensity = Math.min(
      1.0,
      (curahHujan / 300) * 0.4 + (tinggiMukaAir / 5) * 0.35 + (tanggulJebol ? 0.25 : 0)
    );

    return {
      populasi,
      area,
      jalurAman,
      riskLevel,
      floodIntensity,
    };
  }, [curahHujan, tinggiMukaAir, tanggulJebol, jalurEvakuasiTertutup, region]);

  return {
    curahHujan,
    setCurahHujan,
    tinggiMukaAir,
    setTinggiMukaAir,
    tanggulJebol,
    setTanggulJebol,
    jalurEvakuasiTertutup,
    setJalurEvakuasiTertutup,
    impact,
  };
}

export default function SimulationPage() {
  const [pilotProject, setPilotProject] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nusasiaga-pilot-project");
      if (stored) {
        try {
          setPilotProject(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const filterRegionId = pilotProject?.region?.id || null;

  const {
    curahHujan,
    setCurahHujan,
    tinggiMukaAir,
    setTinggiMukaAir,
    tanggulJebol,
    setTanggulJebol,
    jalurEvakuasiTertutup,
    setJalurEvakuasiTertutup,
    impact,
  } = useSimulation(filterRegionId);

  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  const activeCity = pilotProject ? pilotProject.region.city : "Kota Semarang";
  const activeProvince = pilotProject ? pilotProject.region.province : "Jawa Tengah";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl font-bold tracking-tight text-white">Digital Twin — Simulasi Bencana</h1>
        <p className="mt-1 text-sm text-slate-400">
          Model dampak banjir berbasis skenario curah hujan dan kondisi infrastruktur di {activeCity} · {activeProvince}
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SimulationControls
            rainfall={curahHujan}
            waterLevel={tinggiMukaAir}
            damBreak={tanggulJebol}
            evacuationBlocked={jalurEvakuasiTertutup}
            onRainfallChange={setCurahHujan}
            onWaterLevelChange={setTinggiMukaAir}
            onDamBreakChange={setTanggulJebol}
            onEvacuationBlockedChange={setJalurEvakuasiTertutup}
          />
        </div>
        <div className="lg:col-span-8">
          <FloodSimulationView
            rainfall={curahHujan}
            waterLevel={tinggiMukaAir}
            damBreak={tanggulJebol}
            evacuationBlocked={jalurEvakuasiTertutup}
            populasi={impact.populasi}
            area={impact.area}
            jalurAman={impact.jalurAman}
            riskLevel={impact.riskLevel}
            floodIntensity={impact.floodIntensity}
            filterRegionId={filterRegionId}
          />
        </div>
      </div>
    </div>
  );
}
