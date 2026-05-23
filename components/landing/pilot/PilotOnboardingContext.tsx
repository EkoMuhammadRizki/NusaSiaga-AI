"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { PilotFlowPhase, PilotFormData } from "./types";
import { initialPilotForm } from "./types";

interface PilotOnboardingContextValue {
  open: boolean;
  phase: PilotFlowPhase;
  step: number;
  form: PilotFormData;
  implementationId: string;
  openPilot: () => void;
  closePilot: () => void;
  setStep: (step: number) => void;
  setPhase: (phase: PilotFlowPhase) => void;
  updateForm: (patch: Partial<PilotFormData>) => void;
  resetFlow: () => void;
  setImplementationId: (id: string) => void;
}

const PilotOnboardingContext = createContext<PilotOnboardingContextValue | null>(null);

function generateImplementationId() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `NSP-2026-${n}`;
}

export function PilotOnboardingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<PilotFlowPhase>("form");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<PilotFormData>(initialPilotForm);
  const [implementationId, setImplementationId] = useState("");

  const openPilot = useCallback(() => {
    setOpen(true);
    setPhase("form");
    setStep(1);
    setForm(initialPilotForm);
    setImplementationId("");
  }, []);

  const closePilot = useCallback(() => {
    setOpen(false);
  }, []);

  const resetFlow = useCallback(() => {
    setPhase("form");
    setStep(1);
    setForm(initialPilotForm);
    setImplementationId("");
  }, []);

  const updateForm = useCallback((patch: Partial<PilotFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  return (
    <PilotOnboardingContext.Provider
      value={{
        open,
        phase,
        step,
        form,
        implementationId,
        openPilot,
        closePilot,
        setStep,
        setPhase,
        updateForm,
        resetFlow,
        setImplementationId,
      }}
    >
      {children}
    </PilotOnboardingContext.Provider>
  );
}

export function usePilotOnboarding() {
  const ctx = useContext(PilotOnboardingContext);
  if (!ctx) {
    throw new Error("usePilotOnboarding must be used within PilotOnboardingProvider");
  }
  return ctx;
}

export { generateImplementationId };
