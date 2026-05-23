"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { AlertCenter } from "@/components/dashboard/AlertCenter";
import { SensorStatusPanel } from "@/components/dashboard/SensorStatusPanel";
import { CitizenFeed } from "@/components/dashboard/CitizenFeed";
import { RegionDetailPanel } from "@/components/dashboard/RegionDetailPanel";
import { RainfallChart } from "@/components/charts/RainfallChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Region } from "@/lib/types";
import { useDashboard } from "@/components/dashboard/DashboardContext";

const RealtimeRiskMap = dynamic(
  () => import("@/components/maps/RealtimeRiskMap").then((mod) => mod.RealtimeRiskMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" /> }
);

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const { searchQuery } = useDashboard();
  const [activeStat, setActiveStat] = useState<string | undefined>();

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setPanelOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl font-bold tracking-tight text-white">Overview — Pusat Komando Nasional</h1>
        <p className="mt-1 text-sm text-slate-400">
          Monitoring risiko bencana tropis real-time · Digital Twin Indonesia
        </p>
      </div>

      <AnalyticsCards
        activeId={activeStat}
        onCardClick={(id) => {
          setActiveStat(id);
          document.getElementById("risk-map")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <Tabs defaultValue="map">
        <TabsList>
          <TabsTrigger value="map">Peta Risiko</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div id="risk-map" className="lg:col-span-2 min-h-[500px]">
              <RealtimeRiskMap
                className="h-full w-full"
                selectedId={selectedRegion?.id}
                onRegionSelect={handleRegionSelect}
              />
            </div>
            <AlertCenter />
          </div>
        </TabsContent>

        <TabsContent value="analytics" id="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Curah Hujan Nasional (24j)</CardTitle>
            </CardHeader>
            <CardContent>
              <RainfallChart height={240} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-2">
        <SensorStatusPanel />
        <CitizenFeed />
      </div>

      <RegionDetailPanel
        region={selectedRegion}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </div>
  );
}
