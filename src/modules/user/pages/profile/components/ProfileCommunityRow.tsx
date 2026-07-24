// modules/profile/components/ProfileCommunityRow.tsx

import { cn } from "@/shared/utils/cn";

export type ProfileCommunityRole = "member" | "moderator" | "admin";

export interface ProfileCommunityData {
  id: string;
  name: string;
  slug: string;
  initials: string;
  color?: string;
  memberCountLabel: string;
  role?: ProfileCommunityRole;
}

export interface ProfileCommunityRowProps {
  community: ProfileCommunityData;
  onClick?: (community: ProfileCommunityData) => void;
  className?: string;
}

const ROLE_LABEL: Record<ProfileCommunityRole, string> = { admin: "Admin", moderator: "Moderator", member: "Member" };

/** One row in the profile's Communities tab — colored tile, name, member count, and an optional role pill. */
export function ProfileCommunityRow({ community, onClick, className }: ProfileCommunityRowProps) {
  return (
    <div
      onClick={onClick ? () => onClick(community) : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-surface p-3.5",
        onClick && "cursor-pointer hover:bg-surface-hover transition-colors duration-150",
        className
      )}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-md text-[13px] font-semibold text-(--text-on-brand) shrink-0"
        style={{ backgroundColor: community.color ?? "var(--brand-purple)" }}
      >
        {community.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-(length:--fs-sm) font-semibold text-text truncate">{community.name}</p>
        <p className="text-(length:--fs-xs) text-text-muted truncate">{community.memberCountLabel} members</p>
      </div>
      {community.role && (
        <span className="shrink-0 rounded-full bg-(--surface-2) border border-border px-2.5 py-1 text-(length:--fs-xs) font-medium text-text-secondary">
          {ROLE_LABEL[community.role]}
        </span>
      )}
    </div>
  );
}
