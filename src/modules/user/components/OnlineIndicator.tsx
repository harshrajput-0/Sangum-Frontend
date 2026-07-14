// modules/users/components/OnlineIndicator.tsx

import { cn } from "@/shared/utils/cn";

export type UserStatus = "online" | "away" | "busy" | "offline";

export interface OnlineIndicatorProps {
  status: UserStatus;
  /** Diameter in px. Defaults to 10 (matches the base UserAvatar size). */
  size?: number;
  /** Draws a ring around the dot so it "cuts out" of whatever it sits on. */
  ring?: boolean;
  /** Color of the ring — set this to match the surface the dot sits on. */
  ringColor?: string;
  className?: string;
}

// Color Variables for Status
const STATUS_COLOR: Record<UserStatus, string> = {
  online: "var(--success)",
  away: "var(--warning)",
  busy: "var(--danger)",
  offline: "var(--neutral)",
};

// User Status
// eslint-disable-next-line react-refresh/only-export-components
export const STATUS_LABEL: Record<UserStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};

// Colored Dot (Abosolutely Positioned on User Profile/Avatar) 
export function OnlineIndicator({
  status,
  size = 10,
  ring = true,
  ringColor = "var(--surface)",
  className,
}: OnlineIndicatorProps) {
  return (
    <span
      role="status"
      aria-label={STATUS_LABEL[status]}
      title={STATUS_LABEL[status]}
      className={cn("inline-block rounded-full shrink-0", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: STATUS_COLOR[status],
        boxShadow: ring ? `0 0 0 2px ${ringColor}` : undefined,
      }}
    />
  );
}

/** Dot + text label, e.g. for a settings row or a profile page ("● Online"). */
export function OnlineIndicatorLabel({
  status,
  className,
}: {
  status: UserStatus;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <OnlineIndicator status={status} size={8} ring={false} />
      <span className="text-(length:--fs-sm) text-text-secondary">
        {STATUS_LABEL[status]}
      </span>
    </span>
  );
}
