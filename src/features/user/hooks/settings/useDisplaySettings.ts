import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface UseDisplaySettingsResult {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

/**
 * TODO(integration): the project already has a shared theme store + useTheme
 * hook (Zustand-backed, applies [data-theme] on <html>). Point this hook at
 * that shared implementation instead of the local placeholder below —
 * I don't have its exact import path, so I didn't guess at one and risk
 * breaking the build.
 */
export function useDisplaySettings(): UseDisplaySettingsResult {
  const [theme, setThemeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => setThemeState(mode), []);

  return { theme, setTheme };
}
