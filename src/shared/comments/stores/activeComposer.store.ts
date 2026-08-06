import { create } from 'zustand';

interface ActiveComposerState {
  activeComposerId: string | null;
  setActive: (id: string) => void;
  clear: (id: string) => void;
}

/**
 * Mirrors the mockup's global `activeComposerId` variable: only one
 * comment/reply composer stays open across the ENTIRE page at a
 * time — opening a new one closes whichever was previously active,
 * even on a different post's comment section.
 */
export const useActiveComposerStore = create<ActiveComposerState>((set) => ({
  activeComposerId: null,
  setActive: (id) => set({ activeComposerId: id }),
  clear: (id) => set((state) => (state.activeComposerId === id ? { activeComposerId: null } : state)),
}));