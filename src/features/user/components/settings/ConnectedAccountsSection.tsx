import { Button, Card, ComingSoonBadge } from "@/shared/components/ui";
import type {
  ConnectedProvider,
  ConnectedProviderId,
} from "../../types/profile.types";

export interface ConnectedAccountsSectionProps {
  providers: ConnectedProvider[];
  isLoading: boolean;
  connectingId: ConnectedProviderId | null;
  onConnect: (providerId: ConnectedProviderId) => void;
}

export function ConnectedAccountsSection({
  providers,
  isLoading,
  connectingId,
  onConnect,
}: ConnectedAccountsSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-text">Connected Accounts</h2>
        <ComingSoonBadge />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {isLoading ? (
          <p className="text-sm text-text-muted">Loading connected accounts…</p>
        ) : (
          providers.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between gap-3">
              <span className="text-sm text-text">{provider.label}</span>
              {provider.connected ? (
                <span className="text-xs text-success">Connected</span>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConnect(provider.id)}
                  disabled={connectingId === provider.id}
                >
                  {connectingId === provider.id ? "Connecting…" : "Connect"}
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
