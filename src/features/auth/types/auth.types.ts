export type SocialProvider = "google" | "github" | "linkedin";

// Canonical user shape now lives in shared/types/user.types.ts — any
// authed feature reads it, not just auth. Re-exported here so existing
// imports inside this feature don't all need to change paths.
export type { AuthUser } from "@/shared/types/user.types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  // Backend only requires email + password; if these are omitted it
  // auto-generates a username and leaves displayName unset. The
  // Register form still collects both, so we send them when present —
  // this is a resilience fallback, not a UI simplification.
  fullName?: string;
  username?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface CompleteEmailPayload {
  email: string;
}

// The request helpers in shared/lib/http.ts and apiClient.ts already
// throw this exact shape — re-exported under the old name so existing
// imports inside this feature keep working.
export type { ApiError as AuthApiError } from "@/shared/types/apiResponse.types";