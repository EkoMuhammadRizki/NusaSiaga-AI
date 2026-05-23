"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { AlertCenter } from "@/components/dashboard/AlertCenter";
import { RainfallChart } from "@/components/charts/RainfallChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RealtimeRiskMap = dynamic(
  () => import("@/components/maps/RealtimeRiskMap").then((mod) => mod.RealtimeRiskMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" /> }
);

export function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">Preview Command Center</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-white/50">
          Tampilan dashboard operasi darurat — BMKG modern meets emergency operations center
        </p>
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0B1F3A]/90 p-4 shadow-2xl md:p-6"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="live-dot h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-white/50">LIVE PREVIEW — Command Center Mode</span>
          </div>
          <AnalyticsCards />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <RealtimeRiskMap variant="compact" className="lg:col-span-2 min-h-[450px]" />
            <div className="space-y-4">
              <AlertCenter />
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Curah Hujan</CardTitle>
                </CardHeader>
                <CardContent>
                  <RainfallChart height={100} />
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
