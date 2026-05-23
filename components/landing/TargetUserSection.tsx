"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Cloud, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    title: "BNPB / BPBD",
    desc: "Koordinasi tanggap darurat dan peringatan dini multi-wilayah.",
    icon: Building2,
    badge: "Command Center",
  },
  {
    title: "Pemerintah Daerah",
    desc: "Keputusan evakuasi dan alokasi sumber daya berbasis data.",
    icon: Landmark,
    badge: "Policy Support",
  },
  {
    title: "BMKG / BIG",
    desc: "Integrasi cuaca, radar, dan peta dasar geospasial.",
    icon: Cloud,
    badge: "Data Integration",
  },
  {
    title: "Masyarakat",
    desc: "Laporan warga dan akses informasi risiko lokal.",
    icon: Users,
    badge: "Citizen Portal",
  },
];

export function TargetUserSection() {
  return (
    <section id="pengguna" className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">Pengguna Platform</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {users.map((u, i) => (
            <motion.div
              key={u.title}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <u.icon className="h-10 w-10 text-emerald-400" />
              <Badge className="mt-4" variant="outline">
                {u.badge}
              </Badge>
              <h3 className="mt-3 font-bold text-white">{u.title}</h3>
              <p className="mt-2 text-sm text-white/50">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
