"use client";

import { useVerifyEmailCountdown } from "../hooks/useVerifyEmailCountdown";
import { VerifyEmailPanel } from "../components/forms/VerifyEmailPanel";
import { AuthCard } from "../components/cards/AuthCard";

interface VerifyEmailShellProps {
  /** Read server-side from `?email=` in app/(auth)/verify-email/page.tsx */
  email?: string;
}

export function VerifyEmailShell({ email }: VerifyEmailShellProps) {
  const { secondsRemaining, canResend, isResending, resendError, resend } =
    useVerifyEmailCountdown(email);

  return (
    <AuthCard maxWidthClassName="max-w-[420px]">
      <VerifyEmailPanel
        email={email}
        secondsRemaining={secondsRemaining}
        canResend={canResend}
        isResending={isResending}
        resendError={resendError}
        onResend={resend}
      />
    </AuthCard>
  );
}