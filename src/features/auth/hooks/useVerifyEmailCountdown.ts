'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { authService } from "../services/auth.service";
import { RESEND_COOLDOWN_SECONDS } from "../constants/auth.constants";
import { useSessionStore } from "@/shared/stores/session.store";
import type { AuthApiError } from "../types/auth.types";

interface UseVerifyEmailCountdownArgs {
  /**
   * True when a verification email is already known to have gone out
   * for this visit — register's own redirect (the backend sends the
   * first email as a side effect of registration) or the
   * ACCOUNT_PENDING_VERIFICATION conflict path (backend sends a fresh
   * one on conflict). False for any other arrival — most commonly:
   * logging in on a not-yet-verified account and landing here via
   * resolveOnboardingRoute, where nothing has actually been sent for
   * this visit at all.
   */
  assumeAlreadySent: boolean;
}

export function useVerifyEmailCountdown({ assumeAlreadySent }: UseVerifyEmailCountdownArgs) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const [hasSent, setHasSent] = useState(assumeAlreadySent);
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_COOLDOWN_SECONDS);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
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

  // Only counts down once a send is actually known to have happened —
  // this used to run unconditionally on mount, claiming "we sent it"
  // and starting a real cooldown even on visits where nothing had
  // been sent at all (e.g. arriving via a login-time redirect).
  useEffect(() => {
    if (!hasSent) return;
    startTicking();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasSent, startTicking]);

  const canResend = hasSent && secondsRemaining <= 0 && !isSending;

  // Handles both the very first send (hasSent === false, no cooldown
  // gate applies yet) and subsequent resends (hasSent === true, gated
  // by canResend) — the underlying API call is identical either way.
  const send = useCallback(async () => {
    if (isSending) return;
    if (hasSent && !canResend) return; // still cooling down

    if (!isAuthenticated) {
      // Reached this page without a live in-memory session (e.g. the
      // tab was reopened) — sending needs a Bearer token, so there's
      // nothing to retry here; ask them to log back in instead of
      // failing silently.
      setSendError("Your session expired. Please log in again to send the email.");
      return;
    }

    setSendError(null);
    setIsSending(true);
    try {
      await authService.resendVerificationEmail();
      // Runs inside an event handler, not an effect, so a direct
      // setState reset here is fine.
      setSecondsRemaining(RESEND_COOLDOWN_SECONDS);
      setHasSent(true);
      startTicking();
    } catch (error) {
      const apiError = error as AuthApiError;
      setSendError(apiError.message ?? "Unable to send the email. Please try again.");
    } finally {
      setIsSending(false);
    }
  }, [isSending, hasSent, canResend, isAuthenticated, startTicking]);

  return {
    hasSent,
    secondsRemaining,
    canResend,
    isSending,
    sendError,
    send,
  };
}