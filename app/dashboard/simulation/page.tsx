"use client";

import { useState, useMemo } from "react";
import { SimulationControls } from "@/components/dashboard/SimulationControls";
import { FloodSimulationView } from "@/components/dashboard/FloodSimulationView";

// Centralized Custom Hook for Simulation State Management
export function useSimulation() {
  const [curahHujan, setCurahHujan] = useState<number>(142);
  const [tinggiMukaAir, setTinggiMukaAir] = useState<number>(2.1);
  const [tanggulJebol, setTanggulJebol] = useState<boolean>(false);
  const [jalurEvakuasiTertutup, setJalurEvakuasiTertutup] = useState<boolean>(false);

  // Predictive Mock Engine
  const impact = useMemo(() => {
    // 1. POPULASI TERDAMPAK: Baseline 12,450 jiwa, changes based on rainfall and water level
    let populasi = 12450;
    const rainFactor = curahHujan / 142;
    const waterFactor = tinggiMukaAir / 2.1;
    populasi = Math.round(populasi * (0.3 + 0.35 * Math.pow(rainFactor, 1.5) + 0.35 * Math.pow(waterFactor, 1.8)));

    // Jika checkbox 'tanggulJebol' AKTIF -> Populasi Terdampak melonjak 2x lipat
    if (tanggulJebol) {
      populasi = populasi * 2;
    }

    // 2. AREA TERENDAM (km²): Baseline 29 km²
    let area = 29.0;
    // Base linear change
    area = 29.0 + (curahHujan - 142) * 0.15 + (tinggiMukaAir - 2.1) * 6;

    // Jika curahHujan > 150 mm ATAU tinggiMukaAir > 3 meter -> Area Terendam naik signifikan
    if (curahHujan > 150 || tinggiMukaAir > 3) {
      area = area * 1.5;
    }

    // Jika checkbox 'tanggulJebol' AKTIF -> Area Terendam bertambah luas
    if (tanggulJebol) {
      area = area * 1.4;
    }

    area = Math.max(1.0, parseFloat(area.toFixed(1)));

    // 3. JALUR AMAN: Baseline 8 routes
    let jalurAman = 8;
    if (tinggiMukaAir > 2.5) jalurAman -= 1;
    if (tinggiMukaAir > 3.5) jalurAman -= 2;
    if (curahHujan > 200) jalurAman -= 1;

    // Jika checkbox 'jalurEvakuasiTertutup' AKTIF -> Angka "Jalur Aman" berkurang tinggal 2 jalur
    if (jalurEvakuasiTertutup) {
      jalurAman = 2;
    }

    jalurAman = Math.max(1, jalurAman);

    // 4. RISK LEVEL BADGE: Color-coded conditional severity
    // Jika checkbox 'tanggulJebol' AKTIF -> Risk Level otomatis melompat ke "KRITIS" (Merah)
    // Jika curahHujan > 150 mm ATAU tinggiMukaAir > 3 meter -> Risk Level otomatis berubah menjadi "SIAGA" (Oranye)
    // Lainnya: "RENDAH" (Hijau)
    let riskLevel: "RENDAH" | "SIAGA" | "KRITIS" = "RENDAH";
    if (curahHujan > 150 || tinggiMukaAir > 3) {
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
  }, [curahHujan, tinggiMukaAir, tanggulJebol, jalurEvakuasiTertutup]);

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
  } = useSimulation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl font-bold tracking-tight text-white">Digital Twin — Simulasi Bencana</h1>
        <p className="mt-1 text-sm text-slate-400">
          Model dampak banjir berbasis skenario curah hujan dan kondisi infrastruktur
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
          />
        </div>
      </div>
    </div>
  );
}
