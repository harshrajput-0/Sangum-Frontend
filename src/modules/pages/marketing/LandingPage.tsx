"use client";

// LandingPage.tsx 
import React from "react";
import { Hero } from "@/modules/pages/marketing/components/Hero";
import { FeatureGrid } from "@/modules/pages/marketing/components/FeatureGrid";
import { Progress } from "@/modules/pages/marketing/components/DProgress";



export const LandingPage: React.FC = () => {
  return (
    <div>
        <Hero />
        <FeatureGrid />
        <Progress />
    </div>
  );
};
