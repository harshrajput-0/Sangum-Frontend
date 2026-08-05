import type { ReactNode } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Card } from "@/shared/components/ui";
import { SegmentedControl } from "../primitives/SegmentedControl";
import type { ThemeMode } from "../../hooks/settings/useDisplaySettings";

export interface DisplayPreferencesSectionProps {
  theme: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun size={15} /> },
  { value: "dark", label: "Dark", icon: <Moon size={15} /> },
  { value: "system", label: "System", icon: <Monitor size={15} /> },
];

export function DisplayPreferencesSection({
  theme,
  onThemeChange,
}: DisplayPreferencesSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Display Preferences</h2>
      <p className="mt-1 text-xs text-text-muted">
        Choose how Sangum looks on this device.
      </p>
      <div className="mt-4">
        <SegmentedControl options={THEME_OPTIONS} value={theme} onChange={onThemeChange} />
      </div>
    </Card>
  );
}
