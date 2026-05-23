"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { usePilotOnboarding } from "./PilotOnboardingContext";
import { cn } from "@/lib/utils";

interface PilotTriggerButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function PilotTriggerButton({
  children,
  className,
  variant = "default",
  size,
  ...props
}: PilotTriggerButtonProps) {
  const { openPilot } = usePilotOnboarding();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn("glow-emerald-hover", className)}
      onClick={openPilot}
      {...props}
    >
      {children}
    </Button>
  );
}
