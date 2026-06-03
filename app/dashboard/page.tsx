"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { AlertCenter } from "@/components/dashboard/AlertCenter";
import { SensorStatusPanel } from "@/components/dashboard/SensorStatusPanel";
import { CitizenFeed } from "@/components/dashboard/CitizenFeed";
import { RegionDetailPanel } from "@/components/dashboard/RegionDetailPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Region } from "@/lib/types";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import { cn } from "@/lib/utils";
import { 
  getMockRole, 
  getMockInstansiName, 
  getMockInstansiCategory 
} from "@/lib/auth-mock";
import { 
  Brain, 
  TrendingUp, 
  CloudRain, 
  Shield, 
  Cpu, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Clock, 
  Activity, 
  Signal, 
  AlertTriangle 
} from "lucide-react";

const RealtimeRiskMap = dynamic(
  () => import("@/components/maps/RealtimeRiskMap").then((mod) => mod.RealtimeRiskMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" /> }
);

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const { searchQuery } = useDashboard();
  const [activeStat, setActiveStat] = useState<string | undefined>();

  // Mock Session States
  const [instansiName, setInstansiName] = useState("BNPB Pusat");
  const [instansiCategory, setInstansiCategory] = useState("BNPB Pusat");
  const [roleAccess, setRoleAccess] = useState("Analis Risiko Nasional");
  const [pilotProject, setPilotProject] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInstansiName(getMockInstansiName());
      setInstansiCategory(getMockInstansiCategory());
      setRoleAccess(getMockRole());
      
      const stored = localStorage.getItem("nusasiaga-pilot-project");
      if (stored) {
        try {
          setPilotProject(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setPanelOpen(true);
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // Determine active city & province from onboarding or defaults
  const activeCity = pilotProject ? pilotProject.region.city : "Kota Semarang";
  const activeProvince = pilotProject ? pilotProject.region.province : "Jawa Tengah";
  const readinessScore = pilotProject ? pilotProject.aiRecommendation.readinessScore : 85;
  const activeRisks = pilotProject ? pilotProject.region.priorityRisks : ["Banjir", "Rob"];
  const activeModules = pilotProject ? pilotProject.selectedModules : [
    "Early Warning System",
    "GIS Risk Mapping",
    "Citizen Reporting",
    "IoT Sensor Integration"
  ];
  const implementationId = pilotProject ? pilotProject.implementationId : "NS-SEMARANG-2026-8F29X";

  const showMap = activeModules.some((m: string) => 
    m === "Real-Time Risk Monitoring" || 
    m === "Command Center Dashboard" || 
    m === "GIS Risk Mapping"
  );
  
  const showAlerts = activeModules.some((m: string) => 
    m === "Early Warning" || 
    m === "Evacuation Monitoring" || 
    m === "Early Warning System"
  );

  const showSensors = activeModules.some((m: string) => 
    m === "Sensor Integration" || 
    m === "IoT Sensor Integration"
  );

  const showCitizenReports = activeModules.some((m: string) => 
    m === "Citizen Reporting" || 
    m === "Citizen Feed"
  );

  // RENDER CONDITIONAL DASHBOARDS BASED ON INSTANSI CATEGORY OR ROLE
  // -------------------------------------------------------------

  // 1. FIELD OFFICER / TRC VIEW (Triggered by category or direct role)
  if (instansiCategory === "Tim Reaksi Cepat / Petugas Lapangan" || roleAccess === "Petugas Lapangan" || roleAccess === "Tim Reaksi Cepat") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-display text-3xl font-bold tracking-tight text-white">Portal Lapangan Taktis — NusaSiaga AI</h1>
          <p className="mt-1 text-sm text-slate-400">
            Kanal Lapangan Taktis · Petugas Lapangan & Tim Reaksi Cepat (TRC)
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-400">Status Petugas</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white glow-text-cyan">ON-DUTY</p>
                <p className="text-xs text-slate-500 mt-1">Wilayah Patroli: {activeCity}</p>
              </div>
              <div className="rounded-full bg-cyan-500/10 p-3 text-cyan-400">
                <Navigation className="h-6 w-6 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-400">Tugas Aktif</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">2 Tugas Utama</p>
                <p className="text-xs text-red-400 mt-1">1 Prioritas Kritis</p>
              </div>
              <div className="rounded-full bg-red-500/10 p-3 text-red-400">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-400">Verifikasi Laporan</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">4 Menunggu</p>
                <p className="text-xs text-slate-500 mt-1">Crowdsourced Laporan Warga</p>
              </div>
              <div className="rounded-full bg-yellow-500/10 p-3 text-yellow-400">
                <Activity className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Tasks list */}
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Instruksi & Tugas Lapangan Aktif</CardTitle>
              <CardDescription>Daftar tugas evakuasi dan inspeksi tanggul bencana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="awas">KRITIS</Badge>
                    <span className="text-xs text-slate-400 font-mono">ID: TASK-921</span>
                  </div>
                  <h4 className="mt-1 font-bold text-white text-sm">Evakuasi Warga Terjebak Genangan</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    RW 03, Pesisir {activeCity}. Air pasang rob terpantau naik 60 cm dalam 30 menit. Siapkan perahu karet.
                  </p>
                </div>
                <Button size="sm" className="shrink-0 bg-red-500 hover:bg-red-650 text-white">Mulai Tugas</Button>
              </div>

              <div className="rounded-xl border border-orange-500/25 bg-orange-500/5 p-4 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="siaga">TINGGI</Badge>
                    <span className="text-xs text-slate-400 font-mono">ID: TASK-904</span>
                  </div>
                  <h4 className="mt-1 font-bold text-white text-sm">Inspeksi Kesehatan Tanggul Air</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Pintu air utama {activeCity}. Laporkan keretakan struktur beton pasca debit air puncak.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">Mulai Tugas</Button>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex justify-between items-start gap-4 opacity-60">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">SELESAI</Badge>
                    <span className="text-xs text-slate-500 font-mono">ID: TASK-882</span>
                  </div>
                  <h4 className="mt-1 font-bold text-white text-sm">Distribusi Logistik Tenda Pengungsian</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Posko darurat Kelurahan Bongsari. Logistik makanan instan dan selimut telah diterima koordinator.
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              </div>
            </CardContent>
          </Card>

          <CitizenFeed filterRegionId={pilotProject?.region?.id} />
        </div>
      </div>
    );
  }

  // 2. DINAS KOMINFO (Data integration, Broadcast Alert, Status API)
  if (instansiCategory === "Dinas Kominfo") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-display text-3xl font-bold tracking-tight text-white">Digital Infrastructure Command Center — Dinas Kominfo</h1>
          <p className="mt-1 text-sm text-slate-400">
            Portal Integrasi Data · Broadcast Alert & Infrastruktur Kebencanaan Digital
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* API Connections card */}
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Status Integrasi API Kebencanaan</CardTitle>
              <CardDescription>Monitoring latensi koneksi data instansi BMKG, BNPB, dan Satelit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "BMKG Weather API", desc: "Prakiraan curah hujan & awan", latency: "12ms", ok: true },
                  { name: "BNPB Inarisk API", desc: "Katalog peta kerentanan wilayah", latency: "18ms", ok: true },
                  { name: "Satelit Himawari-9 Feed", desc: "Citra awan thermal infrared", latency: "320ms", ok: true },
                  { name: "Sensor IoT Sungai", desc: "Telemeter tinggi muka air real-time", latency: "8ms", ok: true },
                ].map((api) => (
                  <div key={api.name} className="rounded-xl border border-white/10 bg-white/5 p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-white">{api.name}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{api.desc}</p>
                      <span className="inline-block mt-2 text-[10px] font-mono text-slate-500">Latency: {api.latency}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Signal className="h-5 w-5 text-emerald-400" />
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">Connected</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-sm font-bold text-white mb-2">Performance Network Uptime</h4>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[99.98%]" />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
                  <span>Target: 99.9%</span>
                  <span className="text-emerald-400 font-bold">Uptime Aktual: 99.98%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Broadcast alert channels */}
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Kanal Diseminasi Publik</CardTitle>
              <CardDescription>Gateway notifikasi massal masyarakat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "WhatsApp Gateway", desc: "1,420 alert terkirim hari ini", status: "AKTIF", color: "bg-emerald-500/15 text-emerald-400" },
                  { name: "SMS Mass Broadcast", desc: "12,850 SMS terkirim", status: "AKTIF", color: "bg-emerald-500/15 text-emerald-400" },
                  { name: "Sirene Kebencanaan", desc: "4 stasiun terhubung di pesisir", status: "SIAGA", color: "bg-amber-500/15 text-amber-400" },
                  { name: "Telegram Bot Alert", desc: "Integrasi API aktif", status: "OFFLINE", color: "bg-slate-500/15 text-slate-400" },
                ].map((ch) => (
                  <div key={ch.name} className="flex justify-between items-center p-2 rounded-lg border border-white/5 bg-black/10">
                    <div>
                      <p className="text-xs font-semibold text-white">{ch.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{ch.desc}</p>
                    </div>
                    <Badge className={ch.color}>{ch.status}</Badge>
                  </div>
                ))}
              </div>

              <Button className="w-full gap-2 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white">
                <Send className="h-4 w-4" />
                Kirim Broadcast Uji Coba
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 3. PEMERINTAH DAERAH (Executive summary, Readiness dashboard)
  if (instansiCategory === "Pemerintah Daerah") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-display text-3xl font-bold tracking-tight text-white">Executive Briefing — Pemerintah Daerah</h1>
          <p className="mt-1 text-sm text-slate-400">
            Ringkasan Eksekutif & Pengawasan Program Pilot Project Kebencanaan Daerah
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-emerald-500/20 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400">Deployment Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-400">{readinessScore}%</p>
              <p className="text-[10px] text-slate-500 mt-1">Kesiapan Infrastruktur Wilayah</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400">Cakupan Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">12 Kecamatan</p>
              <p className="text-[10px] text-slate-500 mt-1">Area Prioritas Onboarding</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400">Estimasi Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">8–12 Minggu</p>
              <p className="text-[10px] text-slate-500 mt-1">Fase Instalasi & Penyesuaian</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate-400">Kode Pengajuan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-mono font-bold text-emerald-300 truncate mt-1">{implementationId}</p>
              <p className="text-[10px] text-slate-500">ID Registrasi Onboarding</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* AI Policy Recommendations */}
          <Card className="border-emerald-500/20 bg-emerald-950/10 backdrop-blur-xl lg:col-span-2">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <Brain className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-lg font-bold text-white">Rekomendasi Kebijakan (AI Recommendation)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-slate-300 leading-relaxed space-y-3">
                <p>
                  Model risiko hidrologi menunjukkan kecenderungan peningkatan kerentanan pesisir utara **{activeCity}** sebesar **18%** akibat kombinasi curah hujan tinggi berkelanjutan dan kenaikan pasang air laut.
                </p>
                <div className="border-t border-emerald-500/20 pt-3">
                  <span className="font-bold text-emerald-400">Kebijakan Strategis Pemerintah Daerah:</span>
                  <ul className="list-disc list-inside mt-2 space-y-2 text-slate-400">
                    <li>**Pilar Infrastruktur**: Percepat pengerukan sedimen Kali Tenggang dan optimalkan stasiun pompa polder pesisir.</li>
                    <li>**Pilar Anggaran**: Alokasikan APBD untuk penambahan 15 node sensor tinggi air (radar telemeter) pada aliran sungai kritis.</li>
                    <li>**Pilar Sosial**: Perkuat integrasi broadcast EWS via Whatsapp kelurahan untuk 12 kecamatan rawan rob.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Timeline Summary */}
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Timeline Implementasi</CardTitle>
              <CardDescription>Rencana integrasi sistem NusaSiaga AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 font-sans">
              {[
                { title: "Instalasi Sensor & Telemetri", status: "SELESAI", desc: "Pemasangan sensor air otomatis", color: "text-emerald-400 border-emerald-500/30" },
                { title: "Koneksi API Satelit & BMKG", status: "SELESAI", desc: "Sinkronisasi data radar cuaca", color: "text-emerald-400 border-emerald-500/30" },
                { title: "Uji Model AI & Dashboard", status: "SEDANG BERJALAN", desc: "Fase kalibrasi prediksi lokal", color: "text-cyan-400 border-cyan-500/30 font-bold" },
                { title: "Pelatihan Operator & SOP", status: "BELUM MULAI", desc: "Diseminasi warning & mitigasi", color: "text-slate-500 border-white/10" },
              ].map((step, idx) => (
                <div key={idx} className={`p-3 rounded-lg border bg-black/10 flex justify-between items-center ${step.color}`}>
                  <div>
                    <p className="text-xs font-semibold text-white">{step.title}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider">{step.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 4. BPBD PROVINSI (Regional monitoring, perbandingan kabupaten/kota)
  if (instansiCategory === "BPBD Provinsi") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-display text-3xl font-bold tracking-tight text-white">Command Center BPBD Provinsi {activeProvince}</h1>
          <p className="mt-1 text-sm text-slate-400">
            Sistem Monitoring Kebencanaan Regional · Koordinasi Wilayah Kabupaten/Kota
          </p>
        </div>

        <AnalyticsCards />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Peta Risiko Provinsi {activeProvince}</CardTitle>
              <CardDescription>Peta interaktif ancaman kebencanaan regional</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px]">
              <RealtimeRiskMap
                className="h-full w-full"
                selectedId={selectedRegion?.id}
                onRegionSelect={handleRegionSelect}
                filterRegionId={pilotProject?.region?.id}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Risk comparison table for cities */}
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white">Perbandingan Indeks Risiko Kota/Kab</CardTitle>
                <CardDescription>Wilayah pantauan prioritas</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/15 text-xs">
                  {[
                    { name: "Semarang", risk: 65, level: "Tinggi", color: "text-orange-400" },
                    { name: "Surakarta", risk: 42, level: "Sedang", color: "text-yellow-400" },
                    { name: "Banyumas", risk: 58, level: "Tinggi", color: "text-orange-400" },
                    { name: "Cilacap", risk: 74, level: "Tinggi", color: "text-orange-400" },
                    { name: "Pekalongan", risk: 87, level: "Kritis", color: "text-red-400" },
                  ].map((city) => (
                    <div key={city.name} className="flex justify-between items-center px-4 py-3 hover:bg-white/5 transition-colors">
                      <span className="font-semibold text-white">{city.name}</span>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${city.color}`}>{city.risk}%</span>
                        <Badge variant="outline" className="text-[10px]">{city.level}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Coordination logs */}
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white">Log Koordinasi Wilayah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="border-l border-emerald-500/50 pl-3">
                  <p className="text-[10px] text-slate-500">Hari ini · 14:30</p>
                  <p className="text-white font-medium">Instruksi Siaga Banjir Rob</p>
                  <p className="text-slate-400 mt-0.5">Notifikasi dikirim ke posko BPBD Kota Semarang.</p>
                </div>
                <div className="border-l border-slate-500/30 pl-3">
                  <p className="text-[10px] text-slate-500">Hari ini · 11:15</p>
                  <p className="text-white font-medium">Integrasi Sensor Bendungan</p>
                  <p className="text-slate-400 mt-0.5">Uji sinkronisasi sensor air Gajah Mungkur sukses.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RegionDetailPanel
          region={selectedRegion}
          open={panelOpen}
          onOpenChange={setPanelOpen}
        />
      </div>
    );
  }

  // 5. BNPB PUSAT / NATIONAL (Multi-province oversight, prioritization)
  if (instansiCategory === "BNPB Pusat") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-display text-3xl font-bold tracking-tight text-white">National Disaster Intelligence Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Pusat Komando & Pengawasan Kebencanaan Nasional BNPB
          </p>
        </div>

        <AnalyticsCards />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Peta Sebaran Risiko Nasional</CardTitle>
              <CardDescription>Monitoring real-time multi-provinsi berdasarkan Citra Satelit & sensor IoT</CardDescription>
            </CardHeader>
            <CardContent className="h-[450px]">
              <RealtimeRiskMap
                className="h-full w-full"
                selectedId={selectedRegion?.id}
                onRegionSelect={handleRegionSelect}
                filterRegionId={pilotProject?.region?.id}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Risk Ranking list of regions */}
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white">Ranking Wilayah Prioritas Nasional</CardTitle>
                <CardDescription>Berdasarkan indeks risiko gabungan</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/15 text-xs">
                  {[
                    { rank: 1, name: "Jakarta", prov: "DKI Jakarta", score: 87, level: "Kritis", color: "text-red-400" },
                    { rank: 2, name: "Bandung", prov: "Jawa Barat", score: 72, level: "Tinggi", color: "text-orange-400" },
                    { rank: 3, name: "Semarang", prov: "Jawa Tengah", score: 65, level: "Tinggi", color: "text-orange-400" },
                    { rank: 4, name: "Pontianak", prov: "Kalimantan Barat", score: 58, level: "Sedang", color: "text-yellow-400" },
                    { rank: 5, name: "Makassar", prov: "Sulawesi Selatan", score: 51, level: "Sedang", color: "text-yellow-400" },
                  ].map((reg) => (
                    <div key={reg.name} className="flex justify-between items-center px-4 py-3 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-slate-500 font-bold">{reg.rank}</span>
                        <div>
                          <p className="font-semibold text-white">{reg.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{reg.prov}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${reg.color}`}>{reg.score}%</span>
                        <Badge variant="outline" className="text-[10px]">{reg.level}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active pilot projects status */}
            <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base font-bold text-white">Status Pilot Project Daerah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-normal">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-300">{activeCity}</span>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]">{readinessScore}% Ready</Badge>
                  </div>
                  <p className="text-slate-400 text-[10px] mt-1 font-mono">ID: {implementationId}</p>
                  <p className="text-slate-300 text-[10px] mt-1.5">Risiko: {activeRisks.join(", ")}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-normal opacity-60">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Kabupaten Bogor</span>
                    <Badge variant="outline" className="text-[9px]">48% Ready</Badge>
                  </div>
                  <p className="text-slate-500 text-[10px] mt-1 font-mono">ID: NSP-2026-47209</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RegionDetailPanel
          region={selectedRegion}
          open={panelOpen}
          onOpenChange={setPanelOpen}
        />
      </div>
    );
  }

  // 6. DEFAULT / LOCAL COMMAND CENTER VIEW (BPBD Kota/Kabupaten)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl font-bold tracking-tight text-white">
          Command Center BPBD {instansiName}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Pilot Project NusaSiaga AI — {activeCity} · {activeProvince}
        </p>
      </div>

      {/* Onboarding configuration summary banner */}
      {pilotProject && (
        <Card className="border-emerald-500/30 bg-emerald-950/15 backdrop-blur-xl">
          <CardContent className="py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
              <p className="text-slate-400">
                <strong className="text-emerald-300">Modul Pilot Aktif:</strong> {activeModules.join(" · ")}
              </p>
              <p className="text-slate-400">
                <strong className="text-emerald-300">Fokus Risiko:</strong> {activeRisks.join(" & ")}
              </p>
            </div>
            <Badge variant="default" className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono">
              Ready Score: {readinessScore}%
            </Badge>
          </CardContent>
        </Card>
      )}

      <AnalyticsCards
        activeId={activeStat}
        onCardClick={(id) => {
          setActiveStat(id);
          document.getElementById("risk-map")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {(showMap || showAlerts) && (
        <div className="grid gap-6 lg:grid-cols-3">
          {showMap && (
            <div id="risk-map" className={cn("min-h-[500px]", showAlerts ? "lg:col-span-2" : "lg:col-span-3")}>
              <RealtimeRiskMap
                className="h-full w-full"
                selectedId={selectedRegion?.id}
                onRegionSelect={handleRegionSelect}
                variant="default"
                filterRegionId={pilotProject?.region?.id}
              />
            </div>
          )}
          {showAlerts && (
            <div className={cn(showMap ? "" : "lg:col-span-3")}>
              <AlertCenter filterRegionId={pilotProject?.region?.id} />
            </div>
          )}
        </div>
      )}

      {(showSensors || showCitizenReports) && (
        <div className={cn("grid gap-6", (showSensors && showCitizenReports) ? "lg:grid-cols-2" : "lg:grid-cols-1")}>
          {showSensors && <SensorStatusPanel filterRegionId={pilotProject?.region?.id} />}
          {showCitizenReports && <CitizenFeed filterRegionId={pilotProject?.region?.id} />}
        </div>
      )}

      <RegionDetailPanel
        region={selectedRegion}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </div>
  );
}
