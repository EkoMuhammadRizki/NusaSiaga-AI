"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TrendStatCardProps {
  label: string;
  value: string;
  trend?: number;
  unit?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export function TrendStatCard({
  label,
  value,
  trend = 0,
  unit,
  icon,
  onClick,
  active,
}: TrendStatCardProps) {
  const positive = trend >= 0;

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={cn(
          "cursor-pointer transition-all glow-emerald-hover",
          active && "border-emerald-500/40 glow-emerald"
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">{label}</p>
              <p className="text-analytics mt-2 text-3xl text-white glow-text-emerald">
                {value}
                {unit && (
                  <span className="ml-1 text-xs font-normal text-slate-500">{unit}</span>
                )}
              </p>
              {trend !== 0 && (
                <div
                  className={cn(
                    "mt-2 flex items-center gap-1 text-[10px] font-medium tracking-tight",
                    positive ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {positive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(trend)}% vs 24j
                </div>
              )}
            </div>
            {icon && (
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">{icon}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
