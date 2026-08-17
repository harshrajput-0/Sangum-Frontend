import { AUTH_ROUTES } from "../constants/auth.constants";
import type { AuthUser } from "@/shared/types/user.types";

/**
 * Mirrors the decision tree in auth-api-reference.md §5 exactly. This
 * is a state check, not a one-time wizard step — call it any time you
 * have a fresh `user` object (after login, register, refresh, or
 * either of the completion calls succeeding), rather than tracking
 * "which onboarding step" separately in frontend state.
 */
export function resolveOnboardingRoute(user: AuthUser): string {
  if (!user.hasEmail) {
    return AUTH_ROUTES.completeEmail;
  }
  if (!user.isProfileComplete) {
    return AUTH_ROUTES.onboarding;
  }
  if (!user.isVerified) {
    return AUTH_ROUTES.verifyEmail;
  }
  return AUTH_ROUTES.feed;
}
