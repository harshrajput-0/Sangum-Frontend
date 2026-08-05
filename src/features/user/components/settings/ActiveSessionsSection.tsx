import { Card, ComingSoonBadge } from "@/shared/components/ui";
import { SessionRow } from "./SessionRow";
import type { SessionInfo } from "../../types/profile.types";

export interface ActiveSessionsSectionProps {
  sessions: SessionInfo[];
  isLoading: boolean;
  signingOutId: string | null;
  onSignOut: (sessionId: string) => void;
}

export function ActiveSessionsSection({
  sessions,
  isLoading,
  signingOutId,
  onSignOut,
}: ActiveSessionsSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-text">Active Sessions</h2>
        <ComingSoonBadge />
      </div>
      <div className="mt-3">
        {isLoading ? (
          <p className="text-sm text-text-muted">Loading sessions…</p>
        ) : (
          sessions.map((session) => (
            <SessionRow
              key={session.id}
              session={session}
              isSigningOut={signingOutId === session.id}
              onSignOut={() => onSignOut(session.id)}
            />
          ))
        )}
      </div>
    </Card>
  );
}
