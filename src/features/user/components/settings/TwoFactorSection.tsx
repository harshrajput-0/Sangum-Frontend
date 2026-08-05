import { Card, ComingSoonBadge, ToggleSwitch } from "@/shared/components/ui";


export interface TwoFactorSectionProps {
  enabled: boolean;
  isLoading: boolean;
  onToggle: (enabled: boolean) => void;
}

export function TwoFactorSection({ enabled, isLoading, onToggle }: TwoFactorSectionProps) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text">Two-Factor Authentication</h2>
            <ComingSoonBadge />
          </div>
          <p className="mt-1 text-xs text-text-muted">
            Add an extra layer of security to your account.
          </p>
        </div>
        <ToggleSwitch
          checked={enabled}
          onChange={onToggle}
          disabled={isLoading}
          label="Two-factor authentication"
        />
      </div>
    </Card>
  );
}
