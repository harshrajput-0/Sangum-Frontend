// modules/users/components/UserHoverCard.tsx
"use client"; // uses hover/open state — remove this line if you're not on Next.js App Router

import React, { useRef, useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { RoleBadge, type UserRole } from "./UserBadge";
import { FollowButton } from "./FollowButton";
import { UserStats, type UserStat } from "./UserStats";
import { MessageIcon } from "./icons";
import type { UserStatus } from "./OnlineIndicator";
import { cn } from "@/shared/utils/cn";

export interface UserHoverCardData {
  displayName: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserHoverCardProps {
  user: UserHoverCardData;
  stats: UserStat[];
  isFollowing?: boolean;
  onFollowToggle?: (next: boolean) => void;
  onMessage?: () => void;
  /** Trigger element. Defaults to a medium <UserAvatar> if omitted. */
  children?: React.ReactNode;
  className?: string;
}

// NOTE: this is a simple hover-driven popover with a fixed top/left position.
// For production use on real layouts (viewport edges, scroll containers,
// touch devices) consider swapping the positioning for a library like
// @floating-ui/react and adding a tap-to-open fallback for mobile.
export function UserHoverCard({ user, stats, isFollowing = false, onFollowToggle, onMessage, children, className }: UserHoverCardProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleHide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative inline-block" onMouseEnter={show} onMouseLeave={scheduleHide}>
      {children ?? (
        <UserAvatar displayName={user.displayName} username={user.username} avatarUrl={user.avatarUrl} status={user.status} size="md" />
      )}

      {open && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 top-full left-0 mt-2 w-[300px] rounded-lg border border-border bg-surface p-4 shadow-(--shadow-lg)",
            className
          )}
        >
          <div className="flex gap-3 mb-2.5">
            <UserAvatar displayName={user.displayName} username={user.username} avatarUrl={user.avatarUrl} size="lg" href={null} />
            <div className="min-w-0 pt-0.5">
              <div className="flex items-center gap-2">
                <span className="text-(length:--fs-sm) font-semibold text-text truncate">{user.displayName}</span>
                {user.role && <RoleBadge role={user.role} size="xs" />}
              </div>
              <span className="text-(length:--fs-xs) text-text-muted">@{user.username}</span>
            </div>
          </div>

          {user.bio && <p className="text-(length:--fs-sm) text-text-secondary mb-3 leading-relaxed">{user.bio}</p>}

          <UserStats stats={stats} className="mb-3.5 gap-4" />

          <div className="flex gap-2">
            <FollowButton isFollowing={isFollowing} onToggle={onFollowToggle} size="sm" fullWidth className="flex-1" />
            <button
              type="button"
              onClick={onMessage}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-[7px] rounded-sm border border-border-strong text-(length:--fs-xs) font-semibold text-text hover:bg-surface-hover transition-colors duration-150"
            >
              <MessageIcon className="w-3.5 h-3.5" />
              Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
