"use client";

import { useState, useEffect } from "react";
import { MapContainer, GeoJSON, Marker, Tooltip, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { regions } from "@/lib/data/regions";
import type { Region } from "@/lib/types";

type FilterType = "Semua" | "Banjir" | "Longsor" | "Cuaca Ekstrem";

function getRiskColor(score: number) {
  if (score > 70) return "rgb(239, 68, 68)"; // Kritis (Red)
  if (score >= 40) return "rgb(249, 115, 22)"; // Sedang (Orange)
  return "rgb(16, 185, 129)"; // Rendah (Green)
}

function getRiskStatus(score: number) {
  if (score > 70) return "Kritis";
  if (score >= 40) return "Sedang";
  return "Rendah";
}

function LiveCoordinates() {
  const [coords, setCoords] = useState({ lat: "-6.2088", lng: "106.8456" });
  useMapEvents({
    mousemove(e) {
      setCoords({
        lat: e.latlng.lat.toFixed(4),
        lng: e.latlng.lng.toFixed(4),
      });
    },
  });

  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[400] flex flex-col gap-1.5">
      <span className="text-[10px] font-bold tracking-[0.2em] text-[#00E5FF] uppercase">Koordinat Grid</span>
      <div className="rounded-lg border border-white/5 bg-[#050B14]/80 px-3 py-1.5 backdrop-blur-md">
        <span className="font-mono text-[10px] text-slate-400">
          LAT: {coords.lat} &nbsp;|&nbsp; LONG: {coords.lng}
        </span>
      </div>
    </div>
  );
}

export function DisasterDigitalTwinMap({ className }: { className?: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Semua");
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("/indonesia.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  const filteredRegions = regions.filter((r) => {
    if (activeFilter === "Semua") return true;
    if (activeFilter === "Banjir") return r.waterLevel > 1.5 || r.causes.some(c => c.toLowerCase().includes("banjir") || c.toLowerCase().includes("rob"));
    if (activeFilter === "Longsor") return r.landslideRisk > 50 || r.causes.some(c => c.toLowerCase().includes("longsor"));
    if (activeFilter === "Cuaca Ekstrem") return r.rainfall > 70 || r.causes.some(c => c.toLowerCase().includes("hujan"));
    return true;
  });

  const createCustomIcon = (score: number) => {
    let colorClass = "";
    if (score > 70) colorClass = "bg-rose-500";
    else if (score >= 40) colorClass = "bg-amber-500";
    else colorClass = "bg-emerald-500";

    const htmlString = `
      <div class="relative flex h-full w-full items-center justify-center pointer-events-none">
        <div class="absolute inset-0 rounded-full ${colorClass} opacity-10 animate-pulse"></div>
        <div class="absolute h-[50%] w-[50%] rounded-full ${colorClass} opacity-20"></div>
        <div class="h-1.5 w-1.5 rounded-full ${colorClass} relative z-10 shadow-[0_0_8px_currentColor]"></div>
      </div>
    `;

    return L.divIcon({
      html: htmlString,
      className: "custom-leaflet-icon",
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    });
  };

  return (
    <div className={`flex flex-col rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden ${className || ""}`}>
      {/* Header Card */}
      <div className="flex flex-col gap-4 border-b border-slate-800/50 bg-[#0B1120] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg font-semibold tracking-tight text-white">Disaster Digital Twin Map</h3>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-emerald-400 uppercase whitespace-nowrap">Live System Feed</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-slate-400">Pemetaan risiko bencana nasional berbasis AI spasial</p>
        </div>

        {/* Filter Group */}
        <div className="flex flex-wrap gap-2">
          {(["Semua", "Banjir", "Longsor", "Cuaca Ekstrem"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-slate-700 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="relative w-full flex-1 overflow-hidden">
        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          zoomControl={false}
          className="h-full w-full"
          style={{ background: "#050B14" }}
          attributionControl={false}
        >
          {geoData && (
            <GeoJSON 
              data={geoData} 
              style={() => ({
                fillColor: 'transparent',
                weight: 1,
                opacity: 0.8,
                color: '#94a3b8',
                className: 'glowing-map-path'
              })}
            />
          )}

          {filteredRegions.map((region) => {
            if (!region.lat || !region.lng) return null;
            return (
              <Marker 
                key={region.id} 
                position={[region.lat, region.lng]} 
                icon={createCustomIcon(region.riskScore)}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-leaflet-tooltip">
                  <div className="flex w-48 flex-col gap-1.5 rounded-xl border border-slate-700/50 bg-slate-900/95 p-3 shadow-xl backdrop-blur-sm pointer-events-auto">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-1.5">
                      <span className="font-semibold text-white">{region.name}</span>
                      <span 
                        className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase" 
                        style={{ backgroundColor: `${getRiskColor(region.riskScore)}20`, color: getRiskColor(region.riskScore) }}
                      >
                        {getRiskStatus(region.riskScore)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Indeks Risiko</span>
                      <span className="font-mono font-medium text-slate-200">{region.riskScore}/100</span>
                    </div>
                    {region.causes[0] && (
                      <div className="mt-0.5 rounded bg-slate-800/50 px-2 py-1 text-[10px] leading-tight text-slate-300">
                        <span className="block text-slate-500 mb-0.5 font-medium">Top Cause:</span>
                        {region.causes[0]}
                      </div>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

          <LiveCoordinates />
        </MapContainer>
      </div>

      {/* Footer & Legenda */}
      <div className="flex items-center justify-between border-t border-slate-800/50 bg-[#0B1120] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            <span>Kritis (&gt;70)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span>Sedang (40-70)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Rendah (&lt;40)</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500">
          Update: Just now
        </div>
      </div>
      
      <style jsx global>{`
        .leaflet-container {
          background: #050B14 !important;
          outline: none !important;
        }
        .custom-leaflet-icon {
          background: transparent !important;
          border: none !important;
        }
        path.glowing-map-path {
          filter: drop-shadow(0 0 4px rgba(148, 163, 184, 0.5));
          transition: all 0.3s ease;
        }
        .leaflet-tooltip.custom-leaflet-tooltip {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          margin: 0;
        }
        .leaflet-tooltip-left::before,
        .leaflet-tooltip-right::before,
        .leaflet-tooltip-top::before,
        .leaflet-tooltip-bottom::before {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
