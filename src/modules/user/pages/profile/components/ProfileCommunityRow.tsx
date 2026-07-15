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
        "flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3.5",
        onClick && "cursor-pointer hover:bg-[var(--surface-hover)] transition-colors duration-150",
        className
      )}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-[13px] font-semibold text-[var(--text-on-brand)] flex-shrink-0"
        style={{ backgroundColor: community.color ?? "var(--brand-purple)" }}
      >
        {community.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[length:var(--fs-sm)] font-semibold text-[var(--text)] truncate">{community.name}</p>
        <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)] truncate">{community.memberCountLabel} members</p>
      </div>
      {community.role && (
        <span className="flex-shrink-0 rounded-full bg-[var(--surface-2)] border border-[var(--border)] px-2.5 py-1 text-[length:var(--fs-xs)] font-medium text-[var(--text-secondary)]">
          {ROLE_LABEL[community.role]}
        </span>
      )}
    </div>
  );
}
