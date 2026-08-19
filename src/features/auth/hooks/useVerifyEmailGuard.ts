"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/shared/stores/session.store";
import { AUTH_ROUTES } from "../constants/auth.constants";

interface UseVerifyEmailGuardArgs {
  /**
   * True on the ACCOUNT_PENDING_VERIFICATION conflict arrival off of
   * register (see VerifyEmailShell) — that path deliberately has no
   * session, so unlike every other unauthenticated arrival it must
   * NOT be bounced to /login.
   */
  isPendingConflict?: boolean;
}

/**
 * For app/(auth)/verify-email only. Same settled-status assumption as
 * useRequireAuth/useRequireGuest — SessionBootstrap has already
 * resolved `status` before this ever renders, so 'idle'/'loading'
 * isn't a case this hook needs to act on.
 *
 * - authenticated && already verified -> nothing left to do here, send
 *   them on to /feed.
 * - unauthenticated (and not the pending-conflict arrival) -> there's
 *   no account to verify, send them to /login.
 * - everything else (authenticated-but-unverified, or the
 *   pending-conflict arrival) -> allowed, render the panel.
 *
 * Returns `isAllowed`: false while a redirect is in flight, so the
 * caller can render nothing instead of flashing the panel for a tick.
 */
export function useVerifyEmailGuard({ isPendingConflict }: UseVerifyEmailGuardArgs = {}) {
  const router = useRouter();
  const status = useSessionStore((s) => s.status);
  const user = useSessionStore((s) => s.user);

  const shouldGoToFeed = status === "authenticated" && Boolean(user?.isVerified);
  const shouldGoToLogin = status === "unauthenticated" && !isPendingConflict;

  useEffect(() => {
    if (shouldGoToFeed) {
      router.replace(AUTH_ROUTES.feed);
    } else if (shouldGoToLogin) {
      router.replace(AUTH_ROUTES.login);
    }
  }, [shouldGoToFeed, shouldGoToLogin, router]);

  const isAllowed = !shouldGoToFeed && !shouldGoToLogin;
  return { isAllowed };
}