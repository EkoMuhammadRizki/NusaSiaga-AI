"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
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
import type { CitizenReport, ReportUrgency, ValidationStatus } from "@/lib/types";
import Swal from "sweetalert2";

// Premium dark themed SweetAlert template matching NusaSiaga's style
const darkSwal = Swal.mixin({
  background: "#0F172A",
  color: "#F8FAFC",
  confirmButtonColor: "#10B981",
  cancelButtonColor: "#EF4444",
  customClass: {
    popup: "border border-slate-800 rounded-2xl shadow-2xl font-sans",
    title: "text-lg font-bold text-white",
    htmlContainer: "text-sm text-slate-300",
  },
});

// Dynamic import of interactive Leaflet Map
const ReportLeafletMap = dynamic(
  () => import("@/components/maps/ReportLeafletMap").then((mod) => mod.ReportLeafletMap),
  { ssr: false, loading: () => <div className="h-[450px] w-full bg-slate-900/50 animate-pulse rounded-2xl border border-slate-800" /> }
);

interface ReportFormProps {
  onSubmit: (report: CitizenReport) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [category, setCategory] = useState("Banjir");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState<ReportUrgency>("sedang");
  const [waterHeight, setWaterHeight] = useState("30");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedCoords({ lat, lng });
    setLocation(`Koordinat: [${lat.toFixed(4)}, ${lng.toFixed(4)}]`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    darkSwal.fire({
      title: "Kirim Laporan Bencana?",
      text: `Anda akan melaporkan bencana ${category} di lokasi: ${location || "Lokasi tidak disebutkan"}. Apakah data sudah benar?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim",
      cancelButtonText: "Batal",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const report: CitizenReport = {
          id: `rpt-${Date.now()}`,
          author: "Anda",
          location: location || "Lokasi tidak disebutkan",
          regionId: "jakarta",
          category,
          waterHeight: Number(waterHeight) || 0,
          roadAccess: "Belum diketahui",
          urgency,
          timestamp: new Date().toISOString(),
          imageUrl:
            preview ||
            "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
          validationStatus: "Menunggu Validasi" as ValidationStatus,
        };
        onSubmit(report);
        
        darkSwal.fire({
          title: "Laporan Terkirim!",
          text: "Laporan Anda telah berhasil masuk ke sistem antrean validasi BPBD.",
          icon: "success",
          confirmButtonText: "Selesai"
        });

        setLocation("");
        setPreview(null);
        setSelectedCoords(null);
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Kirim Laporan Warga</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Foto Kejadian</Label>
              <Input type="file" accept="image/*" className="mt-1" onChange={handleFile} />
              {preview && (
                <div className="relative mt-2 h-32 w-full overflow-hidden rounded-xl">
                  <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
            <div>
              <Label>Kategori</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Banjir", "Longsor", "Banjir Rob", "Genangan", "Cuaca Ekstrem"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Lokasi</Label>
              <Input
                className="mt-1"
                placeholder="Contoh: RW 05, Kel. Rawamangun (atau klik pada peta)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label>Tinggi Air (cm)</Label>
              <Input
                type="number"
                className="mt-1"
                value={waterHeight}
                onChange={(e) => setWaterHeight(e.target.value)}
              />
            </div>
            <div>
              <Label>Urgensi</Label>
              <Select value={urgency} onValueChange={(v) => setUrgency(v as ReportUrgency)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["rendah", "sedang", "tinggi", "darurat"] as const).map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Kirim Laporan
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Preview Peta</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
          <ReportLeafletMap 
            onMapClick={handleMapClick} 
            selectedCoords={selectedCoords} 
            className="flex-1 min-h-[350px]"
          />
          {/* Aligned Legenda */}
          <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Legenda Urgensi</span>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#ef4444]"></span>
                <span className="text-slate-400 font-medium">Kritis / Tinggi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]"></span>
                <span className="text-slate-400 font-medium">Sedang</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
                <span className="text-slate-400 font-medium">Rendah</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
