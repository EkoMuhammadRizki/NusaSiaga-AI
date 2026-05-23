"use client";

import { motion } from "framer-motion";
import { Database, Clock, Monitor, MapPin } from "lucide-react";

const problems = [
  {
    title: "Data Bencana Terpisah",
    desc: "BMKG, BNPB, dan pemda menggunakan sistem yang tidak terintegrasi.",
    icon: Database,
    stat: "12+ sistem",
  },
  {
    title: "Peringatan Sering Terlambat",
    desc: "Alert manual membutuhkan waktu berjam-jam untuk disebarluaskan.",
    icon: Clock,
    stat: "+4 jam delay",
  },
  {
    title: "Dashboard Masih Pasif",
    desc: "Hanya menampilkan data historis tanpa prediksi dan simulasi.",
    icon: Monitor,
    stat: "0% prediktif",
  },
  {
    title: "Wilayah 3T Sulit Terjangkau",
    desc: "Sensor dan komunikasi terbatas di daerah terpencil.",
    icon: MapPin,
    stat: "38% tanpa IoT",
  },
];

export function MasalahSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">Masalah yang Kami Atasi</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              className="animated-border p-6 glow-emerald-hover transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <p.icon className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/50">{p.desc}</p>
              <p className="mt-4 text-2xl font-bold text-emerald-400">{p.stat}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
