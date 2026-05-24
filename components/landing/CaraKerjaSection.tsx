"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Data Ingestion",
    description: "Mengintegrasikan citra satelit, radar cuaca, IoT hidrologi, dan laporan warga dalam satu kesatuan data.",
    badges: ["Satelit SAR", "IoT Sensors", "Crowdsource"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-emerald-500 mb-3"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 10 12 15 7 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "AI Risk Analytics",
    description: "Geospatial Foundation Model memproses embedding multimodal untuk menghitung skor indeks risiko bahaya.",
    badges: ["Foundation Model", "AI Core"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-emerald-500 mb-3"
      >
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Digital Twin Simulation",
    description: "Mensimulasikan skenario hidrologi dan kerentanan infrastruktur tropis secara real-time.",
    badges: ["Scenario Engine", "GNN"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-emerald-500 mb-3"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Decision Support",
    description: "Dasbor memecah alasan risiko menggunakan Explainable AI (XAI) untuk keputusan evakuasi yang transparan.",
    badges: ["Explainable AI", "BNPB Portal"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-emerald-500 mb-3"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="9" y1="9" x2="21" y2="9" />
        <line x1="9" y1="15" x2="21" y2="15" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Alert Dispatch",
    description: "Mendistribusikan notifikasi peringatan dini secara instan ke wilayah rawan bencana via Edge Intelligence.",
    badges: ["Edge Nodes", "Low-Latency"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-emerald-500 mb-3"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export function CaraKerjaSection() {
  return (
    <section id="cara-kerja" className="py-24 relative overflow-hidden bg-transparent">
      {/* Subtle spotlight glow with no hard edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_60%)] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-display text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Cara Kerja
          </motion.h2>
          <motion.p 
            className="mt-4 text-sm text-slate-400 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Arsitektur digital twin kebencanaan terintegrasi secara end-to-end mulai dari akuisisi data real-time, simulasi hidrologi, hingga diseminasi peringatan dini yang responsif.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="group relative bg-[#0b1f3a]/80 border border-slate-700/40 p-5 rounded-2xl flex flex-col justify-between min-h-[280px] hover:border-emerald-500/40 hover:bg-[#0b1f3a]/95 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Card Top: Icon & Big Elegant Number */}
              <div className="flex justify-between items-start w-full">
                <div className="text-emerald-500 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
                <span className="font-mono text-5xl font-extrabold text-emerald-500/15 select-none group-hover:text-emerald-400/35 transition-colors duration-300">
                  {step.step}
                </span>
              </div>

              {/* Card Middle: Title & Technical Description */}
              <div className="mt-4 flex-grow flex flex-col justify-start">
                <h3 className="text-sm font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Card Bottom: Badges */}
              <div className="flex flex-wrap gap-1 mt-5 pt-3 border-t border-slate-800/60">
                {step.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-500/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
