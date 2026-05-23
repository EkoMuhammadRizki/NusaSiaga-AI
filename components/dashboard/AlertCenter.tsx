"use client";

import { useState } from "react";
import { alerts as initialAlerts } from "@/lib/data/alerts";
import type { Alert, AlertStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClientOnly } from "@/components/ui/client-only";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const statusVariant: Record<AlertStatus, "waspada" | "siaga" | "awas"> = {
  WASPADA: "waspada",
  SIAGA: "siaga",
  AWAS: "awas",
};

function AlertListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[72px] animate-pulse rounded-xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}

function AlertList({
  items,
  onSelect,
}: {
  items: Alert[];
  onSelect: (alert: Alert) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((alert) => (
        <button
          key={alert.id}
          type="button"
          onClick={() => onSelect(alert)}
          suppressHydrationWarning
          className={cn(
            "w-full rounded-xl border border-white/10 p-3 text-left transition-all hover:border-emerald-500/30 hover:bg-white/5",
            alert.status === "AWAS" && "glow-alert border-red-500/30"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <Badge variant={statusVariant[alert.status]}>{alert.status}</Badge>
            <span className="font-mono text-[10px] text-slate-500">{alert.timeDisplay}</span>
          </div>
          <p className="mt-2 text-sm font-semibold tracking-tight text-white">{alert.title}</p>
          <p className="text-[10px] font-medium text-slate-500">{alert.regionName}</p>
        </button>
      ))}
    </div>
  );
}

export function AlertCenter() {
  const [items] = useState<Alert[]>(initialAlerts);
  const [selected, setSelected] = useState<Alert | null>(null);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="shrink-0 pb-3">
          <CardTitle className="font-display flex items-center justify-between text-base">
            Pusat Alert
            <span className="live-dot h-2 w-2 rounded-full bg-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[420px] px-4 pb-4">
            <ClientOnly fallback={<AlertListSkeleton />}>
              <AlertList items={items} onSelect={setSelected} />
            </ClientOnly>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
            <DialogDescription>{selected?.regionName}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <Badge variant={statusVariant[selected.status]}>{selected.status}</Badge>
              <p className="text-sm text-white/70">{selected.description}</p>
              <p className="text-xs text-white/40">
                Saluran: {selected.channels.join(", ")}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
