// modules/profile/components/ProfileHeader.tsx

// import React from "react";
import { UserAvatar, UserBadge, UserStats, FollowButton } from "../../../components";
import { VerifiedIcon, LocationIcon } from "../components/icon";
import { formatCompactNumber } from "@/shared/utils/fromatCompactNumber";
import { cn } from "@/shared/utils/cn";
import type { ProfileData, ProfileTab } from "../types";

export interface ProfileHeaderProps {
  profile: ProfileData;
  /** true when the viewer is looking at their own profile — shows "Edit profile" instead of Follow/Message. */
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onEditProfile?: () => void;
  onFollowToggle?: (next: boolean) => void;
  onMessage?: () => void;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  className?: string;
}

const TABS: { id: ProfileTab; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "comments", label: "Comments" },
  { id: "resources", label: "Resources" },
  { id: "communities", label: "Communities" },
];

/** The big profile card: cover photo, avatar, name/verified/role, bio, location/website/joined, stats row, and the section tabnav. */
export function ProfileHeader({
  profile,
  isOwnProfile = false,
  isFollowing = false,
  onEditProfile,
  onFollowToggle,
  onMessage,
  activeTab,
  onTabChange,
  className,
}: ProfileHeaderProps) {
  const stats = [
    { label: "Posts", value: formatCompactNumber(profile.stats.posts) },
    { label: "Comments", value: formatCompactNumber(profile.stats.comments) },
    { label: "Followers", value: formatCompactNumber(profile.stats.followers) },
    { label: "Following", value: formatCompactNumber(profile.stats.following) },
  ];

  return (
    <div className={cn("rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden", className)}>
      <div
        className="h-[160px]"
        style={{ background: profile.coverUrl ? undefined : "var(--brand-gradient-cover)" }}
      >
        {profile.coverUrl && (
          <img src={profile.coverUrl} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="px-6 pb-5">
        <div className="flex justify-between items-end mb-3.5">
          <div className="rounded-full border-4 border-[var(--surface)] -mt-11">
            <UserAvatar displayName={profile.displayName} username={profile.username} avatarUrl={profile.avatarUrl} size="2xl" href={null} />
          </div>

          {isOwnProfile ? (
            onEditProfile && (
              <button
                type="button"
                onClick={onEditProfile}
                className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3.5 py-[7px] text-[length:var(--fs-xs)] font-semibold text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
              >
                Edit profile
              </button>
            )
          ) : (
            <div className="flex gap-2">
              {onMessage && (
                <button
                  type="button"
                  onClick={onMessage}
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3.5 py-[7px] text-[length:var(--fs-xs)] font-semibold text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors duration-150"
                >
                  Message
                </button>
              )}
              <FollowButton isFollowing={isFollowing} onToggle={onFollowToggle} size="sm" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[length:var(--fs-2xl)] font-bold text-[var(--text)]">{profile.displayName}</span>
          {profile.verified && <VerifiedIcon className="w-[18px] h-[18px] text-[var(--info)]" />}
        </div>

        <p className="text-[length:var(--fs-sm)] text-[var(--text-muted)] flex items-center gap-1.5 mb-1.5">
          @{profile.username}
          {profile.roleLabel && <UserBadge label={profile.roleLabel} tone="subtle" color="purple" size="xs" />}
        </p>

        {profile.bio && <p className="text-[length:var(--fs-base)] text-[var(--text)] max-w-[560px] mb-2.5">{profile.bio}</p>}

        <div className="flex flex-wrap gap-4 text-[length:var(--fs-xs)] text-[var(--text-muted)] mb-4">
          {profile.location && (
            <span className="inline-flex items-center gap-1">
              <LocationIcon className="w-[13px] h-[13px]" />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a href={profile.website.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors duration-150">
              🔗 {profile.website.label}
            </a>
          )}
          <span>{profile.joinedLabel}</span>
        </div>

        <UserStats stats={stats} className="mb-4" />

        <div className="flex gap-5 border-b border-[var(--border)]" role="tablist">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "-mb-px pb-3 pt-1 text-[length:var(--fs-sm)] border-b-2 transition-colors duration-150",
                  active
                    ? "font-semibold text-[var(--text)] border-[var(--brand-purple)]"
                    : "font-medium text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
