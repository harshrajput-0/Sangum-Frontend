/**
 * VerificationBanner.tsx
 * top-of-page banner for unverified accounts — dismissible, with a
 * "Resend email" action.
 *
 * Icon is left to the consumer via `icon`. Dismiss icon defaults to a
 * plain "×", overridable via `dismissIcon`.
 *
 * Path (as documented): modules/auth/components/
 */

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export interface VerificationBannerProps {
  message?: ReactNode;
  icon?: ReactNode;
  resendLabel?: string;
  onResend?: () => void;
  onDismiss?: () => void;
  dismissIcon?: ReactNode;
  className?: string;
}

export function VerificationBanner({
  message = "Please verify your email — check your inbox.",
  icon,
  resendLabel = "Resend email",
  onResend,
  onDismiss,
  dismissIcon,
  className,
}: VerificationBannerProps) {
  return (
    <div
      role="status"
      style={{ background: "var(--info-bg-dark)" }}
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--info)] px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex-shrink-0 text-[var(--info)] [&_svg]:h-[18px] [&_svg]:w-[18px]">{icon}</span>
        )}
        <span className="text-[length:var(--fs-sm)] text-[var(--text)]">{message}</span>
      </div>
      <div className="flex flex-shrink-0 items-center gap-3">
        {onResend && (
          <button
            type="button"
            onClick={onResend}
            className="text-[length:var(--fs-xs)] font-medium text-[var(--primary-light)] hover:underline"
          >
            {resendLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="flex-shrink-0 leading-none text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            {dismissIcon ?? "×"}
          </button>
        )}
      </div>
    </div>
  );
}
