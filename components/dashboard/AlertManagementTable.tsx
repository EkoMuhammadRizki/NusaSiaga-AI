"use client";

import { useState } from "react";
import { alerts as initialAlerts } from "@/lib/data/alerts";
import type { Alert, AlertStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const statusVariant: Record<AlertStatus, "waspada" | "siaga" | "awas"> = {
  WASPADA: "waspada",
  SIAGA: "siaga",
  AWAS: "awas",
};

export function AlertManagementTable() {
  const [items, setItems] = useState<Alert[]>(initialAlerts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleApprove = (id: string, approved: boolean) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, approved } : a)));
  };

  const startEdit = (alert: Alert) => {
    setEditingId(alert.id);
    setEditText(alert.description);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setItems((prev) =>
      prev.map((a) => (a.id === editingId ? { ...a, description: editText } : a))
    );
    setEditingId(null);
    showToast("Peringatan diperbarui (simulasi)");
  };

  const sendChannel = (channel: string) => {
    showToast(`${channel} terkirim (simulasi)`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Alert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-white/10 p-4 transition-all hover:border-emerald-500/20"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Badge variant={statusVariant[alert.status]}>{alert.status}</Badge>
                  <h3 className="mt-2 font-semibold text-white">{alert.title}</h3>
                  <p className="text-sm text-white/50">{alert.regionName}</p>
                  <p className="mt-2 text-sm text-white/70">{alert.description}</p>
                </div>
                <Badge variant={alert.approved ? "default" : "outline"}>
                  {alert.approved ? "Disetujui" : "Menunggu"}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" onClick={() => toggleApprove(alert.id, true)}>
                  Setujui
                </Button>
                <Button size="sm" variant="outline" onClick={() => toggleApprove(alert.id, false)}>
                  Tolak
                </Button>
                <Button size="sm" variant="ghost" onClick={() => startEdit(alert)}>
                  Edit
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                {["WhatsApp", "SMS", "Sirine", "Push Notification"].map((ch) => (
                  <Button
                    key={ch}
                    size="sm"
                    variant={ch === "Sirine" ? "alert" : "default"}
                    onClick={() => sendChannel(ch)}
                  >
                    Kirim {ch}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!editingId} onOpenChange={() => setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Peringatan</DialogTitle>
          </DialogHeader>
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
          <Button onClick={saveEdit}>Simpan</Button>
        </DialogContent>
      </Dialog>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
