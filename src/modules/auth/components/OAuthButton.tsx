/**
 * OAuthButton.tsx
 * single provider button — icon only, round, no visible label (title +
 * aria-label carry the provider name). Same component used on LoginPage
 * and RegisterPage, directly or via OAuthButtonGroup.
 *
 * Provider icon is left to the consumer via `icon` — note this button is
 * icon-only, so until you pass one it will render as a blank circle.
 *
 * Path (as documented): modules/auth/components/
 */

import type { ReactNode } from "react";
import { Spinner } from "@/shared/components/ui/spinners";
import { cn } from "@/shared/utils/cn";

export interface OAuthButtonProps {
  /** Provider display name, e.g. "Google" — used for the title/aria-label. */
  provider: string;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function OAuthButton({
  provider,
  icon,
  loading = false,
  disabled = false,
  onClick,
  className,
}: OAuthButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      title={`Continue with ${provider}`}
      aria-label={`Continue with ${provider}`}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface text-text-secondary [transition:background_var(--t-fast),border-color_var(--t-fast),color_var(--t-fast)] focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-glow-purple)] disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:h-[19px] [&_svg]:w-[19px]",
        !isDisabled && "hover:border-text hover:bg-surface-hover hover:text-text",
        className,
      )}
    >
      {loading ? <Spinner size="xs" /> : icon}
    </button>
  );
}
