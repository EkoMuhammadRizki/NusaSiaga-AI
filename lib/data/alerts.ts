import type { Alert } from "@/lib/types";

export const alerts: Alert[] = [
  {
    id: "alt-001",
    title: "Banjir Ciliwung — Siaga Level 2",
    regionId: "jakarta",
    regionName: "Jakarta",
    status: "SIAGA",
    timestamp: "2026-05-23T08:15:00",
    timeDisplay: "08:15",
    description:
      "Tinggi muka air Ciliwung 2.8 m, melebihi ambang SIAGA. Curah hujan 142 mm/24j di hulu Bogor. Rekomendasi evakuasi preventif RW 03–07.",
    channels: ["SMS", "WhatsApp", "Push Notification"],
    approved: true,
  },
  {
    id: "alt-002",
    title: "Longsor Potensial — Cimenyan",
    regionId: "bandung",
    regionName: "Bandung",
    status: "AWAS",
    timestamp: "2026-05-23T07:42:00",
    timeDisplay: "07:42",
    description:
      "Model AI mendeteksi risiko longsor tinggi di lereng Cimenyan akibat saturasi tanah 78%. Tutup akses jalan alternatif KM 12.",
    channels: ["SMS", "Sirine", "Push Notification"],
    approved: true,
  },
  {
    id: "alt-003",
    title: "Banjir Rob — Pantai Utara Semarang",
    regionId: "semarang",
    regionName: "Semarang",
    status: "WASPADA",
    timestamp: "2026-05-23T06:30:00",
    timeDisplay: "06:30",
    description:
      "Prediksi pasang surut tinggi dikombinasi hujan 76 mm. Waspada genangan di 5 kelurahan pesisir.",
    channels: ["WhatsApp", "Push Notification"],
    approved: false,
  },
  {
    id: "alt-004",
    title: "Hujan Ekstrem — Hulu Kapuas",
    regionId: "pontianak",
    regionName: "Pontianak",
    status: "WASPADA",
    timestamp: "2026-05-23T05:10:00",
    timeDisplay: "05:10",
    description:
      "Radar cuaca mendeteksi sel hujan konvektif kuat di hulu Kapuas. Koordinasi posko desa 3T.",
    channels: ["SMS"],
    approved: true,
  },
  {
    id: "alt-005",
    title: "Debit Sungai Jeneberang Naik",
    regionId: "makassar",
    regionName: "Makassar",
    status: "SIAGA",
    timestamp: "2026-05-23T04:55:00",
    timeDisplay: "04:55",
    description:
      "Sensor debit menunjukkan kenaikan 35% dalam 6 jam. Siapkan shelter evakuasi.",
    channels: ["SMS", "WhatsApp"],
    approved: false,
  },
];
