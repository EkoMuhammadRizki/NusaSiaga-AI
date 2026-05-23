"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { HeroSimpleConsole } from "./HeroSimpleConsole";

const badges = ["Geospatial AI", "Digital Twin", "Early Warning", "Real-Time Risk"];

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] flex-col contour-bg"
    >
      <div className="absolute inset-0 geo-grid opacity-80" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 pb-12 pt-20 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero text-5xl tracking-tighter text-white md:text-6xl lg:text-8xl">
            NusaSiaga AI
          </h1>
          <p className="text-display mt-6 text-xl font-semibold text-slate-200 md:text-2xl">
            Dashboard prediksi, simulasi, dan peringatan dini bencana tropis berbasis Geospatial AI
            dan Digital Twin untuk Indonesia.
          </p>
          <p className="mt-6 text-base leading-relaxed text-slate-400 md:text-lg">
            NusaSiaga AI membantu BNPB, BPBD, pemerintah daerah, dan masyarakat membaca risiko
            banjir, longsor, subsidensi, serta cuaca ekstrem secara real-time melalui integrasi data
            satelit, sensor, radar cuaca, laporan warga, dan model AI yang dapat dijelaskan.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <Badge key={b} variant="default">
                {b}
              </Badge>
            ))}
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/login">Masuk Dashboard</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative flex h-full min-h-[480px] items-center justify-center overflow-hidden rounded-2xl shadow-2xl shadow-emerald-500/5 order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroSimpleConsole />
        </motion.div>
        </div>
      </div>
    </section>
  );
}
