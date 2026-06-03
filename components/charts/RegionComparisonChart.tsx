"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { regions } from "@/lib/data/regions";

export function RegionComparisonChart() {
  const data = regions.map((r) => ({
    name: r.name,
    "Risiko Banjir": r.riskScore,
    "Risiko Longsor": r.landslideRisk,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="floodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="landslideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
        <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            background: "#0b1f3a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#fff", fontWeight: "bold" }}
        />
        <Legend
          wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
          formatter={(value) => <span className="text-slate-300">{value}</span>}
        />
        <Bar dataKey="Risiko Banjir" fill="url(#floodGrad)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="Risiko Longsor" fill="url(#landslideGrad)" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
