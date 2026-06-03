"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  Bell,
  Users,
  Database,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/simulation", label: "Digital Twin", icon: Box },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/reports", label: "Citizen Reports", icon: Users },
  { href: "/dashboard/data", label: "Data Sources", icon: Database },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [activeModules, setActiveModules] = useState<string[] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nusasiaga-pilot-project");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setActiveModules(parsed.selectedModules || []);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const displayedItems = menuItems.filter((item) => {
    if (!activeModules) return true;
    if (item.label === "Overview" || item.label === "Settings") return true;
    if (item.label === "Digital Twin") {
      return activeModules.includes("Digital Twin Simulation") || activeModules.includes("Digital Twin");
    }
    if (item.label === "Alerts") {
      return activeModules.includes("Early Warning") || activeModules.includes("Evacuation Monitoring") || activeModules.includes("Early Warning System");
    }
    if (item.label === "Citizen Reports") {
      return activeModules.includes("Citizen Reporting") || activeModules.includes("Citizen Feed");
    }
    if (item.label === "Data Sources") {
      return activeModules.includes("Sensor Integration") || activeModules.includes("Real-Time Risk Monitoring") || activeModules.includes("IoT Sensor Integration") || activeModules.includes("GIS Risk Mapping");
    }
    if (item.label === "Analytics") {
      return activeModules.includes("AI Risk Prediction") || activeModules.includes("Real-Time Risk Monitoring") || activeModules.includes("Command Center Dashboard") || activeModules.includes("GIS Risk Mapping");
    }
    return true;
  });

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[#0B1F3A]/80 backdrop-blur-xl">
      <div className="border-b border-white/10 p-5">
        <Link href="/dashboard" className="flex items-center gap-1">
          <Image src="/NusaSiagaAI.png" alt="NusaSiaga AI Logo" width={64} height={64} className="shrink-0 object-contain -ml-2 -mr-1 mt-1" />
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-white leading-tight">NusaSiaga AI</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">COMMAND CENTER</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {displayedItems.map((item) => {
          const isOverviewActive =
            item.label === "Overview" && pathname === "/dashboard";

          const isSubActive =
            (item.label === "Digital Twin" && pathname === "/dashboard/simulation") ||
            (item.label === "Alerts" && pathname === "/dashboard/alerts") ||
            (item.label === "Citizen Reports" && pathname === "/dashboard/reports") ||
            (item.label === "Data Sources" && pathname === "/dashboard/data") ||
            (item.label === "Analytics" && pathname === "/dashboard/analytics") ||
            (item.label === "Settings" && pathname === "/dashboard/settings");

          const active = isOverviewActive || isSubActive;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium tracking-tight transition-all",
                active
                  ? "bg-emerald-500/15 text-emerald-300 glow-emerald"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-emerald-500/10 p-3">
          <p className="text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">Status Nasional</p>
          <p className="text-display mt-1 text-xl font-bold text-white glow-text-emerald">SIAGA</p>
          <p className="mt-1 text-[10px] text-slate-500">12 wilayah risiko tinggi</p>
        </div>
      </div>
    </aside>
  );
}
