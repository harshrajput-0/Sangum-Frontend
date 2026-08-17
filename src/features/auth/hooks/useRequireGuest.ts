'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/shared/stores/session.store';
import { resolveOnboardingRoute } from '../utils/resolveOnboardingRoute';

/**
 * For (auth) route-group pages only. Relies on SessionBootstrap
 * already having resolved `status` before this ever renders — so
 * 'idle'/'loading' isn't a case this hook needs to handle, only the
 * two settled outcomes.
 *
 * Returns `isAllowed`: false while an authenticated user's redirect
 * is in flight, so the caller can render nothing instead of flashing
 * the login/register form for a tick before navigating away.
 */
export function useRequireGuest() {
  const router = useRouter();
  const status = useSessionStore((s) => s.status);
  const user = useSessionStore((s) => s.user);

  useEffect(() => {
    if (status === 'authenticated' && user) {
      router.replace(resolveOnboardingRoute(user));
    }
  }, [status, user, router]);

  const isAllowed = status !== 'authenticated';
  return { isAllowed };
}
