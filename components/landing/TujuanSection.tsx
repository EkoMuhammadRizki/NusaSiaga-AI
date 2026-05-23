"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Satellite, CloudRain } from "lucide-react";

const icons = [
  { Icon: Shield, label: "Ketahanan Nasional" },
  { Icon: Globe, label: "Cakupan Indonesia" },
  { Icon: Satellite, label: "Data Satelit" },
  { Icon: CloudRain, label: "Cuaca Ekstrem" },
];

export function TujuanSection() {
  return (
    <motion.section
      id="tujuan"
      className="py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Dibangun untuk Ketahanan Bencana Indonesia
          </h2>
          <p className="mt-4 text-white/60">
            Indonesia membutuhkan sistem kebencanaan yang tidak hanya menampilkan peta, tetapi juga
            mampu memprediksi risiko, menjelaskan penyebab ancaman, dan membantu pengambilan
            keputusan cepat.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {icons.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              className="glass-card flex flex-col items-center rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
                <Icon className="h-7 w-7 text-emerald-400" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
