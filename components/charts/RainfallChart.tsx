"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { rainfallSeries } from "@/lib/data/national-stats";

interface RainfallChartProps {
  data?: { hour: string; mm: number }[];
  height?: number;
}

export function RainfallChart({ data = rainfallSeries, height = 160 }: RainfallChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />
        <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />
        <Tooltip
          contentStyle={{
            background: "#0b1f3a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#fff" }}
        />
        <Area
          type="monotone"
          dataKey="mm"
          stroke="#10b981"
          fill="url(#rainGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
