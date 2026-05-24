"use client";

import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Clock, Radio, CloudRain, AlertTriangle, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { regions } from "@/lib/data/regions";

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

interface RealtimeRiskMapProps {
  onRegionSelect?: (region: any) => void;
  selectedId?: string | null;
  className?: string;
  variant?: "default" | "hero" | "compact";
  showHUD?: boolean;
  showRadarOverlay?: boolean;
}

export function RealtimeRiskMap({ className, onRegionSelect, selectedId, variant, showHUD, showRadarOverlay }: RealtimeRiskMapProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const [time, setTime] = useState<string>("14:32:05 WIB");

  useEffect(() => {
    fetch("/indonesia.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data", err));
      
    // Simulate live clock
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour12: false }) + " WIB");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className={cn("flex flex-col gap-4 rounded-xl border border-slate-800 bg-[#0B1120] p-5 shadow-2xl", className)}>
      
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-white">Real-Time Risk Map</h2>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[9px] font-bold tracking-widest text-emerald-500 uppercase">National Disaster Intelligence</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono text-xs font-medium tracking-wide">Live Update: {time}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1 */}
        <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-[#0F172A] p-4">
          <div className="rounded-lg bg-emerald-500/10 p-2.5">
            <Radio className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Sensors</span>
            <span className="text-lg font-bold text-emerald-400">847</span>
            <span className="text-[9px] font-medium text-slate-500">Satelit & IoT Hidrologi</span>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-[#0F172A] p-4">
          <div className="rounded-lg bg-amber-500/10 p-2.5">
            <CloudRain className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Rainfall</span>
            <span className="flex items-baseline gap-1 text-lg font-bold text-amber-400">
              142 <span className="text-sm font-medium">mm</span>
            </span>
            <span className="text-[9px] font-medium text-slate-500">Prediksi Curah Hujan</span>
          </div>
        </div>
        
        {/* Card 3 (High Risk) */}
        <div className="flex items-center gap-4 rounded-xl border border-rose-900/40 border-l-[3px] border-l-rose-500 bg-[#1A1118] p-4">
          <div className="rounded-lg bg-rose-500/10 p-2.5">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">High Risk</span>
            <span className="flex items-baseline gap-1 text-lg font-bold text-rose-400">
              12 <span className="text-sm font-medium">Areas</span>
            </span>
            <span className="text-[9px] font-medium text-slate-500">Prioritas Evakuasi BNPB</span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative flex-1 min-h-0 overflow-hidden rounded-xl border border-slate-800/60 bg-[#050B14]">
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
            return (
              <Marker 
                key={region.id} 
                position={[region.lat, region.lng]} 
                icon={createCustomIcon(region.riskScore)}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-leaflet-tooltip">
                  <div className="flex w-48 flex-col gap-1.5 rounded-xl border border-slate-700/50 bg-[#0B1120]/95 p-3 shadow-xl backdrop-blur-sm pointer-events-auto">
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
                        <span className="block text-slate-500 mb-0.5 font-medium">Kondisi Utama:</span>
                        {region.causes[0]}
                      </div>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

          <LiveCoordinates />
          <CustomZoomControl />
        </MapContainer>
        
        {/* Overlay Legend (Top Right) */}
        <div className="pointer-events-none absolute right-4 top-4 z-[400] flex gap-3 rounded-full border border-white/5 bg-[#0A101D]/90 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aman</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Peringatan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-500"></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Kritis</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-bold text-slate-400 font-mono">Satellite BMKG: Connected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-bold text-slate-400 font-mono">AWS Network: 99.8%</span>
          </div>
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
      `}</style>
    </div>
  );
}
