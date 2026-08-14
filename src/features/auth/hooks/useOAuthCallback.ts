import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { useSessionStore } from "@/shared/stores/session.store";
import { resolveOnboardingRoute } from "../utils/resolveOnboardingRoute";
import { AUTH_ROUTES } from "../constants/auth.constants";
import type { AuthApiError } from "../types/auth.types";

/**
 * Runs once on mount at /oauth/callback. No access token is ever in
 * this redirect by design — the refresh cookie was already set during
 * the backend's OAuth redirect chain, so this exchanges it for a
 * usable access token, then routes onward.
 *
 * KNOWN GAP: POST /auth/refresh-token only returns { accessToken } —
 * no user object — so there's no documented way here to check
 * hasEmail/isVerified and run the complete-email fallback. Until
 * there's an endpoint that returns the current user (e.g. GET
 * /auth/me), this routes straight to onboarding on success, matching
 * the common case (all three providers supply an email). See the
 * TODO below for where the hasEmail check needs to go once that
 * endpoint exists.
 */
export function useOAuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function completeOAuthLogin() {
      try {
        await authService.refresh();

        // TODO: once a "get current user" endpoint exists, fetch the
        // user here and use resolveOnboardingRoute(user) instead —
        // that's what actually implements the hasEmail fallback
        // check. For now this only covers the common case.
        const user = useSessionStore.getState().user;
        if (!cancelled) {
          router.replace(user ? resolveOnboardingRoute(user) : AUTH_ROUTES.onboarding);
        }
      } catch (err) {
        const apiError = err as AuthApiError;
        if (!cancelled) {
          setError(apiError.message ?? "We couldn't complete your sign-in.");
        }
      }
    }

    completeOAuthLogin();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { error };
}