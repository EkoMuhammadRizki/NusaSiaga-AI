"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatTimestamp } from "@/lib/utils";
import { getMockRole } from "@/lib/auth-mock";
import { alerts } from "@/lib/data/alerts";

interface TopbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onMenuClick?: () => void;
}

export function Topbar({ searchQuery, onSearchChange, onMenuClick }: TopbarProps) {
  const [mounted, setMounted] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [role, setRole] = useState("Analis");

  useEffect(() => {
    setMounted(true);
    setTimestamp(formatTimestamp());
    setRole(getMockRole());
    const interval = setInterval(() => setTimestamp(formatTimestamp()), 1000);
    return () => clearInterval(interval);
  }, []);

  const alertCount = alerts.filter((a) => a.status === "AWAS" || a.status === "SIAGA").length;

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-[#0B1F3A]/60 px-4 backdrop-blur-xl lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
          onClick={onMenuClick}
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative flex-1 sm:w-72 sm:flex-none">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder="Cari wilayah..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-white/50">Live</span>
          <span className="font-mono text-xs text-white/70" suppressHydrationWarning>
            {mounted ? timestamp : "—"}
          </span>
        </div>

        <button type="button" className="relative rounded-lg p-2 text-white/70 hover:bg-white/10">
          <Bell className="h-5 w-5" />
          {alertCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white pulse-critical">
              {alertCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{role.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">{role}</p>
            <Badge variant="default" className="text-[10px]">
              Online
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
