const ROLE_KEY = "nusasiaga-role";
const SESSION_KEY = "nusasiaga-session";

export function setMockSession(role: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ROLE_KEY, role);
  sessionStorage.setItem(SESSION_KEY, "active");
}

export function getMockRole(): string {
  if (typeof window === "undefined") return "Analis";
  return sessionStorage.getItem(ROLE_KEY) ?? "Analis";
}

export function isMockAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "active";
}

export function clearMockSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ROLE_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
