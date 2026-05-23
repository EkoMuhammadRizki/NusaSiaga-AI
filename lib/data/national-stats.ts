import type { NationalStat } from "@/lib/types";

export const nationalStats: NationalStat[] = [
  {
    id: "high-risk",
    label: "Wilayah Risiko Tinggi",
    value: "12",
    trend: 3,
    unit: "provinsi",
    icon: "alert-triangle",
  },
  {
    id: "active-sensors",
    label: "Sensor Aktif",
    value: "847",
    trend: 12,
    unit: "node",
    icon: "radio",
  },
  {
    id: "extreme-rain",
    label: "Curah Hujan Ekstrem",
    value: "142",
    trend: 28,
    unit: "mm max",
    icon: "cloud-rain",
  },
  {
    id: "national-status",
    label: "Status Nasional",
    value: "SIAGA",
    trend: 0,
    icon: "shield",
  },
];

export const rainfallSeries = [
  { hour: "00", mm: 12 },
  { hour: "03", mm: 18 },
  { hour: "06", mm: 45 },
  { hour: "09", mm: 78 },
  { hour: "12", mm: 112 },
  { hour: "15", mm: 142 },
  { hour: "18", mm: 98 },
  { hour: "21", mm: 65 },
];
