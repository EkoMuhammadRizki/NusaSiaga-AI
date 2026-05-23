import type { PilotFormData } from "./types";
import { regions } from "@/lib/data/regions";

export function buildPilotSummary(form: PilotFormData) {
  const region = regions.find((r) => r.id === form.selectedRegionId);
  const regionLabel = form.city || region?.name || "Wilayah Pilot";
  const primaryRisk = form.risks[0] ?? "Banjir";
  const secondaryRisk = form.risks[1];
  const kecamatan = form.kecamatanCount || "12";

  const readiness = Math.min(
    98,
    72 +
      form.modules.length * 2 +
      (form.instansiName ? 5 : 0) +
      (form.risks.length > 1 ? 3 : 0)
  );

  const timeline =
    readiness >= 90
      ? "4–6 minggu"
      : readiness >= 80
        ? "6–8 minggu"
        : "8–12 minggu";

  return {
    regionLabel,
    province: form.province || region?.province || "—",
    primaryRisk,
    secondaryRisk,
    riskCombo: secondaryRisk ? `${primaryRisk} & ${secondaryRisk}` : primaryRisk,
    kecamatan,
    modules: form.modules,
    readiness,
    timeline,
    instansi: form.instansiName || form.instansiType || "Instansi Pemerintah",
  };
}
