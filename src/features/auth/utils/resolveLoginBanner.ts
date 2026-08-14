export interface LoginBanner {
  type: "success" | "error";
  message: string;
}

interface ResolveLoginBannerParams {
  verified?: string;
  error?: string;
}

/**
 * Covers every redirect the backend sends to /login:
 *   ?verified=true                          — email verify link succeeded
 *   ?verified=false&error=expired_or_invalid — email verify link failed
 *   ?error=oauth_failed                     — OAuth provider flow failed
 *   ?error=invalid_state                    — OAuth CSRF-state mismatch
 */
export function resolveLoginBanner({
  verified,
  error,
}: ResolveLoginBannerParams): LoginBanner | null {
  if (verified === "true") {
    return { type: "success", message: "Your email is verified — you can log in now." };
  }
  if (verified === "false" || error === "expired_or_invalid") {
    return {
      type: "error",
      message: "That verification link is invalid or has expired. Log in and request a new one.",
    };
  }
  if (error === "oauth_failed") {
    return {
      type: "error",
      message: "We couldn't complete sign-in with that provider. Please try again.",
    };
  }
  if (error === "invalid_state") {
    return {
      type: "error",
      message: "Your sign-in session expired before finishing. Please try again.",
    };
  }
  return null;
}