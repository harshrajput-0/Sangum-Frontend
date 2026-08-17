import { create } from "zustand";
import type { AuthUser } from "../types/user.types";

/**
 * 'idle': bootstrap hasn't run yet (or hasn't been mounted — e.g. in
 * tests). 'loading': the once-on-mount session check is in flight.
 * Route guards must treat 'idle' | 'loading' as "don't know yet, don't
 * redirect" — only 'authenticated' | 'unauthenticated' are safe to act
 * on. See shared/hooks/useSessionBootstrap.ts.
 */
export type SessionStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface SessionState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: SessionStatus;
  setSession: (accessToken: string, user: AuthUser) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: AuthUser) => void;
  setStatus: (status: SessionStatus) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  status: "idle",
  setSession: (accessToken, user) =>
    set({ accessToken, user, isAuthenticated: true, status: "authenticated" }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  clearSession: () =>
    set({ accessToken: null, user: null, isAuthenticated: false, status: "unauthenticated" }),
}));

/**
 * Non-hook accessor for use outside React components — namely
 * shared/lib/apiClient.ts, which can't call hooks but still needs to
 * read/update the current access token.
 */
export function getSessionSnapshot() {
  return useSessionStore.getState();
}