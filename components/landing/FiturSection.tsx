"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RainfallChart } from "@/components/charts/RainfallChart";
import { RiskGauge } from "@/components/charts/RiskGauge";
import { AlertTimeline } from "@/components/charts/AlertTimeline";

const RealtimeRiskMap = dynamic(
  () => import("@/components/maps/RealtimeRiskMap").then((mod) => mod.RealtimeRiskMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" /> }
);

const DisasterDigitalTwinMap = dynamic(
  () => import("@/components/maps/DisasterDigitalTwinMap").then((mod) => mod.DisasterDigitalTwinMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-900 animate-pulse rounded-2xl" /> }
);

const features = [
  { title: "Real-Time Risk Map", viz: "map" },
  { title: "Disaster Digital Twin", viz: "digital-twin" },
  { title: "Explainable Risk Reasoning", viz: "text" },
  { title: "Citizen & Field Report", viz: "timeline" },
  { title: "Early Warning Notification", viz: "timeline" },
  { title: "Edge Intelligence", viz: "text" },
  { title: "AI Risk Prediction", viz: "gauge" },
  { title: "Decision Support Dashboard", viz: "chart" },
];

export function FiturSection() {
  return (
    <motion.section
      id="fitur"
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-display text-center text-3xl font-bold tracking-tight text-white md:text-4xl">Fitur Platform</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
          Bento grid modern untuk command center kebencanaan nasional
        </p>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            if (f.viz === "map" || f.viz === "digital-twin") {
              return (
                <motion.div
                  key={f.title}
                  className="relative h-full w-full row-span-4 md:col-span-2 md:row-span-3"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute inset-0">
                    {f.viz === "map" ? (
                      <RealtimeRiskMap className="h-full w-full" />
                    ) : (
                      <DisasterDigitalTwinMap className="h-full w-full" />
                    )}
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={f.title}
                className={`glass-card overflow-hidden rounded-2xl p-5 glow-emerald-hover ${
                  i === 7 ? "lg:col-span-2" : ""
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="font-display font-semibold tracking-tight text-white">{f.title}</h3>
                <div className="mt-2 h-[calc(100%-2rem)]">
                  {f.viz === "gauge" && (
                    <div className="flex justify-center">
                      <RiskGauge score={78} size={100} />
                    </div>
                  )}
                  {f.viz === "chart" && <RainfallChart height={100} />}
                  {f.viz === "timeline" && (
                    <AlertTimeline
                      events={[
                        { time: "08:00", label: "Alert SIAGA dikirim", level: "warning" },
                        { time: "07:30", label: "Model AI update", level: "info" },
                      ]}
                    />
                  )}
                  {f.viz === "text" && (
                    <p className="text-xs leading-relaxed text-slate-400">
                      AI menjelaskan penyebab risiko dengan bukti data satelit, sensor, dan laporan
                      warga untuk keputusan yang transparan.
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
