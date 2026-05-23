export type PilotFlowPhase = "form" | "processing" | "success";

export interface PilotFormData {
  instansiName: string;
  instansiType: string;
  picName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  kecamatanCount: string;
  riskLevel: string;
  risks: string[];
  modules: string[];
  selectedRegionId: string;
}

export const initialPilotForm: PilotFormData = {
  instansiName: "",
  instansiType: "",
  picName: "",
  email: "",
  phone: "",
  province: "Jawa Tengah",
  city: "Semarang",
  kecamatanCount: "",
  riskLevel: "tinggi",
  risks: ["Banjir"],
  modules: ["Early Warning", "Real-Time Risk Monitoring", "Command Center Dashboard"],
  selectedRegionId: "semarang",
};

export const instansiTypes = [
  "BNPB",
  "BPBD",
  "Pemerintah Daerah",
  "BMKG",
  "Smart City",
  "Dinas PU",
  "Lainnya",
] as const;

export const riskOptions = ["Banjir", "Longsor", "Cuaca Ekstrem", "Rob", "Subsidensi"] as const;

export const pilotModules = [
  "Early Warning",
  "Real-Time Risk Monitoring",
  "Digital Twin Simulation",
  "Citizen Reporting",
  "Sensor Integration",
  "Evacuation Monitoring",
  "AI Risk Prediction",
  "Command Center Dashboard",
] as const;

export const provinces = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Kalimantan Barat",
  "Sulawesi Selatan",
  "Bali",
  "Sumatera Utara",
] as const;
