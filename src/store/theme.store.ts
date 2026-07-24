import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'theme'


export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",   // Same initial value on server and client

    hydrateTheme: () => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const theme = stored === "light" || stored === "dark" ? stored : "dark";

    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const next: Theme = state.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem(STORAGE_KEY, next)
      return { theme: next }
    }),
}))