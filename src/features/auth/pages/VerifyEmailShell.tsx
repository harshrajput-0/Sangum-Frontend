"use client";

import { useRouter } from "next/navigation";
import { useVerifyEmailCountdown } from "../hooks/useVerifyEmailCountdown";
import { VerifyEmailPanel } from "../components/forms/VerifyEmailPanel";
import { AuthCard } from "../components/cards/AuthCard";
import { AUTH_ROUTES } from "../constants/auth.constants";
import { useSessionStore } from "@/shared/stores/session.store";

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
  const router = useRouter();
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

  // register's own redirect and the pending-conflict path are the only
  // two arrivals where a send is already known to have happened for
  // this visit — everything else (most commonly: logging in on an
  // unverified account via resolveOnboardingRoute) starts unsent.
  const { hasSent, secondsRemaining, canResend, isSending, sendError, send } =
    useVerifyEmailCountdown({ assumeAlreadySent: Boolean(email) || Boolean(isPendingConflict) });

  // Only offer Skip when there's an actual session to skip into —
  // matches onboarding's VerifyNudgeScreen "Later" behavior: this
  // gate reappears on the next sign-in (resolveOnboardingRoute isn't
  // changed by skipping), it just doesn't block this visit.
  const onSkip = isAuthenticated ? () => router.push(AUTH_ROUTES.feed) : undefined;

  return (
    <AuthCard maxWidthClassName="max-w-[420px]">
      <VerifyEmailPanel
        email={email}
        isPendingConflict={isPendingConflict}
        hasSent={hasSent}
        secondsRemaining={secondsRemaining}
        canResend={canResend}
        isSending={isSending}
        sendError={sendError}
        onSend={send}
        onSkip={onSkip}
      />
    </AuthCard>
  );
}