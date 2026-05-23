"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardProvider, useDashboard } from "@/components/dashboard/DashboardContext";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { searchQuery, setSearchQuery } = useDashboard();
  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      {children}
    </DashboardShell>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardProvider>
  );
}
