import { useCallback, useEffect, useState } from "react";
import {
  connectProvider,
  fetchConnectedAccounts,
} from "../../services/settings.service";
import type {
  ConnectedProvider,
  ConnectedProviderId,
} from "../../types/profile.types";

export interface UseConnectedAccountsResult {
  providers: ConnectedProvider[];
  isLoading: boolean;
  connectingId: ConnectedProviderId | null;
  connect: (providerId: ConnectedProviderId) => void;
}

export function useConnectedAccounts(): UseConnectedAccountsResult {
  const [providers, setProviders] = useState<ConnectedProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectingId, setConnectingId] = useState<ConnectedProviderId | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchConnectedAccounts()
      .then((data) => {
        if (!cancelled) setProviders(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const connect = useCallback((providerId: ConnectedProviderId) => {
    setConnectingId(providerId);
    connectProvider(providerId)
      .then(() => {
        setProviders((prev) =>
          prev.map((p) => (p.id === providerId ? { ...p, connected: true } : p)),
        );
      })
      .finally(() => setConnectingId(null));
  }, []);

  return { providers, isLoading, connectingId, connect };
}
