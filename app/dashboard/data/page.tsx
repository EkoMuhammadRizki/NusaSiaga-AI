"use client";

import { DataSourceGrid } from "@/components/dashboard/DataSourceGrid";

export default function DataSourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Sumber Data</h1>
        <p className="text-sm text-white/50">
          Monitoring integrasi BMKG, radar, satelit, IoT, dan laporan warga
        </p>
      </div>
      <DataSourceGrid />
    </div>
  );
}
