import { create } from "zustand";
import type { AuthUser } from "../types/user.types";

interface SessionState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (accessToken: string, user: AuthUser) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  setSession: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  clearSession: () => set({ accessToken: null, user: null, isAuthenticated: false }),
}));

/**
 * Non-hook accessor for use outside React components — namely
 * shared/lib/apiClient.ts, which can't call hooks but still needs to
 * read/update the current access token.
 */
export function getSessionSnapshot() {
  return useSessionStore.getState();
}