"use client";

import { useState } from "react";
import { ReportForm } from "@/components/dashboard/ReportForm";
import { CitizenFeed } from "@/components/dashboard/CitizenFeed";
import type { CitizenReport } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  const [submitted, setSubmitted] = useState<CitizenReport[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Laporan Warga</h1>
        <p className="text-sm text-white/50">
          Sistem pelaporan crowd-sourced untuk validasi lapangan BPBD
        </p>
      </div>

      <ReportForm onSubmit={(r) => setSubmitted((prev) => [r, ...prev])} />

      {submitted.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-emerald-300">
              ✓ {submitted.length} laporan baru dikirim (simulasi realtime)
            </p>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">Daftar Laporan</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {["Menunggu Validasi", "Tervalidasi", "Ditolak"].map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>
        <CitizenFeed extraReports={submitted} />
      </div>
    </div>
  );
}
