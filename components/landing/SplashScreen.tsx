"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Memuat Geospatial Foundation Model...",
    "Sinkronisasi Data BMKG & BNPB...",
    "Menghubungkan ke Edge Nodes...",
    "Inisialisasi Digital Twin..."
  ];

  useEffect(() => {
    // Start progress bar animation shortly after mount
    const progressTimer = setTimeout(() => {
      setProgress(true);
    }, 100);

    // Change status text periodically
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 850);

    // End loading screen after 3.5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 3500);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(loadingTimer);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center geo-grid transition-all duration-[750ms] ease-out ${
        !isLoading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Decorative overlays to match the Hero and page backgrounds */}
      <div className="pointer-events-none absolute inset-0 contour-bg opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo and Text */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Left: Pure Logo Image, scaled up to counteract internal image padding */}
          <div className="relative flex items-center justify-center -mr-2 md:-mr-4">
            <Image
              src="/NusaSiagaAI.png"
              alt="NusaSiaga AI Logo"
              width={200}
              height={200}
              className="relative z-10 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 scale-[1.4] object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            />
          </div>

          {/* Right: Brand Text */}
          <div className="text-hero whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-slate-100 relative z-20">
            NusaSiaga AI
          </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-12 w-80 md:w-96">
          <div className="h-1.5 w-full overflow-hidden rounded-full border border-slate-800/50 bg-slate-900 shadow-inner">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-[3000ms] ease-out ${
                progress ? "w-full" : "w-0"
              }`}
            />
          </div>
        </div>

        {/* Micro Status Text */}
        <div className="mt-4 animate-pulse text-center font-mono text-xs uppercase tracking-widest text-slate-500 md:text-sm">
          {statuses[statusIndex]}
        </div>
      </div>
    </div>
  );
}
