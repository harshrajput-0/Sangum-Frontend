import type { SocialProvider } from "../types/auth.types";

export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  // Dynamic segment — backend puts the token in the URL path, not a
  // query param: /reset-password/:token
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  oauthCallback: "/oauth/callback",
  completeEmail: "/complete-email",
  // TODO: not built yet — this is where a fully-set-up user
  // (hasEmail && isVerified) lands after login/register/oauth.
  onboarding: "/onboarding",
} as const;

export const PASSWORD_MIN_LENGTH = 8;

export const RESEND_COOLDOWN_SECONDS = 45;

export const SOCIAL_PROVIDERS: { id: SocialProvider; label: string }[] = [
  { id: "google", label: "Continue with Google" },
  { id: "github", label: "Continue with GitHub" },
  { id: "linkedin", label: "Continue with LinkedIn" },
];

/**
 * Display metadata keyed by the 0-3 score returned from
 * utils/passwordStrength.ts. Index 0 = empty/no input.
 */
export const PASSWORD_STRENGTH_META: Record<
  number,
  { label: string; barColorClass: string; textColorClass: string }
> = {
  0: { label: "", barColorClass: "bg-neutral-bg", textColorClass: "" },
  1: {
    label: "Weak",
    barColorClass: "bg-danger",
    textColorClass: "text-danger",
  },
  2: {
    label: "Medium",
    barColorClass: "bg-warning",
    textColorClass: "text-warning",
  },
  3: {
    label: "Strong",
    barColorClass: "bg-success",
    textColorClass: "text-success",
  },
};

export const PASSWORD_STRENGTH_BAR_COUNT = 3;