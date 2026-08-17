'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/shared/stores/session.store';
import { AUTH_ROUTES } from '../constants/auth.constants';

/**
 * For (app) route-group pages and /onboarding. Same assumption as
 * useRequireGuest: SessionBootstrap has already resolved `status`
 * before this renders, so only the two settled outcomes matter here.
 *
 * Returns `isAllowed`: false while an unauthenticated visitor's
 * redirect to /login is in flight, so the caller can render nothing
 * instead of flashing protected content for a tick.
 */
export function useRequireAuth() {
  const router = useRouter();
  const status = useSessionStore((s) => s.status);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(AUTH_ROUTES.login);
    }
  }, [status, router]);

  const isAllowed = status !== 'unauthenticated';
  return { isAllowed };
}
