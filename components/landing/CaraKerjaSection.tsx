"use client";

import { motion } from "framer-motion";
import {
  Database,
  Brain,
  Box,
  LayoutDashboard,
  Bell,
} from "lucide-react";

const steps = [
  { label: "Data Masuk", icon: Database },
  { label: "AI Menganalisis Risiko", icon: Brain },
  { label: "Digital Twin Mensimulasikan Dampak", icon: Box },
  { label: "Dashboard Memberi Rekomendasi", icon: LayoutDashboard },
  { label: "Peringatan Dikirim", icon: Bell },
];

export function CaraKerjaSection() {
  return (
    <section id="cara-kerja" className="py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-display text-center text-3xl font-bold tracking-tight text-white md:text-4xl">Cara Kerja</h2>
        <div className="mt-16 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="group relative">
                <div className="absolute -inset-2 rounded-2xl bg-emerald-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 glow-emerald transition-transform hover:scale-105">
                  <step.icon className="h-10 w-10 text-emerald-400" />
                  <span className="font-display absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3A] text-sm font-extrabold text-emerald-400 ring-1 ring-emerald-500/30">
                    {i + 1}
                  </span>
                </div>
              </div>
              <p className="font-display mt-6 max-w-[160px] text-sm font-semibold leading-tight text-white">{step.label}</p>
              {i < steps.length - 1 && (
                <div className="absolute left-full top-10 hidden h-[1px] w-full min-w-[40px] bg-gradient-to-r from-emerald-500/40 via-emerald-500/10 to-transparent lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
