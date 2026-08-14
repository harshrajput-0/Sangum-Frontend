import { publicRequest } from "./http";
import { getSessionSnapshot, useSessionStore } from "../stores/session.store";
import type { ApiError } from "../types/apiResponse.types";

interface RefreshTokenResponse {
  accessToken: string;
}

// Coalesces concurrent 401s into a single refresh-token call instead of
// firing one per failed request.
let refreshInFlight: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  if (!refreshInFlight) {
    refreshInFlight = publicRequest<RefreshTokenResponse>("/auth/refresh-token", {
      method: "POST",
    })
      .then(({ accessToken }) => {
        useSessionStore.getState().setAccessToken(accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

/**
 * Request helper for endpoints that require `Authorization: Bearer`
 * (logout, resend-verification, complete-email, and anything future
 * features add). On a 401 it tries refresh-token once and retries the
 * original call; if that also fails it clears the session and sends
 * the browser to /login — the doc's recommended pattern, "don't loop,
 * one retry only."
 */
export async function authedRequest<T>(
  path: string,
  options: RequestInit = {},
  { isRetry = false }: { isRetry?: boolean } = {},
): Promise<T> {
  const { accessToken } = getSessionSnapshot();

  try {
    return await publicRequest<T>(path, {
      ...options,
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    const apiError = error as ApiError;

    if (apiError.statusCode === 401 && !isRetry) {
      try {
        await refreshAccessToken();
        return await authedRequest<T>(path, options, { isRetry: true });
      } catch {
        useSessionStore.getState().clearSession();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    throw apiError;
  }
}