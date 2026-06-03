const ROLE_KEY = "nusasiaga-role";
const SESSION_KEY = "nusasiaga-session";
const INSTANSI_NAME_KEY = "nusasiaga-instansi-name";
const INSTANSI_CAT_KEY = "nusasiaga-instansi-category";
const ROLE_ACCESS_KEY = "nusasiaga-role-access";

export function setMockSession(roleAccess: string, instansiName: string = "BNPB Pusat", instansiCat: string = "BNPB Pusat") {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ROLE_KEY, roleAccess);
  sessionStorage.setItem(ROLE_ACCESS_KEY, roleAccess);
  sessionStorage.setItem(INSTANSI_NAME_KEY, instansiName);
  sessionStorage.setItem(INSTANSI_CAT_KEY, instansiCat);
  sessionStorage.setItem(SESSION_KEY, "active");
}

export function getMockRole(): string {
  if (typeof window === "undefined") return "Analis";
  return sessionStorage.getItem(ROLE_ACCESS_KEY) ?? sessionStorage.getItem(ROLE_KEY) ?? "Analis";
}

export function getMockInstansiName(): string {
  if (typeof window === "undefined") return "BNPB Pusat";
  return sessionStorage.getItem(INSTANSI_NAME_KEY) ?? "BNPB Pusat";
}

export function getMockInstansiCategory(): string {
  if (typeof window === "undefined") return "BNPB Pusat";
  return sessionStorage.getItem(INSTANSI_CAT_KEY) ?? "BNPB Pusat";
}

export function isMockAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "active";
}

export function clearMockSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ROLE_KEY);
  sessionStorage.removeItem(ROLE_ACCESS_KEY);
  sessionStorage.removeItem(INSTANSI_NAME_KEY);
  sessionStorage.removeItem(INSTANSI_CAT_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
