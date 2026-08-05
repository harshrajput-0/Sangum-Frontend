import { useCallback, useEffect, useState } from "react";
import { fetchActiveSessions, signOutSession } from "../../services/settings.service";
import type { SessionInfo } from "../../types/profile.types";

export interface UseSessionsResult {
  sessions: SessionInfo[];
  isLoading: boolean;
  signingOutId: string | null;
  signOut: (sessionId: string) => void;
}

export function useSessions(): UseSessionsResult {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signingOutId, setSigningOutId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchActiveSessions()
      .then((data) => {
        if (!cancelled) setSessions(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = useCallback((sessionId: string) => {
    setSigningOutId(sessionId);
    signOutSession(sessionId)
      .then(() => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      })
      .finally(() => setSigningOutId(null));
  }, []);

  return { sessions, isLoading, signingOutId, signOut };
}
