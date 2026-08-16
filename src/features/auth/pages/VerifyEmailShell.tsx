"use client";

import { useVerifyEmailCountdown } from "../hooks/useVerifyEmailCountdown";
import { VerifyEmailPanel } from "../components/forms/VerifyEmailPanel";
import { AuthCard } from "../components/cards/AuthCard";

interface VerifyEmailShellProps {
  /** Read server-side from `?email=` in app/(auth)/verify-email/page.tsx */
  email?: string;
  /**
   * True when this screen was reached because register hit an existing,
   * unverified, <24h-old account (`ACCOUNT_PENDING_VERIFICATION`) rather
   * than the normal post-registration redirect. There's no session in
   * this case — see useVerifyEmailCountdown's `!isAuthenticated` branch.
   */
  isPendingConflict?: boolean;
}

export function VerifyEmailShell({ email, isPendingConflict }: VerifyEmailShellProps) {
  const { secondsRemaining, canResend, isResending, resendError, resend } =
    useVerifyEmailCountdown();

  return (
    <AuthCard maxWidthClassName="max-w-[420px]">
      <VerifyEmailPanel
        email={email}
        isPendingConflict={isPendingConflict}
        secondsRemaining={secondsRemaining}
        canResend={canResend}
        isResending={isResending}
        resendError={resendError}
        onResend={resend}
      />
    </AuthCard>
  );
}