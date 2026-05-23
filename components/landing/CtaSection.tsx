"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PilotTriggerButton } from "@/components/landing/pilot/PilotTriggerButton";

export function CtaSection() {
  return (
    <motion.section
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#0B1F3A] to-[#0E3A5F] px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Bangun Sistem Peringatan Dini yang Lebih Cerdas dan Kontekstual
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          NusaSiaga AI membantu Indonesia bergerak dari dashboard bencana pasif menuju sistem
          prediksi dan simulasi risiko yang real-time, explainable, dan siap digunakan untuk
          pengambilan keputusan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/login">Masuk ke Dashboard</Link>
          </Button>
          <PilotTriggerButton size="lg" variant="secondary">
            Ajukan Pilot Project
          </PilotTriggerButton>
        </div>
      </div>
    </motion.section>
  );
}
