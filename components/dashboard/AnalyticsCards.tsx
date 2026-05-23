"use client";

import {
  AlertTriangle,
  CloudRain,
  Radio,
  Shield,
} from "lucide-react";
import { nationalStats } from "@/lib/data/national-stats";
import { TrendStatCard } from "@/components/charts/TrendStatCard";

const iconMap: Record<string, React.ReactNode> = {
  "alert-triangle": <AlertTriangle className="h-5 w-5" />,
  radio: <Radio className="h-5 w-5" />,
  "cloud-rain": <CloudRain className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
};

interface AnalyticsCardsProps {
  onCardClick?: (id: string) => void;
  activeId?: string;
}

export function AnalyticsCards({ onCardClick, activeId }: AnalyticsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {nationalStats.map((stat) => (
        <TrendStatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          unit={stat.unit}
          icon={iconMap[stat.icon]}
          onClick={() => onCardClick?.(stat.id)}
          active={activeId === stat.id}
        />
      ))}
    </div>
  );
}
