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
}