import { publicRequest } from "@/shared/lib/http";
import { authedRequest } from "@/shared/lib/apiClient";
import { useSessionStore } from "@/shared/stores/session.store";
import { API_BASE_URL } from "@/shared/config/env";
import type { AuthUser } from "@/shared/types/user.types";
import type { ApiError } from "@/shared/types/apiResponse.types";
import { normalizeAuthUser, type RawAuthUser } from "../lib/normalizeAuthUser";
import type {
  CompleteEmailPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SocialProvider,
} from "../types/auth.types";

interface AuthSuccessData {
  user: RawAuthUser;
  accessToken: string;
}

interface RefreshTokenData {
  accessToken: string;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthUser> {
    const { user, accessToken } = await publicRequest<AuthSuccessData>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const normalizedUser = normalizeAuthUser(user);
    useSessionStore.getState().setSession(accessToken, normalizedUser);
    return normalizedUser;
  },

  async login(payload: LoginPayload): Promise<AuthUser> {
    const { user, accessToken } = await publicRequest<AuthSuccessData>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const normalizedUser = normalizeAuthUser(user);
    useSessionStore.getState().setSession(accessToken, normalizedUser);
    return normalizedUser;
  },

  async logout(): Promise<void> {
    try {
      await authedRequest<null>("/auth/logout", { method: "POST" });
    } finally {
      // Clear local state even if the network call fails — the cookie
      // may still be gone server-side, and staying "logged in" locally
      // would be worse than a stale session.
      useSessionStore.getState().clearSession();
    }
  },

  /**
   * Silently restores a session from the refresh cookie. Called once on
   * app load, on the OAuth callback page, and internally by
   * shared/lib/apiClient.ts whenever a request comes back 401.
   */
  async refresh(): Promise<string> {
    const { accessToken } = await publicRequest<RefreshTokenData>("/auth/refresh-token", {
      method: "POST",
    });
    useSessionStore.getState().setAccessToken(accessToken);
    return accessToken;
  },

  /**
   * GET /auth/me — the "who am I" check. Requires a valid access
   * token (authedRequest), so this only makes sense right after
   * refresh() has populated one. Used by the session bootstrap on app
   * load and by the OAuth callback, both of which need the full user
   * object, not just a token.
   */
  async getCurrentUser(): Promise<AuthUser> {
    const raw = await authedRequest<RawAuthUser>("/auth/me");
    return normalizeAuthUser(raw);
  },

  async requestPasswordReset(payload: ForgotPasswordPayload): Promise<void> {
    await publicRequest<null>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async resetPassword({ token, newPassword }: ResetPasswordPayload): Promise<void> {
    // Token is a URL segment here, not a body field — see
    // auth-api-reference.md's POST /auth/reset-password/:token.
    await publicRequest<null>(`/auth/reset-password/${encodeURIComponent(token)}`, {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    });
  },

  /**
   * Public — the verification JWT itself is the credential, no session
   * needed (and often none exists, e.g. someone verifying from a link
   * clicked on a different device). Only fires when the user clicks
   * "Verify email" on the token page, never automatically on load.
   */
  async verifyEmail(token: string): Promise<void> {
    await publicRequest<null>(`/auth/verify-email/${encodeURIComponent(token)}`, {
      method: "POST",
    });

    // Unlike completeEmail, a missing session here is expected, not
    // an error — verifying often happens from a link clicked on a
    // different device/browser than the one that's actually logged
    // in. When there IS a live session in this tab, patch it
    // immediately so resolveOnboardingRoute() stops sending this tab
    // back to /verify-email on its next call (register/login/guard
    // redirects) — this was the root cause of "Continue to log in"
    // bouncing back to /verify-email instead of proceeding.
    const currentUser = useSessionStore.getState().user;
    if (currentUser) {
      useSessionStore.getState().setUser({ ...currentUser, isVerified: true });
    }
  },

  async resendVerificationEmail(): Promise<void> {
    // Authed — the backend reads the account off the access token,
    // no email argument needed (or possible) here.
    await authedRequest<null>("/auth/resend-verification", { method: "POST" });
  },

  async completeEmail(payload: CompleteEmailPayload): Promise<AuthUser> {
    await authedRequest<null>("/auth/complete-email", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    // The endpoint doesn't hand back a fresh user object, so patch the
    // session's local copy so `hasEmail` flips immediately and
    // resolveOnboardingRoute() re-evaluates correctly on the next call.
    const currentUser = useSessionStore.getState().user;
    if (!currentUser) {
      const error: ApiError = {
        statusCode: 401,
        message: "Your session expired. Please log in again.",
        errors: [],
      };
      throw error;
    }

    const updatedUser: AuthUser = { ...currentUser, hasEmail: true };
    useSessionStore.getState().setUser(updatedUser);
    return updatedUser;
  },

  /**
   * Full-page redirect into the backend's OAuth flow — not a fetch
   * call, so it doesn't go through the request helpers at all.
   */
  loginWithProvider(provider: SocialProvider): void {
    window.location.href = `${API_BASE_URL}/auth/oauth/${provider}`;
  },
};