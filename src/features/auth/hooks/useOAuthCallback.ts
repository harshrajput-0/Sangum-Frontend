'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/shared/stores/session.store";
import { resolveOnboardingRoute } from "../utils/resolveOnboardingRoute";

/**
 * Runs once on mount at /oauth/callback. No access token or user data
 * is ever in this redirect by design — the backend sets the refresh
 * cookie during its own OAuth redirect chain (see
 * auth.controller.ts's oauthCallback), then sends the browser here
 * with nothing but the visit itself.
 *
 * This used to independently call authService.refresh() + a "get
 * current user" endpoint here — that's now redundant and has been
 * removed. SessionBootstrap (mounted once at the app root) already
 * runs refresh() + getCurrentUser() on every page load, INCLUDING
 * this one, and blocks all rendering until session `status` resolves
 * to 'authenticated' | 'unauthenticated'. By the time this component
 * mounts, the session has already been established or failed — this
 * hook just reads that outcome and routes accordingly, instead of
 * redoing the same two network calls a second time.
 *
 * This also closes the original bug this hook had: `user` used to be
 * read from the store immediately after refresh() with no guarantee
 * it had ever been populated (nothing set it), so this always fell
 * through to a hardcoded /onboarding redirect regardless of the
 * account's real state. Now `user` is guaranteed non-null whenever
 * `status === 'authenticated'`, since SessionBootstrap only sets that
 * status alongside a real user via setSession().
 */
export function useOAuthCallback() {
  const router = useRouter();
  const status = useSessionStore((s) => s.status);
  const user = useSessionStore((s) => s.user);

  useEffect(() => {
    if (status === 'authenticated' && user) {
      router.replace(resolveOnboardingRoute(user));
    }
    // 'unauthenticated' is left for the component to render as a
    // visible error below, rather than silently bouncing back to
    // /login — the backend only redirects here after OAuth already
    // succeeded server-side, so this outcome means the session itself
    // failed to establish (e.g. the refresh cookie didn't arrive, or
    // GET /auth/me failed), which is worth surfacing, not hiding.
  }, [status, user, router]);

  const isError = status === 'unauthenticated';
  return { isError };
}