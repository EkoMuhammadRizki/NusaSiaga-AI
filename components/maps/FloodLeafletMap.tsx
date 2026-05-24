"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip, Circle, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { regions } from "@/lib/data/regions";
import { ShieldAlert, AlertTriangle, Plus, Minus } from "lucide-react";

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

function CustomZoomControl() {
  const map = useMap();
  return (
    <div className="absolute bottom-4 right-4 z-[400] flex flex-col gap-2">
      <button onClick={() => map.zoomIn()} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur transition-colors">
        <Plus className="h-4 w-4" />
      </button>
      <button onClick={() => map.zoomOut()} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white backdrop-blur transition-colors">
        <Minus className="h-4 w-4" />
      </button>
    </div>
  );
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

export function FloodLeafletMap({ 
  floodIntensity, 
  damBreak = false, 
  evacuationBlocked = false 
}: { 
  floodIntensity: number;
  damBreak?: boolean;
  evacuationBlocked?: boolean;
}) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("/indonesia.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  const createCustomIcon = (baseScore: number, isFloodProne: boolean) => {
    // Dynamically adjust score based on simulation floodIntensity
    const dynamicScore = isFloodProne 
      ? Math.min(100, baseScore + (floodIntensity * 40)) 
      : baseScore;
      
    // Increase size of the pulsing circle significantly based on intensity
    const intensityScale = isFloodProne ? 1 + (floodIntensity * 1.5) : 1;

    let colorClass = "";
    if (dynamicScore > 70) colorClass = "bg-rose-500";
    else if (dynamicScore >= 40) colorClass = "bg-amber-500";
    else colorClass = "bg-emerald-500";

    const htmlString = `
      <div class="relative flex h-full w-full items-center justify-center pointer-events-none" style="transform: scale(${intensityScale}); transition: transform 0.3s ease;">
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

  const createClosedRouteIcon = () => {
    const htmlString = `
      <div class="relative flex h-8 w-8 items-center justify-center bg-rose-600 rounded-full border border-white/20 shadow-lg text-white font-mono animate-bounce font-extrabold text-xs">
        <span>X</span>
      </div>
    `;

    return L.divIcon({
      html: htmlString,
      className: "custom-closed-route-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // Determine dynamic reasoning text
  let reasoningText = "Kondisi wilayah terpantau normal dengan kapasitas tampung air hujan mencukupi.";
  if (floodIntensity > 0.3) {
    reasoningText = "Peningkatan curah hujan memicu kelebihan beban DAS utama di wilayah hulu.";
  }
  if (floodIntensity > 0.6) {
    reasoningText = "Intensitas curah hujan ekstrem menyebabkan genangan di dataran rendah dan kawasan perkotaan.";
  }
  if (evacuationBlocked) {
    reasoningText = "⚠️ RUTE DARURAT: Jalur evakuasi utama terblokir genangan air tinggi! Segera alihkan warga ke rute alternatif.";
  }
  if (damBreak) {
    reasoningText = "⚠️ BAHAYA: Tanggul jebol terdeteksi! Propagasi air meluas cepat ke sektor domestik dan infrastruktur kritis.";
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-emerald-500/20 bg-[#050B14]">
      {/* Translucent Red Overlay for Tanggul Jebol */}
      <div 
        className={`absolute inset-0 z-[401] pointer-events-none transition-all duration-700 ${
          damBreak ? "bg-red-500/[0.06] border border-red-500/20 shadow-[inset_0_0_40px_rgba(239,68,68,0.15)]" : "bg-red-500/0"
        }`}
      />

      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        zoomControl={false}
        maxBounds={[[-12, 94], [8, 142]]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        style={{ background: "#050B14" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
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

        {regions.map((region) => {
          if (!region.lat || !region.lng) return null;
          
          // Identify flood-prone regions (Jakarta, Semarang, Bandung)
          const isFloodProne = region.causes.some(c => c.toLowerCase().includes("banjir") || c.toLowerCase().includes("hujan"));
          const dynamicScore = isFloodProne ? Math.min(100, region.riskScore + (floodIntensity * 40)) : region.riskScore;

          // Dynamic radius in meters (from 25km to 130km)
          const radius = isFloodProne 
            ? 25000 + (floodIntensity * 105000) 
            : 15000;

          // Dynamic color for circle fill
          const color = dynamicScore > 70 ? "#f43f5e" : dynamicScore >= 40 ? "#fb923c" : "#10b981";

          return (
            <React.Fragment key={`${region.id}-${Math.round(dynamicScore)}`}>
              <Circle 
                center={[region.lat, region.lng]}
                radius={radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: isFloodProne ? 0.12 + (floodIntensity * 0.15) : 0.06,
                  color: color,
                  weight: 1,
                  dashArray: damBreak && isFloodProne ? "5, 10" : undefined
                }}
              />
              {/* Extra outer pulsing circle for Tanggul Jebol */}
              {damBreak && isFloodProne && (
                <Circle 
                  center={[region.lat, region.lng]}
                  radius={radius * 1.4}
                  pathOptions={{
                    fillColor: "#ef4444",
                    fillOpacity: 0.03,
                    color: "#ef4444",
                    weight: 1.5,
                    dashArray: "3, 6"
                  }}
                />
              )}
              <Marker 
                position={[region.lat, region.lng]} 
                icon={createCustomIcon(region.riskScore, isFloodProne)}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-leaflet-tooltip">
                  <div className="flex w-48 flex-col gap-1.5 rounded-xl border border-slate-700/50 bg-[#0B1120]/95 p-3 shadow-xl backdrop-blur-sm pointer-events-auto">
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-1.5">
                      <span className="font-semibold text-white">{region.name}</span>
                      <span 
                        className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase" 
                        style={{ backgroundColor: `${getRiskColor(dynamicScore)}20`, color: getRiskColor(dynamicScore) }}
                      >
                        {getRiskStatus(dynamicScore)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Simulasi Risiko</span>
                      <span className="font-mono font-medium text-slate-200">{Math.round(dynamicScore)}/100</span>
                    </div>
                    {region.causes[0] && (
                      <div className="mt-0.5 rounded bg-slate-800/50 px-2 py-1 text-[10px] leading-tight text-slate-300">
                        <span className="block text-slate-500 mb-0.5 font-medium">Kondisi Utama:</span>
                        {region.causes[0]}
                      </div>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Closed Evacuation Route Markers when evacuationBlocked is true */}
        {evacuationBlocked && (
          <>
            <Marker 
              position={[-6.15, 106.75]} 
              icon={createClosedRouteIcon()}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="rounded border border-red-500/20 bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-red-400">
                  RUTE BLOKIR: DAS Ciliwung Meluap
                </div>
              </Tooltip>
            </Marker>
            <Marker 
              position={[-6.95, 107.55]} 
              icon={createClosedRouteIcon()}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="rounded border border-red-500/20 bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-red-400">
                  RUTE BLOKIR: Genangan Tinggi Cibeunying
                </div>
              </Tooltip>
            </Marker>
          </>
        )}

        <LiveCoordinates />
        <CustomZoomControl />
      </MapContainer>

      {/* Floating Explainable Risk Reasoning Panel (Top Left Overlay) */}
      <div className="absolute top-4 left-4 z-[400] max-w-[250px] rounded-xl border border-slate-800 bg-[#0B1528]/95 p-3 shadow-2xl backdrop-blur-md transition-all duration-300">
        <div className="mb-1.5 flex items-center gap-1.5 text-cyan-400">
          <ShieldAlert className="h-4 w-4 animate-pulse text-[#00E5FF]" />
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#00E5FF]">Predictive Reasoning</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-300 transition-all duration-300">
          {reasoningText}
        </p>
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
        .custom-closed-route-icon {
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
