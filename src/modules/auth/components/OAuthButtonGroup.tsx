/**
 * OAuthButtonGroup.tsx
 * all providers in one row (Google · GitHub · LinkedIn) + an "or" divider +
 * a "Continue with Email" fallback. Used on LoginPage & RegisterPage —
 * this component is just the button cluster; the surrounding card and
 * heading ("Sign in to your account" / "Create your account") live on
 * those pages.
 *
 * Provider icons are left to the consumer via each provider's `icon`.
 *
 * Path (as documented): modules/auth/components/
 */

import type { ReactNode } from "react";
import { OAuthButton } from "./OAuthButton";
import { Divider } from "@/shared/components/ui/Divider";
// import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import { GoogleIcon, GithubIcon, LinkedinIcon} from "@/shared/components/ui/icons/SangumIcons";


export interface OAuthProviderConfig {
  id: string;
  /** Display name, e.g. "Google". */
  label: string;
  icon?: ReactNode;
}

export interface OAuthButtonGroupProps {
  /** Defaults to Google · GitHub · LinkedIn (no icons). */
  providers?: OAuthProviderConfig[];
  /** id of the provider currently mid-flow — disables the others. */
  loadingProvider?: string | null;
  onProviderClick?: (id: string) => void;
  showEmailOption?: boolean;
  emailIcon?: ReactNode;
  onContinueWithEmail?: () => void;
  className?: string;
}

const defaultProviders: OAuthProviderConfig[] = [
  { id: "google", label: "Google", icon: <GoogleIcon />  },
  { id: "github", label: "GitHub", icon: <GithubIcon /> },
  { id: "linkedin", label: "LinkedIn", icon: <LinkedinIcon /> },
];

export function OAuthButtonGroup({
  providers = defaultProviders,
  loadingProvider = null,
  onProviderClick,
//   showEmailOption = true,
//   emailIcon,
//   onContinueWithEmail,
  className,
}: OAuthButtonGroupProps) {
  return (
    <div className={cn("flex flex-col", className)}>
          <Divider label="or" className="my-4" />

      <div className="flex justify-center gap-3.5">
        {providers.map((p) => (
          <OAuthButton
            key={p.id}
            provider={p.label}
            icon={p.icon}
            loading={loadingProvider === p.id}
            disabled={loadingProvider !== null && loadingProvider !== p.id}
            onClick={onProviderClick ? () => onProviderClick(p.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
