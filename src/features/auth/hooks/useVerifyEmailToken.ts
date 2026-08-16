import { useCallback, useState } from "react";
import { authService } from "../services/auth.service";
import type { AuthApiError } from "../types/auth.types";

export type VerifyEmailTokenStatus = "idle" | "verifying" | "success" | "error";

/**
 * @param token - the verification JWT, read server-side from the dynamic
 * route segment in app/(auth)/verify-email/[token]/page.tsx and passed
 * down as a plain prop through VerifyEmailTokenShell.
 *
 * Deliberately does NOT verify on mount. Some mail clients and corporate
 * security scanners pre-fetch every link in an email, which would burn a
 * GET-and-verify-on-load link before the user ever saw it — so this only
 * fires the (mutating) POST when the user explicitly clicks the button.
 */
export function useVerifyEmailToken(token: string) {
  const [status, setStatus] = useState<VerifyEmailTokenStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async () => {
    if (status === "verifying" || status === "success") return;

    setStatus("verifying");
    setError(null);
    try {
      await authService.verifyEmail(token);
      setStatus("success");
    } catch (err) {
      const apiError = err as AuthApiError;
      setError(
        apiError.message ?? "This verification link is invalid or has expired.",
      );
      setStatus("error");
    }
  }, [token, status]);

  return { status, error, verify };
}
