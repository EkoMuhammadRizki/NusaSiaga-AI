"use client";

import { AlertManagementTable } from "@/components/dashboard/AlertManagementTable";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manajemen Alert</h1>
        <p className="text-sm text-white/50">
          Setujui, edit, dan distribusikan peringatan dini ke saluran multi-channel
        </p>
      </div>
      <AlertManagementTable />
    </div>
  );
}
