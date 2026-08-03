/**
 * Scores a password 0-3.
 *   0 — empty
 *   1 — weak     (any non-empty value under 6 chars)
 *   2 — medium   (6+ chars)
 *   3 — strong   (10+ chars, at least one uppercase letter, at least one digit)
 *
 * Pure function — no React, no side effects. Pair with
 * constants/auth.constants.ts#PASSWORD_STRENGTH_META for display data.
 */
export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  if (password.length >= 10 && hasUpperCase && hasDigit) return 3;
  if (password.length >= 6) return 2;
  return 1;
}