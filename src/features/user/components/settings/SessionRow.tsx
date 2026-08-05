import { Laptop } from "lucide-react";
import { Button } from "@/shared/components/ui";
import type { SessionInfo } from "../../types/profile.types";

export interface SessionRowProps {
  session: SessionInfo;
  isSigningOut: boolean;
  onSignOut: () => void;
}

export function SessionRow({ session, isSigningOut, onSignOut }: SessionRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <Laptop size={18} className="text-text-muted" />
        <div>
          <p className="text-sm text-text">
            {session.deviceLabel}
            {session.isCurrentDevice && (
              <span className="ml-2 text-xs text-success">This device</span>
            )}
          </p>
          <p className="text-xs text-text-muted">
            {session.locationLabel} · {session.lastActiveLabel}
          </p>
        </div>
      </div>
      {!session.isCurrentDevice && (
        <Button variant="outline" size="sm" onClick={onSignOut} disabled={isSigningOut}>
          {isSigningOut ? "Signing out…" : "Sign out"}
        </Button>
      )}
    </div>
  );
}
