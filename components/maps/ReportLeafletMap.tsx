"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Plus, Minus } from "lucide-react";

interface ReportLeafletMapProps {
  onMapClick: (lat: number, lng: number) => void;
  selectedCoords: { lat: number; lng: number } | null;
  className?: string;
}

function MapEventsHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
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

export function ReportLeafletMap({ onMapClick, selectedCoords, className }: ReportLeafletMapProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("/indonesia.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  const createMockDotIcon = (urgency: "kritis" | "sedang" | "rendah") => {
    let colorClass = "";
    if (urgency === "kritis") colorClass = "bg-rose-500 shadow-[0_0_8px_#f43f5e]";
    else if (urgency === "sedang") colorClass = "bg-amber-400 shadow-[0_0_8px_#fbbf24]";
    else colorClass = "bg-emerald-500 shadow-[0_0_8px_#10b981]";

    const htmlString = `
      <div class="relative flex h-3 w-3 items-center justify-center pointer-events-none">
        <div class="h-2 w-2 rounded-full ${colorClass}"></div>
      </div>
    `;

    return L.divIcon({
      html: htmlString,
      className: "custom-mock-dot-icon",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
  };

  const createDroppedPinIcon = () => {
    const htmlString = `
      <div class="relative flex h-8 w-8 items-center justify-center animate-bounce pointer-events-none">
        <div class="absolute h-5 w-5 rounded-full bg-rose-500/30 animate-ping"></div>
        <div class="h-4.5 w-4.5 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_10px_#ef4444] flex items-center justify-center">
          <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
        </div>
      </div>
    `;

    return L.divIcon({
      html: htmlString,
      className: "custom-dropped-pin-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  // Pre-determined mockup points for existing citizen reports
  const existingReports = [
    { city: "Jakarta", lat: -6.2088, lng: 106.8456, urgency: "kritis" as const, score: 87 },
    { city: "Bandung", lat: -6.9175, lng: 107.6191, urgency: "kritis" as const, score: 72 },
    { city: "Semarang", lat: -6.9932, lng: 110.4203, urgency: "sedang" as const, score: 65 },
    { city: "Pontianak", lat: -0.0227, lng: 109.3425, urgency: "rendah" as const, score: 58 },
    { city: "Makassar", lat: -5.1476, lng: 119.4327, urgency: "sedang" as const, score: 51 },
  ];

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-slate-800 bg-[#050B14] ${className || "h-[450px]"}`}>
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
              opacity: 0.25,
              color: '#475569',
              className: 'glowing-map-path'
            })}
          />
        )}

        {/* Existing Mock Dot Markers */}
        {existingReports.map((report) => (
          <Marker
            key={report.city}
            position={[report.lat, report.lng]}
            icon={createMockDotIcon(report.urgency)}
          >
            <Tooltip permanent={true} direction="right" className="custom-city-tooltip" offset={[8, 0]}>
              {report.city} <span className="text-[9px] text-slate-500 font-mono">({report.score})</span>
            </Tooltip>
          </Marker>
        ))}

        {/* User-dropped active report pin */}
        {selectedCoords && (
          <Marker
            position={[selectedCoords.lat, selectedCoords.lng]}
            icon={createDroppedPinIcon()}
          >
            <Tooltip permanent={true} direction="top" offset={[0, -16]} className="custom-dropped-pin-tooltip">
              <div className="bg-[#0F172A] border border-rose-500/30 text-rose-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider shadow-lg">
                Lokasi Baru
              </div>
            </Tooltip>
          </Marker>
        )}

        <MapEventsHandler onMapClick={onMapClick} />
        <CustomZoomControl />
      </MapContainer>

      {/* Floating Alert Coordinate indicator */}
      {selectedCoords && (
        <div className="absolute top-4 left-4 z-[400] rounded-lg border border-rose-500/20 bg-slate-950/80 px-3 py-1.5 text-[10px] font-medium backdrop-blur-md transition-all duration-300">
          <span className="text-rose-400 font-bold uppercase tracking-wider font-mono">PIN COORDS:</span> &nbsp;
          <span className="font-mono text-slate-300">
            {selectedCoords.lat.toFixed(4)}, {selectedCoords.lng.toFixed(4)}
          </span>
        </div>
      )}

      {/* Grid Guide Overlay */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-[400] flex flex-col gap-0.5">
        <span className="text-[9px] font-bold tracking-[0.2em] text-[#00E5FF] uppercase">Interactive Mode</span>
        <span className="text-[9px] text-slate-500">Klik wilayah peta untuk menandai titik baru</span>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #050B14 !important;
          outline: none !important;
        }
        .custom-mock-dot-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-dropped-pin-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-tooltip.custom-city-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #94a3b8 !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          padding: 0 !important;
          margin: 0 !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }
        .leaflet-tooltip.custom-dropped-pin-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
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
