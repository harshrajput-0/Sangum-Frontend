'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseResendCountdown {
  secondsLeft: number;
  isActive: boolean;
  start: () => void;
}

// Generic on purpose — no onboarding-specific knowledge. Could graduate
// to shared/ later if another feature needs a countdown, but stays local
// until that's actually true.
export function useResendCountdown(durationSeconds: number): UseResendCountdown {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    setSecondsLeft(durationSeconds);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clear, durationSeconds]);

  useEffect(() => clear, [clear]);

  return { secondsLeft, isActive: secondsLeft > 0, start };
}
