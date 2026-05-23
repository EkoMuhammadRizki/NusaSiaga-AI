"use client";

import { motion } from "framer-motion";

export function WeatherRadarOverlay({ className }: { className?: string }) {
  return (
    <motion.div
      className={`radar-sweep absolute h-3/4 w-3/4 rounded-full opacity-40 ${className ?? ""}`}
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, rgba(16,185,129,0.2) 40deg, transparent 80deg)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}
