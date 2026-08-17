'use client';

import { useEffect } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { useSessionStore } from '@/shared/stores/session.store';

/**
 * Runs once on app mount. This is the piece that was missing
 * everywhere: nothing previously called GET /auth/me on load, so
 * `user` stayed null after any hard page load/navigation, even with a
 * valid refresh cookie. That gap was the root cause behind three
 * separate bugs — the OAuth callback landing with a null user, the
 * "You're all set" screen looping on every local login, and
 * login/register/onboarding being reachable while already
 * authenticated. This hook is the single fix all three build on.
 *
 * No return value — consumers read status/user directly from
 * useSessionStore. Mount this once, high in the tree (see
 * shared/components/SessionBootstrap.tsx).
 */
export function useSessionBootstrap() {
  const setStatus = useSessionStore((s) => s.setStatus);
  const clearSession = useSessionStore((s) => s.clearSession);
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      setStatus('loading');
      try {
        const accessToken = await authService.refresh();
        const user = await authService.getCurrentUser();
        if (!cancelled) {
          setSession(accessToken, user);
        }
      } catch {
        // No valid refresh cookie, or /auth/me failed — either way,
        // there's no session to restore. Not an error state the user
        // needs to see; it's the expected path for a logged-out visitor.
        if (!cancelled) {
          clearSession();
        }
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
