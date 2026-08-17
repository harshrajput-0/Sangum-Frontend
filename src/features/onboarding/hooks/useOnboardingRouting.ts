'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/shared/stores/session.store';
import { useRequireAuth } from '@/features/auth';
import type { AuthUser } from '@/shared/types/user.types';
import { COMPLETE_EMAIL_FALLBACK_ROUTE } from '../constants/onboarding.constants';
import type { OnboardingScreen } from '../types/onboarding.types';

export function useOnboardingRouting() {
  const router = useRouter();
  const user = useSessionStore((s) => s.user);
  const setUser = useSessionStore((s) => s.setUser);

  // Closes the previous gap where an unauthenticated visitor landing
  // on /onboarding directly (no session at all) saw a blank wizard
  // with nothing ever redirecting them. isAllowed is false only while
  // that redirect to /login is in flight.
  const { isAllowed } = useRequireAuth();

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
      if (!user) {
        // Should be unreachable: useRequireAuth (above) redirects
        // unauthenticated visitors away before the wizard can ever
        // render, so `user` is guaranteed populated by the time
        // finish() can call this. This is exactly the condition that
        // caused the original "stuck on Taking you to your feed"
        // bug — silently returning here left it with no visible
        // signal at all. Logging loudly instead, so a future
        // regression of that guarantee doesn't reintroduce the same
        // silent failure.
        console.error(
          'markProfileComplete called with no session user — onboarding cannot ' +
            'complete. This should be unreachable; useRequireAuth should have ' +
            'redirected before the wizard rendered.',
        );
        return;
      }
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

  return { currentScreen, user, markProfileComplete, skipVerifyForNow, isAllowed };
}