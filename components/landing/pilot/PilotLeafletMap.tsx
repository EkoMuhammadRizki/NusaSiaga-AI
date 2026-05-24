"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { regions } from "@/lib/data/regions";
import type { Region } from "@/lib/types";
import "leaflet/dist/leaflet.css";

export default function PilotLeafletMap({
  selectedId,
  onRegionSelect,
}: {
  selectedId?: string;
  onRegionSelect: (region: Region) => void;
}) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("/indonesia.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  const createCustomIcon = (region: Region, isSelected: boolean) => {
    const colorClass = region.riskLevel === "kritis" ? "bg-rose-500" :
                       region.riskLevel === "tinggi" ? "bg-orange-500" :
                       region.riskLevel === "sedang" ? "bg-yellow-500" : "bg-emerald-500";

    const ringClass = isSelected ? "ring-4 ring-white ring-offset-2 ring-offset-[#0B1F3A]" : "ring-1 ring-white/50";

    const htmlString = `
      <div class="relative flex h-full w-full items-center justify-center cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-125' : 'hover:scale-110'}">
        <div class="absolute inset-0 rounded-full ${colorClass} opacity-40 ${isSelected ? 'animate-pulse' : ''}"></div>
        <div class="h-4 w-4 rounded-full ${colorClass} ${ringClass} relative z-10 shadow-lg border border-white/20"></div>
      </div>
    `;

    return L.divIcon({
      html: htmlString,
      className: "custom-pilot-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#050B14]">
      <MapContainer
        center={[-2.5, 118]}
        zoom={4}
        zoomControl={false}
        maxBounds={[[-12, 94], [8, 142]]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        style={{ background: "#050B14" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={() => ({
              fillColor: 'transparent',
              weight: 1,
              opacity: 0.3,
              color: '#334155',
            })}
          />
        )}

        {regions.map((region) => {
          if (!region.lat || !region.lng) return null;
          const isSelected = selectedId === region.id;
          
          return (
            <Marker 
              key={region.id}
              position={[region.lat, region.lng]} 
              icon={createCustomIcon(region, isSelected)}
              eventHandlers={{
                click: () => onRegionSelect(region),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} className="custom-pilot-tooltip">
                <div className="rounded border border-white/10 bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {region.name}
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background: #050B14 !important;
          outline: none !important;
        }
        .custom-pilot-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-tooltip.custom-pilot-tooltip {
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
