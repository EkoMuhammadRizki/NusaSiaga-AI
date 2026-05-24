import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer id="kontak" className="border-t border-white/10 bg-[#0B1F3A]/80 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-1">
            <Image src="/NusaSiagaAI.png" alt="NusaSiaga AI Logo" width={64} height={64} className="object-contain -ml-2 -mr-1 mt-1" />
            <span className="font-display text-lg font-bold tracking-tight text-white">NusaSiaga AI</span>
          </div>
          <p className="mt-3 text-sm text-white/50">
            Platform AI Disaster Intelligence untuk ketahanan bencana Indonesia.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Navigasi</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/50">
            {["Beranda", "Fitur", "Cara Kerja", "Dashboard"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-emerald-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Kontak</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/50">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> kontak@nusasiaga.ai
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Purwakarta, Indonesia
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Mitra</h4>
          <p className="mt-3 text-sm text-white/50">BNPB · BPBD · BMKG · BIG</p>
          <div className="mt-4 flex gap-3">
            {["LinkedIn", "X", "YouTube"].map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white/40"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 px-4 pt-8 text-center text-xs text-white/40 lg:px-8">
        © 2026 NusaSiaga AI. Prototype demonstrasi. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
