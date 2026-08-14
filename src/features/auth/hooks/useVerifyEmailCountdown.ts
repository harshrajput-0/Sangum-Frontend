import { useCallback, useEffect, useRef, useState } from "react";
import { authService } from "../services/auth.service";
import { RESEND_COOLDOWN_SECONDS } from "../constants/auth.constants";
import { useSessionStore } from "@/shared/stores/session.store";
import type { AuthApiError } from "../types/auth.types";

export function useVerifyEmailCountdown() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Starts (or restarts) the ticking interval only — never touches
  // secondsRemaining directly, so it's safe to call from an effect
  // body without triggering a synchronous setState-in-effect.
  const startTicking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTicking();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTicking]);

  const canResend = secondsRemaining <= 0 && !isResending;

  const resend = useCallback(async () => {
    if (!canResend) return;

    if (!isAuthenticated) {
      // Reached this page without a live in-memory session (e.g. the
      // tab was reopened) — resend needs a Bearer token, so there's
      // nothing to retry here; ask them to log back in instead of
      // failing silently.
      setResendError("Your session expired. Please log in again to resend the email.");
      return;
    }

    setResendError(null);
    setIsResending(true);
    try {
      await authService.resendVerificationEmail();
      // Runs inside an event handler, not an effect, so a direct
      // setState reset here is fine.
      setSecondsRemaining(RESEND_COOLDOWN_SECONDS);
      startTicking();
    } catch (error) {
      const apiError = error as AuthApiError;
      setResendError(apiError.message ?? "Unable to resend the email. Please try again.");
    } finally {
      setIsResending(false);
    }
  }, [canResend, isAuthenticated, startTicking]);

  return {
    secondsRemaining,
    canResend,
    isResending,
    resendError,
    resend,
  };
}