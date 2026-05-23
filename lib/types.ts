export type AlertStatus = "WASPADA" | "SIAGA" | "AWAS";
export type RiskLevel = "rendah" | "sedang" | "tinggi" | "kritis";
export type SensorStatus = "active" | "delayed" | "offline" | "maintenance";
export type DataSourceStatus = "active" | "delayed" | "offline" | "maintenance";
export type ReportUrgency = "rendah" | "sedang" | "tinggi" | "darurat";
export type ValidationStatus = "Menunggu Validasi" | "Tervalidasi" | "Ditolak";

export interface Region {
  id: string;
  name: string;
  province: string;
  cx: number;
  cy: number;
  lat?: number;
  lng?: number;
  riskScore: number;
  riskLevel: RiskLevel;
  rainfall: number;
  waterLevel: number;
  floodHistory: string[];
  population: number;
  causes: string[];
  recommendations: string[];
  landslideRisk: number;
  sensorIds: string[];
}

export interface Alert {
  id: string;
  title: string;
  regionId: string;
  regionName: string;
  status: AlertStatus;
  timestamp: string;
  /** Waktu tampilan tetap (hindari hydration mismatch timezone) */
  timeDisplay: string;
  description: string;
  channels: string[];
  approved: boolean;
}

export interface Sensor {
  id: string;
  name: string;
  regionId: string;
  type: "rainfall" | "river";
  battery: number;
  status: SensorStatus;
  lastReading: string;
  value: number;
  unit: string;
}

export interface CitizenReport {
  id: string;
  author: string;
  location: string;
  regionId: string;
  category: string;
  waterHeight: number;
  roadAccess: string;
  urgency: ReportUrgency;
  timestamp: string;
  imageUrl: string;
  validationStatus: ValidationStatus;
}

export interface DataSource {
  id: string;
  name: string;
  provider: string;
  status: DataSourceStatus;
  uptime: number;
  latency: number;
  quality: number;
  lastUpdate: string;
}

export interface NationalStat {
  id: string;
  label: string;
  value: string;
  trend: number;
  unit?: string;
  icon: string;
}

export interface RainfallPoint {
  hour: string;
  mm: number;
}
