import type { AuthUser } from "@/shared/types/user.types";

/**
 * Raw shape as sent by the backend (see AuthUserResponse in
 * auth.types.ts on the backend) — `_id`, not `id`. AuthUser's doc
 * comment has always claimed this gets normalized "at the service
 * boundary," but until now nothing actually did it; every call site
 * just cast the raw response straight to AuthUser. `user.id` would
 * have silently been `undefined` at runtime anywhere it was read.
 */
export interface RawAuthUser {
  _id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string | null;
  role: string;
  isProfileComplete: boolean;
  isVerified: boolean;
  hasEmail: boolean;
}

export function normalizeAuthUser(raw: RawAuthUser): AuthUser {
  const { _id, ...rest } = raw;
  return { id: _id, ...rest };
}
