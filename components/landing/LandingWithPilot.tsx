"use client";

import { useState } from "react";
import { PilotOnboardingProvider } from "./pilot/PilotOnboardingContext";
import { PilotOnboardingPanel } from "./pilot/PilotOnboardingPanel";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "./HeroSection";
import { TujuanSection } from "./TujuanSection";
import { MasalahSection } from "./MasalahSection";
import { FiturSection } from "./FiturSection";
import { CaraKerjaSection } from "./CaraKerjaSection";
import { TargetUserSection } from "./TargetUserSection";
import { DashboardPreviewSection } from "./DashboardPreviewSection";
import { CtaSection } from "./CtaSection";
import { SplashScreen } from "./SplashScreen";

export function LandingWithPilot() {
  const [showLanding, setShowLanding] = useState(false);

  return (
    <PilotOnboardingProvider>
      <SplashScreen onComplete={() => setShowLanding(true)} />
      {showLanding && (
        <div className="geo-grid min-h-screen">
          <Navbar />
          <main>
            <HeroSection />
            <TujuanSection />
            <MasalahSection />
            <FiturSection />
            <CaraKerjaSection />
            <TargetUserSection />
            <DashboardPreviewSection />
            <CtaSection />
          </main>
          <Footer />
        </div>
      )}
      <PilotOnboardingPanel />
    </PilotOnboardingProvider>
  );
}
