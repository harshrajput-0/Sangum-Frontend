'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Generic "flash a confirmation state, then revert" hook.
 * Used for: Report -> "Reported" (~700ms), Copy link -> "Copied!" (~1600ms).
 * Not tied to any feature — consumed by both features/posts and
 * shared/comments as of this batch, so it lives here rather than
 * being duplicated per-feature.
 */
export function useTransientState(durationMs: number) {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = useCallback(() => {
    setIsActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsActive(false), durationMs);
  }, [durationMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isActive, activate } as const;
}