import type { RefObject } from "react";
import { Badge } from "@/shared/components/ui";
import { ProfileActionArea } from "./ProfileActionArea";
import { ProfileMetaRow } from "./ProfileMetaRow";
import { ProfileSocialLinks } from "./ProfileSocialLinks";
import type { ConnectionStatus, ProfileData } from "../../types/profile.types";

export interface IdentityCardProps {
  profile: ProfileData;
  connectionStatus: ConnectionStatus;
  isMenuOpen: boolean;
  isActionBusy: boolean;
  menuRef: RefObject<HTMLDivElement>;
  onToggleMenu: () => void;
  onConnect: () => void;
  onCancelRequest: () => void;
  onAccept: () => void;
  onDecline: () => void;
  onRemove: () => void;
  onBlock: () => void;
  onReport: () => void;
  onEditProfile: () => void;
}

export function IdentityCard({
  profile,
  connectionStatus,
  isMenuOpen,
  isActionBusy,
  menuRef,
  onToggleMenu,
  onConnect,
  onCancelRequest,
  onAccept,
  onDecline,
  onRemove,
  onBlock,
  onReport,
  onEditProfile,
}: IdentityCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-xs">
      <div
        className="h-40 w-full bg-cover bg-center sm:h-52"
        style={{
          backgroundImage: profile.coverUrl
            ? `url(${profile.coverUrl})`
            : "var(--brand-gradient-cover)",
        }}
      />

      <div className="px-5 pb-5">
        <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-surface bg-surface-hover">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-text-secondary">
                {profile.fullName.charAt(0)}
              </div>
            )}
          </div>

          <ProfileActionArea
            connectionStatus={connectionStatus}
            isMenuOpen={isMenuOpen}
            isBusy={isActionBusy}
            menuRef={menuRef}
            onToggleMenu={onToggleMenu}
            onConnect={onConnect}
            onCancelRequest={onCancelRequest}
            onAccept={onAccept}
            onDecline={onDecline}
            onRemove={onRemove}
            onBlock={onBlock}
            onReport={onReport}
            onEditProfile={onEditProfile}
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-xl font-semibold text-text">
              {profile.fullName}
            </h1>
            {profile.verified && <Badge tone="info">Verified</Badge>}
          </div>

          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-text-muted">
            @{profile.username}
            {profile.roleBadge && (
              <>
                <span>&middot;</span>
                <Badge tone="primary">{profile.roleBadge}</Badge>
              </>
            )}
          </p>

          {(profile.professionalTitle || profile.company) && (
            <p className="mt-2 text-sm text-text-secondary">
              {profile.professionalTitle}
              {profile.professionalTitle && profile.company ? " at " : ""}
              {profile.company}
            </p>
          )}

          {profile.bio && (
            <p className="mt-3 text-sm leading-relaxed text-text">{profile.bio}</p>
          )}

          <ProfileMetaRow profile={profile} className="mt-3" />
          <ProfileSocialLinks links={profile.socialLinks} className="mt-3" />
        </div>
      </div>
    </div>
  );
}
