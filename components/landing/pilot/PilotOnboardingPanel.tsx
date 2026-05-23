"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Shield,
  Radar,
  Satellite,
  Map,
  Building2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Download,
  Loader2,
  X,
} from "lucide-react";
import { usePilotOnboarding, generateImplementationId } from "./PilotOnboardingContext";
import {
  instansiTypes,
  riskOptions,
  pilotModules,
  provinces,
} from "./types";
import { buildPilotSummary } from "./buildPilotSummary";
import { regions } from "@/lib/data/regions";
import { IndonesiaMapSVG } from "@/components/maps/IndonesiaMapSVG";
import { RiskGauge } from "@/components/charts/RiskGauge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatTimestamp } from "@/lib/utils";
import type { Region } from "@/lib/types";

const STEPS = [
  "Informasi Instansi",
  "Wilayah Pilot",
  "Kebutuhan Sistem",
  "Review Implementasi",
];

const LOADING_MESSAGES = [
  "Analyzing regional disaster profile...",
  "Checking infrastructure readiness...",
  "Generating deployment recommendation...",
  "Preparing pilot implementation summary...",
];

function getValidationHint(step: number, form: import("./types").PilotFormData): string | null {
  if (step === 1) {
    const missing: string[] = [];
    if (!form.instansiName.trim()) missing.push("Nama Instansi");
    if (!form.instansiType) missing.push("Jenis Instansi");
    if (!form.picName.trim()) missing.push("Nama PIC");
    if (!form.email.trim()) missing.push("Email");
    return missing.length ? `Lengkapi: ${missing.join(", ")}` : null;
  }
  if (step === 2) {
    const missing: string[] = [];
    if (!form.province) missing.push("Provinsi");
    if (!form.city.trim()) missing.push("Kabupaten/Kota");
    if (!form.kecamatanCount.trim()) missing.push("Jumlah Kecamatan");
    return missing.length ? `Lengkapi: ${missing.join(", ")}` : null;
  }
  if (step === 3 && form.modules.length === 0) {
    return "Pilih minimal 1 modul sistem";
  }
  return null;
}

function PanelChrome({
  step,
  maxStep,
  onStepClick,
}: {
  step: number;
  maxStep: number;
  onStepClick: (n: number) => void;
}) {
  return (
    <header className="shrink-0 border-b border-emerald-500/15 px-5 pb-4 pt-14">
      <Badge
        variant="default"
        className="mb-3 border-cyan-500/30 bg-cyan-500/10 text-[10px] text-cyan-200"
      >
        Regional Deployment Program
      </Badge>
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 gap-1.5">
          {[Shield, Radar, Satellite, Map].map((Icon, i) => (
            <div
              key={i}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5"
            >
              <Icon className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="pilot-panel-title" className="text-lg font-bold leading-tight text-white">
            Ajukan Pilot Project
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            Implementasi sistem prediksi risiko untuk wilayah prioritas Anda.
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-1.5">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const reachable = stepNum <= maxStep;
          const active = stepNum === step;
          return (
            <button
              key={label}
              type="button"
              title={label}
              disabled={!reachable}
              onClick={() => reachable && onStepClick(stepNum)}
              className={cn(
                "h-1.5 min-w-0 flex-1 rounded-full transition-all duration-300",
                active && "ring-1 ring-emerald-400/50",
                stepNum <= step
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                  : "bg-white/10",
                reachable && !active && "cursor-pointer hover:opacity-80",
                !reachable && "cursor-not-allowed opacity-40"
              )}
              aria-label={`Langkah ${stepNum}: ${label}`}
            />
          );
        })}
      </div>
      <p className="mt-2 truncate text-xs font-medium text-emerald-300/90">
        Langkah {step}/{STEPS.length}: {STEPS[step - 1]}
      </p>
    </header>
  );
}

function fillDemoForm(): import("./types").PilotFormData {
  const region = regions.find((r) => r.id === "semarang")!;
  return {
    instansiName: "BPBD Kota Semarang",
    instansiType: "BPBD",
    picName: "Dr. Ahmad Wijaya",
    email: "pic@bpbd-semarang.go.id",
    phone: "081234567890",
    province: region.province,
    city: region.name,
    kecamatanCount: "12",
    riskLevel: region.riskLevel,
    risks: ["Banjir", "Rob"],
    modules: [
      "Early Warning",
      "Real-Time Risk Monitoring",
      "Digital Twin Simulation",
      "Citizen Reporting",
      "Command Center Dashboard",
    ],
    selectedRegionId: region.id,
  };
}

export function PilotOnboardingPanel() {
  const {
    open,
    phase,
    step,
    form,
    implementationId,
    closePilot,
    setStep,
    setPhase,
    updateForm,
    resetFlow,
    setImplementationId,
  } = usePilotOnboarding();

  const [loadingMsg, setLoadingMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const [submittedAt, setSubmittedAt] = useState("");
  const [maxStep, setMaxStep] = useState(1);

  useEffect(() => {
    if (step > maxStep) setMaxStep(step);
  }, [step, maxStep]);

  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (open && !prevOpenRef.current) setMaxStep(1);
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (step === 2 && form.selectedRegionId && !form.province) {
      const region = regions.find((r) => r.id === form.selectedRegionId);
      if (region) {
        updateForm({
          province: region.province,
          city: region.name,
          riskLevel: region.riskLevel,
        });
      }
    }
  }, [step, form.selectedRegionId, form.province, updateForm]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (phase !== "processing") return;

    setLoadingMsg(0);
    setProgress(0);
    const msgInterval = setInterval(() => {
      setLoadingMsg((m) => (m + 1) % LOADING_MESSAGES.length);
    }, 650);

    const start = Date.now();
    const duration = 2800;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
    }, 50);

    const done = setTimeout(() => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      setImplementationId(generateImplementationId());
      setSubmittedAt(formatTimestamp());
      setPhase("success");
    }, duration);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(done);
    };
  }, [phase, setPhase, setImplementationId]);

  const handleRegionSelect = (region: Region) => {
    updateForm({
      selectedRegionId: region.id,
      city: region.name,
      province: region.province,
      riskLevel: region.riskLevel,
    });
  };

  const toggleRisk = (risk: string) => {
    const risks = form.risks.includes(risk)
      ? form.risks.filter((r) => r !== risk)
      : [...form.risks, risk];
    updateForm({ risks: risks.length ? risks : [risk] });
  };

  const toggleModule = (mod: string) => {
    const modules = form.modules.includes(mod)
      ? form.modules.filter((m) => m !== mod)
      : [...form.modules, mod];
    updateForm({ modules });
  };

  const canNext = () => {
    if (step === 1) {
      return (
        form.instansiName.trim() &&
        form.instansiType &&
        form.picName.trim() &&
        form.email.trim()
      );
    }
    if (step === 2) {
      return form.province && form.city.trim() && form.kecamatanCount.trim();
    }
    if (step === 3) {
      return form.modules.length > 0;
    }
    return true;
  };

  const validationHint = getValidationHint(step, form);

  const goNext = () => {
    if (!canNext()) return;
    setStep(step + 1);
  };

  const submitPilot = () => {
    setPhase("processing");
  };

  const summary = buildPilotSummary(form);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            onClick={closePilot}
            aria-hidden
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "fixed inset-y-0 right-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden",
              "border-l border-emerald-500/20 bg-[#0B1F3A] shadow-2xl shadow-emerald-500/10",
              "md:w-[min(440px,92vw)] lg:w-[min(480px,42vw)]"
            )}
            role="dialog"
            aria-modal
            aria-labelledby="pilot-panel-title"
          >
            <div className="pointer-events-none absolute inset-0 contour-bg opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-[#060f1c]/80" />

            <div className="relative flex min-h-0 flex-1 flex-col">
              <button
                type="button"
                onClick={closePilot}
                className="absolute right-3 top-3 z-20 rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>

              {phase === "form" && (
                <PanelChrome
                  step={step}
                  maxStep={maxStep}
                  onStepClick={(n) => setStep(n)}
                />
              )}
              {phase !== "form" && (
                <div className="shrink-0 border-b border-white/10 px-5 pb-3 pt-14">
                  <p className="text-lg font-bold text-white">
                    {phase === "processing" ? "Memproses Pengajuan" : "Selesai"}
                  </p>
                </div>
              )}

              <div className="scrollbar-hide min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-5 py-4">
                {phase === "form" && (
                  <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 max-w-full"
                  >
                    {step === 1 && (
                      <div className="space-y-3">
                        <div className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <Building2 className="h-5 w-5 shrink-0 text-emerald-400" />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-xs font-medium text-emerald-300">
                                Verifikasi Instansi Pemerintah
                              </p>
                              <Badge variant="outline" className="text-[10px]">
                                Enterprise
                              </Badge>
                            </div>
                            <p className="mt-1 text-[10px] leading-relaxed text-white/40">
                              Data untuk asesmen kesiapan deploy nasional
                            </p>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => updateForm(fillDemoForm())}
                        >
                          Isi contoh data (demo cepat)
                        </Button>

                        <div>
                          <Label>Nama Instansi</Label>
                          <Input
                            className="mt-1"
                            placeholder="BPBD Kota Semarang"
                            value={form.instansiName}
                            onChange={(e) => updateForm({ instansiName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Jenis Instansi</Label>
                          <Select
                            value={form.instansiType || undefined}
                            onValueChange={(v) => updateForm({ instansiType: v })}
                          >
                            <SelectTrigger className="mt-1 w-full">
                              <SelectValue placeholder="Pilih jenis instansi" />
                            </SelectTrigger>
                            <SelectContent>
                              {instansiTypes.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Nama PIC</Label>
                          <Input
                            className="mt-1"
                            placeholder="Nama penanggung jawab"
                            value={form.picName}
                            onChange={(e) => updateForm({ picName: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              className="mt-1"
                              placeholder="pic@bpbd.go.id"
                              value={form.email}
                              onChange={(e) => updateForm({ email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Nomor Kontak</Label>
                            <Input
                              className="mt-1"
                              placeholder="08xxxxxxxxxx"
                              value={form.phone}
                              onChange={(e) => updateForm({ phone: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label>Provinsi</Label>
                            <Select
                              value={form.province || undefined}
                              onValueChange={(v) => updateForm({ province: v })}
                            >
                              <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Pilih provinsi" />
                              </SelectTrigger>
                              <SelectContent>
                                {provinces.map((p) => (
                                  <SelectItem key={p} value={p}>
                                    {p}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Kabupaten / Kota</Label>
                            <Input
                              className="mt-1"
                              placeholder="Semarang"
                              value={form.city}
                              onChange={(e) => updateForm({ city: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label>Jumlah Kecamatan</Label>
                            <Input
                              type="number"
                              className="mt-1"
                              placeholder="12"
                              value={form.kecamatanCount}
                              onChange={(e) => updateForm({ kecamatanCount: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Tingkat Risiko Wilayah</Label>
                            <Select
                              value={form.riskLevel}
                              onValueChange={(v) => updateForm({ riskLevel: v })}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {["rendah", "sedang", "tinggi", "kritis"].map((r) => (
                                  <SelectItem key={r} value={r}>
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="mb-2 block">Jenis Risiko Prioritas</Label>
                          <div className="flex flex-wrap gap-2">
                            {riskOptions.map((risk) => (
                              <button
                                key={risk}
                                type="button"
                                onClick={() => toggleRisk(risk)}
                                className={cn(
                                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                                  form.risks.includes(risk)
                                    ? "border-orange-500/50 bg-orange-500/20 text-orange-200 glow-alert"
                                    : "border-white/15 text-white/50 hover:border-white/30"
                                )}
                              >
                                {risk}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-emerald-500/20 bg-black/20 p-2">
                          <p className="mb-2 text-xs text-white/50">
                            Pilih wilayah di peta
                          </p>
                          <div className="max-w-full overflow-hidden">
                            <IndonesiaMapSVG
                              variant="compact"
                              selectedId={form.selectedRegionId}
                              onRegionSelect={handleRegionSelect}
                              showLegend={false}
                              showRadar={false}
                              className="h-[160px] min-h-0"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-3">
                        <p className="text-sm text-white/50">
                          Pilih modul yang akan diimplementasikan pada fase pilot
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {pilotModules.map((mod) => {
                            const selected = form.modules.includes(mod);
                            return (
                              <button
                                key={mod}
                                type="button"
                                onClick={() => toggleModule(mod)}
                                className={cn(
                                  "rounded-xl border p-3 text-left text-sm transition-all",
                                  selected
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-100 glow-emerald"
                                    : "border-white/10 text-white/60 hover:border-emerald-500/30 hover:bg-white/5"
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  {selected && (
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                  )}
                                  {mod}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-cyan-400" />
                          <Badge variant="default" className="border-cyan-500/30 bg-cyan-500/10">
                            AI Recommendation
                          </Badge>
                        </div>

                        <div className="break-words rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                          <p>
                            <span className="text-white/40">Pilot Region:</span>
                            <br />
                            <span className="text-white">{summary.regionLabel}</span>
                          </p>
                          <p className="mt-3">
                            <span className="text-white/40">Primary Risk:</span>
                            <br />
                            {summary.riskCombo}
                          </p>
                          <p className="mt-3">
                            <span className="text-white/40">Estimated Coverage:</span>
                            <br />
                            {summary.kecamatan} Kecamatan
                          </p>
                          <p className="mt-3">
                            <span className="text-white/40">Recommended Modules:</span>
                          </p>
                          <ul className="mt-1 space-y-1">
                            {summary.modules.map((m) => (
                              <li key={m} className="text-emerald-300">
                                ✓ {m}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-3">
                            <span className="text-white/40">Deployment Readiness:</span>
                            <br />
                            <span className="text-xl font-bold text-emerald-400">
                              {summary.readiness}%
                            </span>
                          </p>
                        </div>

                        <div className="flex justify-center py-2">
                          <RiskGauge score={summary.readiness} size={120} />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl border border-white/10 p-3">
                            <p className="text-xs text-white/40">Timeline Deploy</p>
                            <p className="mt-1 font-semibold text-white">{summary.timeline}</p>
                          </div>
                          <div className="rounded-xl border border-white/10 p-3">
                            <p className="text-xs text-white/40">Instansi</p>
                            <p className="mt-1 font-semibold text-white">{summary.instansi}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {phase === "processing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-[50vh] flex-col items-center justify-center px-2 py-10 text-center"
                  >
                    <div className="relative mb-8 h-32 w-32">
                      <div className="radar-sweep absolute inset-0 rounded-full opacity-60" />
                      <div className="absolute inset-4 rounded-full border border-emerald-500/30" />
                      <Loader2 className="absolute inset-0 m-auto h-10 w-10 animate-spin text-emerald-400" />
                    </div>
                    <p className="loading-pulse text-sm font-medium text-emerald-300">
                      {LOADING_MESSAGES[loadingMsg]}
                    </p>
                    <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-8 flex gap-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="live-dot h-2 w-2 rounded-full bg-emerald-500"
                          style={{ animationDelay: `${i * 0.3}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-1 py-4 text-center"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 glow-emerald">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">
                      Pengajuan Pilot Berhasil
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">
                      Tim NusaSiaga AI akan menghubungi instansi Anda untuk asesmen wilayah dan
                      proses implementasi pilot project.
                    </p>

                    <div className="mt-6 space-y-2 rounded-xl border border-emerald-500/20 bg-white/5 p-4 text-left text-sm">
                      <p className="text-white/40">Implementation ID</p>
                      <p className="font-mono font-bold text-emerald-300">{implementationId}</p>
                      <p className="mt-2 text-white/40">Waktu pengajuan</p>
                      <p className="text-white">{submittedAt}</p>
                      <Badge variant="default" className="mt-2">
                        Regional Assessment — Terjadwal
                      </Badge>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                      <Button size="lg" className="w-full glow-emerald-hover" asChild>
                        <Link href="/login" onClick={closePilot}>
                          Lihat Dashboard
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full"
                        onClick={() => alert("Proposal pilot (simulasi) — file akan tersedia setelah asesmen.")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Proposal
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => {
                          resetFlow();
                          closePilot();
                        }}
                        asChild
                      >
                        <Link href="/">Kembali ke Beranda</Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {phase === "form" && (
                <footer className="relative z-10 shrink-0 border-t border-white/10 bg-[#0B1F3A]/95 px-5 py-4 backdrop-blur-xl">
                  {validationHint && (
                    <p className="mb-2 text-center text-xs text-orange-300/90">{validationHint}</p>
                  )}
                  {step < 4 ? (
                    <div className="flex gap-2">
                      {step > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(step - 1)}
                          className="shrink-0 gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Kembali
                        </Button>
                      )}
                      <Button
                        type="button"
                        onClick={goNext}
                        disabled={!canNext()}
                        className="min-w-0 flex-1 gap-1 glow-emerald-hover"
                      >
                        Lanjut
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        onClick={submitPilot}
                        className="w-full gap-2 glow-emerald-hover"
                      >
                        Ajukan Pilot
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(step - 1)}
                          className="gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Kembali
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() =>
                            alert("Demo dijadwalkan (simulasi). Tim akan menghubungi via email.")
                          }
                        >
                          Jadwalkan Demo
                        </Button>
                      </div>
                    </div>
                  )}
                </footer>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
