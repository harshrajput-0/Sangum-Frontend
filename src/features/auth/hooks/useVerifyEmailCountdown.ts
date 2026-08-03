import { useCallback, useEffect, useRef, useState } from "react";
import { authService } from "../services/auth.service";
import { RESEND_COOLDOWN_SECONDS } from "../constants/auth.constants";
import type { AuthApiError } from "../types/auth.types";

/**
 * @param email - the address to resend to, read server-side from
 * `?email=` in app/(auth)/verify-email/page.tsx and passed down as a
 * plain prop through VerifyEmailShell.
 */
export function useVerifyEmailCountdown(email: string | undefined) {
  const [secondsRemaining, setSecondsRemaining] = useState(
    RESEND_COOLDOWN_SECONDS,
  );
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSecondsRemaining(RESEND_COOLDOWN_SECONDS);
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
    startCountdown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCountdown]);

  const canResend = secondsRemaining <= 0 && !isResending;

  const resend = useCallback(async () => {
    if (!email || !canResend) return;
    setResendError(null);
    setIsResending(true);
    try {
      await authService.resendVerificationEmail({ email });
      startCountdown();
    } catch (error) {
      const apiError = error as AuthApiError;
      setResendError(
        apiError.message ?? "Unable to resend the email. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  }, [email, canResend, startCountdown]);

  return {
    secondsRemaining,
    canResend,
    isResending,
    resendError,
    resend,
  };
}