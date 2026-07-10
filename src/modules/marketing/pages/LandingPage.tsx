// LandingPage.tsx 
import React from "react";
import { Hero } from "@/shared/components/ui/Hero";
import { FeatureGrid } from "@/shared/components/ui/FeatureGrid";
import { Progress } from "@/shared/components/ui/DProgress";
import PasswordInput from "@/shared/components/form/PasswordInput";
import { OAuthButtonGroup } from "@/modules/auth/components/OAuthButtonGroup";
// import { OAuthButtons } from "@/modules/auth/components/OAuthButtons";



export const LandingPage: React.FC = () => {
  return (
    <div>
        <Hero />
        <FeatureGrid />
        <PasswordInput />
        {/* <OAuthButtons /> */}
        <OAuthButtonGroup />
        <Progress />
    </div>
  );
};
