import type {
  AuthApiError,
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResendVerificationPayload,
  ResetPasswordPayload,
  SocialProvider,
} from "../types/auth.types";

const AUTH_API_BASE = "/api/auth";

/**
 * Shared fetch wrapper. Assumes the backend sets the session via an
 * httpOnly cookie (credentials: "include") rather than returning a
 * token for client-side storage. Swap this if your backend does
 * something different (e.g. NextAuth, a bearer token, etc.).
 */
async function request<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(`${AUTH_API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // no/invalid JSON body (e.g. a 204 response) — treated as empty
  }

  if (!response.ok) {
    const errorBody = (body ?? {}) as Partial<AuthApiError>;
    const error: AuthApiError = {
      message: errorBody.message ?? "Something went wrong. Please try again.",
      fieldErrors: errorBody.fieldErrors,
    };
    throw error;
  }

  return body as TResponse;
}

export const authService = {
  login(payload: LoginPayload): Promise<AuthUser> {
    return request<AuthUser>("/login", { body: JSON.stringify(payload) });
  },

  register(payload: RegisterPayload): Promise<{ email: string }> {
    return request<{ email: string }>("/register", {
      body: JSON.stringify(payload),
    });
  },

  requestPasswordReset(payload: ForgotPasswordPayload): Promise<void> {
    return request<void>("/forgot-password", {
      body: JSON.stringify(payload),
    });
  },

  resetPassword(payload: ResetPasswordPayload): Promise<void> {
    return request<void>("/reset-password", {
      body: JSON.stringify(payload),
    });
  },

  resendVerificationEmail(payload: ResendVerificationPayload): Promise<void> {
    return request<void>("/resend-verification", {
      body: JSON.stringify(payload),
    });
  },

  /**
   * Full-page redirect into the backend's OAuth flow — not a fetch
   * call, so it doesn't go through `request()`.
   */
  loginWithProvider(provider: SocialProvider): void {
    window.location.href = `${AUTH_API_BASE}/oauth/${provider}`;
  },
};