"use client";

// LandingPage.tsx 
import React from "react";
import { Hero } from "@/features/pages/marketing/components/Hero";
// import { FeatureGrid } from "@/features/pages/marketing/components/FeatureGrid";

import AboutSection from "./components/landing/AboutSection";
import WhatItsForSection from "./components/landing/WhatItsForSection";
import WaitlistSection from "./components/landing/WaitlistSection";

import { Progress } from "@/features/pages/marketing/components/ProgressSection";



export const LandingPage: React.FC = () => {
  return (
    <div>


        <Hero />
            <AboutSection />
      <WhatItsForSection />
        <Progress />
      <WaitlistSection />

        {/* <FeatureGrid /> */}
    </div>
  );
};
