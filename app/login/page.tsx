"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatTimestamp } from "@/lib/utils";
import { setMockSession } from "@/lib/auth-mock";

const DisasterDigitalTwinMap = dynamic(
  () => import("@/components/maps/DisasterDigitalTwinMap").then((mod) => mod.DisasterDigitalTwinMap),
  { ssr: false, loading: () => <div className="h-[400px] w-full rounded-2xl border border-slate-800 bg-slate-900/50 animate-pulse" /> }
);

const genericInstansis = [
  "BNPB Pusat",
  "BPBD Provinsi",
  "BPBD Kota/Kabupaten",
  "Pemerintah Daerah",
  "Dinas Kominfo",
  "Tim Reaksi Cepat / Petugas Lapangan",
];

export default function LoginPage() {
  const router = useRouter();
  const [timestamp, setTimestamp] = useState("");
  const [pilotProject, setPilotProject] = useState<any>(null);
  
  const [instansi, setInstansi] = useState("BNPB Pusat");
  const [peranAkses, setPeranAkses] = useState("Analis Risiko Nasional");
  const [email, setEmail] = useState("demo@nusasiaga.ai");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimestamp(formatTimestamp());
    const interval = setInterval(() => setTimestamp(formatTimestamp()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nusasiaga-pilot-project");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPilotProject(parsed);
          
          // Auto-fill instansi
          const name = parsed.institution.name;
          setInstansi(name);
          
          // Determine category and set default peran akses
          const type = parsed.institution.type;
          let cat = "BPBD Kota/Kabupaten";
          if (type === "BNPB") cat = "BNPB Pusat";
          else if (type === "BPBD") {
            if (name.toLowerCase().includes("provinsi") || name.toLowerCase().includes("prov")) {
              cat = "BPBD Provinsi";
            } else {
              cat = "BPBD Kota/Kabupaten";
            }
          } else if (type === "Pemerintah Daerah") cat = "Pemerintah Daerah";
          else if (type === "BMKG" || type === "Smart City" || type === "Dinas Kominfo") cat = "Dinas Kominfo";
          else cat = "Tim Reaksi Cepat / Petugas Lapangan";

          if (cat === "BPBD Kota/Kabupaten") {
            setPeranAkses("Operator Command Center");
          } else if (cat === "BNPB Pusat") {
            setPeranAkses("Analis Risiko Nasional");
          } else if (cat === "BPBD Provinsi") {
            setPeranAkses("Analis Risiko Provinsi");
          } else if (cat === "Pemerintah Daerah") {
            setPeranAkses("Koordinator Program Pilot");
          } else if (cat === "Dinas Kominfo") {
            setPeranAkses("Operator Broadcast Alert");
          } else {
            setPeranAkses("Petugas Lapangan");
          }
          
          // Set email
          if (parsed.institution.email) {
            setEmail(parsed.institution.email);
          }
        } catch (e) {
          console.error("Failed to parse pilot project", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const getCategoryForInstansi = (instansiName: string) => {
    if (genericInstansis.includes(instansiName)) {
      return instansiName;
    }
    if (pilotProject && instansiName === pilotProject.institution.name) {
      const type = pilotProject.institution.type;
      if (type === "BNPB") return "BNPB Pusat";
      if (type === "BPBD") {
        if (instansiName.toLowerCase().includes("provinsi") || instansiName.toLowerCase().includes("prov")) {
          return "BPBD Provinsi";
        }
        return "BPBD Kota/Kabupaten";
      }
      if (type === "Pemerintah Daerah") return "Pemerintah Daerah";
      if (type === "BMKG" || type === "Smart City" || type === "Dinas Kominfo") return "Dinas Kominfo";
      return "Tim Reaksi Cepat / Petugas Lapangan";
    }
    return "BPBD Kota/Kabupaten";
  };

  const currentCategory = getCategoryForInstansi(instansi);

  const getRolesForCategory = (category: string) => {
    switch (category) {
      case "BNPB Pusat":
        return [
          "Admin Nasional",
          "Analis Risiko Nasional",
          "Koordinator Multi-Wilayah",
          "Monitoring & Evaluasi Nasional",
          "Viewer Eksekutif",
        ];
      case "BPBD Provinsi":
        return [
          "Admin BPBD Provinsi",
          "Analis Risiko Provinsi",
          "Koordinator Kabupaten/Kota",
          "Operator Command Center Provinsi",
          "Viewer Eksekutif Provinsi",
        ];
      case "BPBD Kota/Kabupaten":
        return [
          "Admin BPBD Daerah",
          "Analis Risiko Daerah",
          "Operator Command Center",
          "Petugas Lapangan",
          "Tim Reaksi Cepat",
          "Viewer Eksekutif Daerah",
        ];
      case "Pemerintah Daerah":
        return [
          "Kepala Daerah / Eksekutif",
          "Sekretariat Daerah",
          "Perencana Kebijakan",
          "Viewer Eksekutif",
          "Koordinator Program Pilot",
        ];
      case "Dinas Kominfo":
        return [
          "Admin Integrasi Sistem",
          "Operator Broadcast Alert",
          "Pengelola API & Data",
          "Monitoring Infrastruktur Digital",
          "Viewer Teknis",
        ];
      case "Tim Reaksi Cepat / Petugas Lapangan":
        return [
          "Petugas Lapangan",
          "Koordinator Lapangan",
          "Surveyor Bencana",
          "Verifikator Laporan Warga",
          "Tim Evakuasi",
        ];
      default:
        return [];
    }
  };

  const roles = getRolesForCategory(currentCategory);

  const handleInstansiChange = (name: string) => {
    setInstansi(name);
    const cat = getCategoryForInstansi(name);
    
    // Set a sensible default role based on category
    if (cat === "BPBD Kota/Kabupaten") {
      setPeranAkses("Operator Command Center");
    } else if (cat === "BNPB Pusat") {
      setPeranAkses("Analis Risiko Nasional");
    } else if (cat === "BPBD Provinsi") {
      setPeranAkses("Analis Risiko Provinsi");
    } else if (cat === "Pemerintah Daerah") {
      setPeranAkses("Koordinator Program Pilot");
    } else if (cat === "Dinas Kominfo") {
      setPeranAkses("Operator Broadcast Alert");
    } else {
      setPeranAkses("Petugas Lapangan");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMockSession(peranAkses, instansi, currentCategory);
    router.push("/dashboard");
  };

  // Compile instansi choices
  const instansiOptions = pilotProject 
    ? [pilotProject.institution.name, ...genericInstansis.filter(g => g !== pilotProject.institution.name)]
    : genericInstansis;

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1F3A]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="geo-grid flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 contour-bg" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/NusaSiagaAI.png" alt="NusaSiaga AI Logo" width={64} height={64} className="object-contain -ml-2 -mr-1 mt-1" />
            <span className="font-display text-xl font-bold tracking-tight text-white">NusaSiaga AI</span>
          </Link>
          <div>
            <h2 className="text-display text-3xl font-extrabold tracking-tighter text-white">Climate Monitoring Indonesia</h2>
            <p className="mt-3 text-lg font-medium text-slate-400">Pusat komando kebencanaan nasional</p>
            <div className="mt-10 max-h-[500px] max-w-full overflow-hidden shadow-2xl">
              <DisasterDigitalTwinMap className="h-[450px]" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium tracking-tight text-slate-500">
            <span className="live-dot h-2 w-2 rounded-full bg-emerald-500" />
            SISTEM OPERASIONAL ·{" "}
            <span suppressHydrationWarning className="font-mono">{timestamp || "LIVE"}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-white/15">
            <CardHeader>
              <CardTitle>Masuk Dashboard</CardTitle>
              <p className="text-sm text-white/50">Prototype — tidak perlu kredensial nyata</p>
              
              {pilotProject && (
                <div className="mt-2 flex items-start gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-[11px] leading-relaxed text-emerald-300">
                  <Sparkles className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <p>Login prototype berdasarkan pengajuan pilot project terakhir (<strong>{pilotProject.implementationId}</strong>)</p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@bpbd.go.id"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    data-lpignore="true"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                    defaultValue="demo1234"
                    autoComplete="new-password"
                    data-lpignore="true"
                  />
                </div>
                <div>
                  <Label>Instansi</Label>
                  <Select value={instansi} onValueChange={handleInstansiChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {instansiOptions.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-[10px] text-white/40 leading-relaxed">
                    Instansi mengikuti konfigurasi pilot project yang telah diajukan.
                  </p>
                </div>
                <div>
                  <Label>Peran Akses</Label>
                  <Select value={peranAkses} onValueChange={setPeranAkses}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {roles.map((roleName) => (
                        <SelectItem key={roleName} value={roleName}>
                          {roleName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-[10px] text-white/40 leading-relaxed">
                    Peran menentukan tampilan dashboard dan fitur yang dapat diakses.
                  </p>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Masuk Dashboard
                </Button>
              </form>
              <p className="mt-4 text-center text-xs text-white/40">
                <Link href="/" className="hover:text-emerald-300">
                  ← Kembali ke Beranda
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
