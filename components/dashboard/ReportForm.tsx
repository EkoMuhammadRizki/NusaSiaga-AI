"use client";

import { useState } from "react";
import Image from "next/image";
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
import { IndonesiaMapSVG } from "@/components/maps/IndonesiaMapSVG";
import type { CitizenReport, ReportUrgency, ValidationStatus } from "@/lib/types";

interface ReportFormProps {
  onSubmit: (report: CitizenReport) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [category, setCategory] = useState("Banjir");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState<ReportUrgency>("sedang");
  const [waterHeight, setWaterHeight] = useState("30");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setLocation("");
    setPreview(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Kirim Laporan Warga</CardTitle>
        </CardHeader>
        <CardContent>
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
                placeholder="Contoh: RW 05, Kel. Rawamangun"
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

      <Card>
        <CardHeader>
          <CardTitle>Preview Peta</CardTitle>
        </CardHeader>
        <CardContent>
          <IndonesiaMapSVG variant="compact" showRadar={false} className="min-h-[240px]" />
        </CardContent>
      </Card>
    </div>
  );
}
