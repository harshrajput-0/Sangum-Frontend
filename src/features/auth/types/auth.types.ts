export type SocialProvider = "google" | "github" | "linkedin";

export interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface LoginPayload {
  identifier: string; // email or username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface ResendVerificationPayload {
  email: string;
}

/**
 * Normalized shape every auth.service.ts method throws/rejects with,
 * so hooks can render field-level and form-level errors consistently.
 */
export interface AuthApiError {
  message: string;
  fieldErrors?: Partial<Record<string, string>>;
}