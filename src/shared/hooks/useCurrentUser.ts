/**
 * TODO(auth-integration): replace with the real session hook from
 * features/auth once its public API is confirmed (e.g. a
 * `useAuthUser()` hook or a shared/stores/auth.store.ts selector).
 * Every consumer here only needs this shape — keep it stable until
 * the real hook is wired in, then this file can just re-export it.
 */
export interface CurrentUser {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
}

const MOCK_CURRENT_USER: CurrentUser = {
  id: 'u-arjun-sharma',
  name: 'Arjun Sharma',
  initials: 'AV',
  avatarColor: 'bg-primary',
};

export function useCurrentUser(): CurrentUser {
  // TODO(auth-integration): source from real session/auth state.
  return MOCK_CURRENT_USER;
}