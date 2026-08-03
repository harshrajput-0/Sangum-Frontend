import type { ComponentType } from "react";
import { SOCIAL_PROVIDERS } from "../../constants/auth.constants";
import type { SocialProvider } from "../../types/auth.types";
import { GoogleIcon } from "./icons/GoogleIcon";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";

const PROVIDER_ICONS: Record<SocialProvider, ComponentType<{ className?: string }>> = {
  google: GoogleIcon,
  github: GithubIcon,
  linkedin: LinkedInIcon,
};

interface SocialAuthButtonsProps {
  onProviderClick: (provider: SocialProvider) => void;
  spacingClassName?: string;
}

export function SocialAuthButtons({
  onProviderClick,
  spacingClassName = "mb-5",
}: SocialAuthButtonsProps) {
  return (
    <div className={`flex justify-center gap-2.5 ${spacingClassName}`}>
      {SOCIAL_PROVIDERS.map(({ id, label }) => {
        const Icon = PROVIDER_ICONS[id];
        return (
          <button
            key={id}
            type="button"
            title={label}
            aria-label={label}
            onClick={() => onProviderClick(id)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-surface-hover"
          >
            <Icon className="text-text" />
          </button>
        );
      })}
    </div>
  );
}