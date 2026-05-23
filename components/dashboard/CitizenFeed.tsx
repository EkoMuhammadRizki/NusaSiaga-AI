"use client";

import Image from "next/image";
import { citizenReports } from "@/lib/data/citizen-reports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const urgencyVariant = {
  rendah: "outline" as const,
  sedang: "waspada" as const,
  tinggi: "siaga" as const,
  darurat: "awas" as const,
};

export function CitizenFeed({ extraReports = [] }: { extraReports?: typeof citizenReports }) {
  const all = [...extraReports, ...citizenReports];

  return (
    <Card className="flex flex-col">
      <CardHeader className="shrink-0 pb-3">
        <CardTitle className="font-display flex items-center gap-2 text-base">
          Feed Laporan Warga
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4 pb-4">
          <div className="space-y-3">
            {all.map((report) => (
              <div
                key={report.id}
                className="flex gap-3 rounded-xl border border-white/10 p-2 transition-all hover:border-emerald-500/20"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={report.imageUrl}
                    alt={report.category}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="truncate text-sm font-medium text-white">{report.author}</p>
                    <Badge variant={urgencyVariant[report.urgency]} className="shrink-0 text-[10px]">
                      {report.urgency}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/50">{report.location}</p>
                  <p className="mt-1 text-xs text-white/70">
                    {report.category} · Air {report.waterHeight} cm · {report.roadAccess}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
