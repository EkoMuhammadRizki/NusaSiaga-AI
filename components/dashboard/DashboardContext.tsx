"use client";

import { createContext, useContext, useState } from "react";

interface DashboardContextValue {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <DashboardContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
