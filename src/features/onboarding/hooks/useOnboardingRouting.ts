'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/shared/stores/session.store';
import type { AuthUser } from '@/shared/types/user.types';
import { COMPLETE_EMAIL_FALLBACK_ROUTE } from '../constants/onboarding.constants';
import type { OnboardingScreen } from '../types/onboarding.types';

export function useOnboardingRouting() {
  const router = useRouter();
  const user = useSessionStore((s) => s.user);
  const setUser = useSessionStore((s) => s.setUser);

  // Session-only bypass — separate from any flag, since skipping doesn't
  // change isVerified. The nudge correctly reappears on a future
  // login/session.
  const [sessionSkippedVerify, setSessionSkippedVerify] = useState(false);

  // Defensive guard: OnboardingShell assumes hasEmail is already true —
  // resolveOnboardingRoute() (auth feature) is what normally sends users
  // here in that state. Someone landing on /onboarding directly (stale
  // bookmark, back button) without hasEmail gets bounced to the real
  // gate instead of the wizard rendering against an incomplete user.
  useEffect(() => {
    if (user && !user.hasEmail) {
      router.replace(COMPLETE_EMAIL_FALLBACK_ROUTE);
    }
  }, [user, router]);

  const currentScreen: OnboardingScreen = (() => {
    if (!user || !user.hasEmail) return 'wizard'; // transient — redirect above takes over
    if (!user.isProfileComplete) return 'wizard';
    if (!user.isVerified && !sessionSkippedVerify) return 'verify-nudge';
    return 'done';
  })();

  // Neither submitOnboarding nor resendVerification returns the full
  // flag set (confirmed against the backend), so there's nothing to
  // re-fetch — what changed is always knowable from the action that
  // just succeeded. Matches the exact pattern authService.completeEmail
  // already uses: read the current user, spread + patch, setUser.
  const markProfileComplete = useCallback(
    (result: { username: string; displayName: string; avatar: string | null }) => {
      if (!user) return;
      const updatedUser: AuthUser = {
        ...user,
        isProfileComplete: true,
        username: result.username,
        displayName: result.displayName,
        avatar: result.avatar,
      };
      setUser(updatedUser);
    },
    [user, setUser],
  );

  const skipVerifyForNow = useCallback(() => {
    setSessionSkippedVerify(true);
  }, []);

  return { currentScreen, user, markProfileComplete, skipVerifyForNow };
}
