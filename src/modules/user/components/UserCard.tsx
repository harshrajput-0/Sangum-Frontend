// modules/users/components/UserCard.tsx

import { UserAvatar } from "./UserAvatar";
import { RoleBadge, type UserRole } from "./UserBadge";
import { FollowButton } from "./FollowButton";
import type { UserStatus } from "./OnlineIndicator";
import { cn } from "@/shared/utils/cn";

export interface UserCardData {
  displayName: string;
  username: string;
  avatarUrl?: string;
  /** Short one-liner shown next to the username, e.g. a title or tagline. */
  bio?: string;
  status?: UserStatus;
  role?: UserRole;
}

export interface UserCardProps {
  user: UserCardData;
  isFollowing?: boolean;
  onFollowToggle?: (next: boolean) => void;
  hideFollowButton?: boolean;
  className?: string;
}

/** A single row: avatar, name + role badge, @username + bio, follow button. */
export function UserCard({ user, isFollowing = false, onFollowToggle, hideFollowButton, className }: UserCardProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-3 min-w-0">
        <UserAvatar
          displayName={user.displayName}
          username={user.username}
          avatarUrl={user.avatarUrl}
          status={user.status}
          size="md"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-(length:--fs-sm) font-semibold text-text truncate">
              {user.displayName}
            </span>
            {user.role && <RoleBadge role={user.role} size="xs" />}
          </div>
          <p className="text-(length:--fs-xs) text-text-muted truncate">
            @{user.username}
            {user.bio ? ` · ${user.bio}` : ""}
          </p>
        </div>
      </div>

      {!hideFollowButton && <FollowButton isFollowing={isFollowing} onToggle={onFollowToggle} size="sm" />}
    </div>
  );
}
