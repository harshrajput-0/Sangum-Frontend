/**
 * Mirrors the backend's `user` object (see auth-api-reference.md §2),
 * normalized at the service boundary: raw `_id` becomes `id`, everything
 * else is passed through as-is.
 */
export interface AuthUser {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string | null;
  role: string;
  isProfileComplete: boolean;
  isVerified: boolean;
  hasEmail: boolean;
  // null (not just missing) whenever the account genuinely has no
  // email yet — e.g. an OAuth-first account that hasn't completed the
  // /complete-email step. Check hasEmail if you just need a boolean.
  email: string | null;
}