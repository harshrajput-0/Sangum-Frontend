import { Card, ComingSoonBadge, ToggleSwitch } from "@/shared/components/ui";

export interface LoginAlertsSectionProps {
  enabled: boolean;
  isLoading: boolean;
  onToggle: (enabled: boolean) => void;
}

export function LoginAlertsSection({ enabled, isLoading, onToggle }: LoginAlertsSectionProps) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-text">Login Alerts</h2>
            <ComingSoonBadge />
          </div>
          <p className="mt-1 text-xs text-text-muted">
            Get notified of new sign-ins to your account.
          </p>
        </div>
        <ToggleSwitch
          checked={enabled}
          onChange={onToggle}
          disabled={isLoading}
          label="Login alerts"
        />
      </div>
    </Card>
  );
}
