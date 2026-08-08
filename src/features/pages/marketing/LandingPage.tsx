"use client";

// LandingPage.tsx 
import React from "react";
import { Hero } from "@/features/pages/marketing/components/Hero";
import { FeatureGrid } from "@/features/pages/marketing/components/FeatureGrid";
import { Progress } from "@/features/pages/marketing/components/ProgressSection";



export const LandingPage: React.FC = () => {
  return (
    <div>
        <Hero />
        <FeatureGrid />
        <Progress />
    </div>
  );
};
