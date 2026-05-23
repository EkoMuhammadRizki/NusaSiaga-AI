"use client";

import { dataSources } from "@/lib/data/data-sources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UptimeChart } from "@/components/charts/UptimeChart";
import { cn } from "@/lib/utils";

const statusBadge = {
  active: "default" as const,
  delayed: "waspada" as const,
  offline: "awas" as const,
  maintenance: "outline" as const,
};

export function DataSourceGrid() {
  const chartData = dataSources
    .filter((d) => d.status !== "maintenance")
    .map((d) => ({
      name: d.name.split(" ")[0],
      uptime: d.uptime,
      latency: d.latency,
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source) => (
          <Card key={source.id} className="glow-emerald-hover transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm">{source.name}</CardTitle>
                <Badge variant={statusBadge[source.status]}>{source.status}</Badge>
              </div>
              <p className="text-xs text-white/40">{source.provider}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white/5 p-2">
                  <p className="text-[10px] text-white/40">Uptime</p>
                  <p className="text-sm font-bold text-white">{source.uptime}%</p>
                </div>
                <div className="rounded-lg bg-white/5 p-2">
                  <p className="text-[10px] text-white/40">Latency</p>
                  <p className="text-sm font-bold text-white">{source.latency}ms</p>
                </div>
                <div className="rounded-lg bg-white/5 p-2">
                  <p className="text-[10px] text-white/40">Quality</p>
                  <p className="text-sm font-bold text-white">{source.quality}%</p>
                </div>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    source.quality >= 90
                      ? "bg-emerald-500"
                      : source.quality >= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  )}
                  style={{ width: `${source.quality}%` }}
                />
              </div>
              <p className="text-[10px] text-white/40">Update: {source.lastUpdate}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafik Uptime Sumber Data</CardTitle>
        </CardHeader>
        <CardContent>
          <UptimeChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
