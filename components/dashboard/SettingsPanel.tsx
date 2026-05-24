"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Bell,
  Monitor,
  Shield,
  Server,
  LogOut,
  Mail,
  Globe,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clearMockSession, getMockRole, setMockSession } from "@/lib/auth-mock";
import Swal from "sweetalert2";

// Premium dark themed SweetAlert template matching NusaSiaga AI's style
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

function SettingToggle({
  id,
  label,
  description,
  defaultChecked = true,
}: {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 p-4 hover:bg-white/5"
    >
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs text-white/50">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 shrink-0 rounded accent-emerald-500"
      />
    </label>
  );
}

export function SettingsPanel() {
  const router = useRouter();
  const [role, setRole] = useState("Analis");
  const [email, setEmail] = useState("demo@nusasiaga.ai");

  useEffect(() => {
    setRole(getMockRole());
  }, []);

  const handleLogout = () => {
    darkSwal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar dari Sesi Command Center?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        clearMockSession();
        router.push("/");
      }
    });
  };

  return (
    <Tabs defaultValue="profil" className="w-full">
      <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-white/5 p-1">
        <TabsTrigger value="profil" className="gap-2">
          <User className="h-4 w-4" />
          Profil
        </TabsTrigger>
        <TabsTrigger value="notifikasi" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifikasi
        </TabsTrigger>
        <TabsTrigger value="tampilan" className="gap-2">
          <Monitor className="h-4 w-4" />
          Tampilan
        </TabsTrigger>
        <TabsTrigger value="keamanan" className="gap-2">
          <Shield className="h-4 w-4" />
          Keamanan
        </TabsTrigger>
        <TabsTrigger value="sistem" className="gap-2">
          <Server className="h-4 w-4" />
          Sistem
        </TabsTrigger>
        <TabsTrigger value="akun" className="gap-2">
          <LogOut className="h-4 w-4" />
          Akun
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profil">
        <Card>
          <CardHeader>
            <CardTitle>Profil Pengguna</CardTitle>
            <CardDescription>Informasi akun command center (simulasi)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="settings-name">Nama Lengkap</Label>
                <Input id="settings-name" className="mt-1" defaultValue="Petugas NusaSiaga" />
              </div>
              <div>
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Peran / Instansi</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1 max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["BNPB", "BPBD", "Pemerintah Daerah", "Analis", "Petugas Lapangan"].map(
                    (r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-white/40">
                Peran menentukan tampilan badge di topbar dashboard.
              </p>
            </div>
            <Button variant="secondary" onClick={() => {
              setMockSession(role);
              darkSwal.fire({
                title: "Profil Diperbarui!",
                text: `Peran Anda telah berhasil diatur sebagai ${role}.`,
                icon: "success",
                confirmButtonText: "Selesai"
              }).then(() => {
                if (typeof window !== "undefined") window.location.reload();
              });
            }}>
              Simpan Profil
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifikasi">
        <Card>
          <CardHeader>
            <CardTitle>Notifikasi & Alert</CardTitle>
            <CardDescription>Atur saluran peringatan dini yang diterima</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingToggle
              id="notif-push"
              label="Push Notification"
              description="Alert real-time di dashboard command center"
            />
            <SettingToggle
              id="notif-sms"
              label="SMS Darurat"
              description="Peringatan SIAGA dan AWAS via SMS"
            />
            <SettingToggle
              id="notif-wa"
              label="WhatsApp Broadcast"
              description="Distribusi alert ke grup koordinasi BPBD"
              defaultChecked={false}
            />
            <SettingToggle
              id="notif-email"
              label="Email Laporan"
              description="Ringkasan harian risiko wilayah"
            />
            <SettingToggle
              id="notif-sirine"
              label="Integrasi Sirine"
              description="Trigger otomatis saat status AWAS (simulasi)"
              defaultChecked={false}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tampilan">
        <Card>
          <CardHeader>
            <CardTitle>Tampilan Dashboard</CardTitle>
            <CardDescription>Preferensi antarmuka command center</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tema</Label>
              <Select defaultValue="dark">
                <SelectTrigger className="mt-1 max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark — Command Center</SelectItem>
                  <SelectItem value="auto" disabled>
                    Auto (segera)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Bahasa
              </Label>
              <Select defaultValue="id">
                <SelectTrigger className="mt-1 max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Interval refresh peta
              </Label>
              <Select defaultValue="30">
                <SelectTrigger className="mt-1 max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 detik</SelectItem>
                  <SelectItem value="30">30 detik</SelectItem>
                  <SelectItem value="60">1 menit</SelectItem>
                  <SelectItem value="300">5 menit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SettingToggle
              id="ui-compact"
              label="Mode ringkas"
              description="Kurangi padding kartu analytics"
              defaultChecked={false}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="keamanan">
        <Card>
          <CardHeader>
            <CardTitle>Keamanan Akun</CardTitle>
            <CardDescription>Prototype — tidak terhubung ke server auth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-pw">Kata Sandi Saat Ini</Label>
              <Input id="current-pw" type="password" className="mt-1 max-w-md" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="new-pw">Kata Sandi Baru</Label>
              <Input id="new-pw" type="password" className="mt-1 max-w-md" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="confirm-pw">Konfirmasi Kata Sandi</Label>
              <Input
                id="confirm-pw"
                type="password"
                className="mt-1 max-w-md"
                placeholder="••••••••"
              />
            </div>
            <Button variant="secondary">Perbarui Kata Sandi</Button>
            <Separator />
            <SettingToggle
              id="sec-2fa"
              label="Autentikasi dua faktor (2FA)"
              description="Rekomendasi untuk akun BNPB/BPBD"
              defaultChecked={false}
            />
            <SettingToggle
              id="sec-session"
              label="Ingat sesi di perangkat ini"
              description="Tetap masuk hingga logout manual"
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sistem">
        <Card>
          <CardHeader>
            <CardTitle>Sistem & Integrasi</CardTitle>
            <CardDescription>Konfigurasi operasional platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingToggle
              id="sys-live"
              label="Mode Live Monitoring"
              description="Sinkronisasi data BMKG & sensor IoT"
            />
            <SettingToggle
              id="sys-ai"
              label="AI Risk Prediction"
              description="Jalankan model prediksi otomatis"
            />
            <SettingToggle
              id="sys-twin"
              label="Digital Twin Simulation"
              description="Aktifkan kalkulasi dampak banjir"
            />
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
              <p className="flex items-center gap-2 font-medium text-white">
                <Mail className="h-4 w-4 text-emerald-400" />
                Versi platform
              </p>
              <p className="mt-2">NusaSiaga AI Prototype v1.0.0</p>
              <p className="mt-1 text-xs">Build demonstrasi · Tanpa backend</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="akun">
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle>Kelola Akun</CardTitle>
            <CardDescription>Keluar dari dashboard command center</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">
                Anda masuk sebagai <span className="font-semibold text-emerald-300">{role}</span>
                . Logout akan mengakhiri sesi simulasi dan mengarahkan ke halaman beranda.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => router.push("/")}>
                Kembali ke Beranda
              </Button>
              <Button
                variant="danger"
                className="gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <Separator />

            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-sm font-medium text-red-300">Zona berbahaya</p>
              <p className="mt-1 text-xs text-white/50">
                Reset preferensi lokal (simulasi) — tidak menghapus data server.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-red-500/30 text-red-300 hover:bg-red-500/10"
                onClick={() => {
                  darkSwal.fire({
                    title: "Reset Preferensi?",
                    text: "Apakah Anda yakin ingin meriset preferensi lokal? Sesi simulasi Anda akan diatur ulang.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Reset",
                    cancelButtonText: "Batal",
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      clearMockSession();
                      if (typeof window !== "undefined") window.location.reload();
                    }
                  });
                }}
              >
                Reset Preferensi Lokal
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
