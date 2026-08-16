'use client';

import { useCallback, useState } from 'react';
import { resendVerification } from '../services/onboarding.service';
import { useResendCountdown } from './useResendCountdown';
import { RESEND_COOLDOWN_SECONDS } from '../constants/onboarding.constants';
import type { ApiError } from '@/shared/types/apiResponse.types';

interface UseVerifyNudgeArgs {
  onSkip: () => void;
}

type VerifyView = 'nudge' | 'check-inbox';

export function useVerifyNudge({ onSkip }: UseVerifyNudgeArgs) {
  const [view, setView] = useState<VerifyView>('nudge');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { secondsLeft, isActive, start } = useResendCountdown(RESEND_COOLDOWN_SECONDS);

  const sendVerification = useCallback(async () => {
    setIsSending(true);
    setError(null);
    try {
      await resendVerification();
      setView('check-inbox');
      start();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message ?? 'Could not send verification email. Please try again.');
    } finally {
      setIsSending(false);
    }
  }, [start]);

  const onVerifyClick = useCallback(() => {
    void sendVerification();
  }, [sendVerification]);

  const onResendClick = useCallback(() => {
    if (isActive) return;
    void sendVerification();
  }, [isActive, sendVerification]);

  const onSkipClick = useCallback(() => {
    // No API call — isVerified never changes here, so this is pure
    // local view state, not a flag mutation.
    onSkip();
  }, [onSkip]);

  return {
    view,
    isSending,
    error,
    secondsLeft,
    isResendActive: isActive,
    onVerifyClick,
    onResendClick,
    onSkipClick,
  };
}
