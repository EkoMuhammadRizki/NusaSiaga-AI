"use client";

import { SettingsPanel } from "@/components/dashboard/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pengaturan</h1>
        <p className="text-sm text-white/50">
          Kelola profil, notifikasi, tampilan, keamanan, dan sesi akun command center
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
}
