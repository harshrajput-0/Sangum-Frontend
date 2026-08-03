import { BadgeCheck } from "lucide-react";
import { Avatar, GradientBanner, JoinButton } from "../../shared/components/ui";
import { CommunitySummary } from "../types";

interface CommunityHeaderProps {
  community: CommunitySummary;
  onToggleJoin: () => void;
}

export function CommunityHeader({ community, onToggleJoin }: CommunityHeaderProps) {
  return (
    <div>
      <GradientBanner height="md" gradientClassName="from-primary via-info to-accent" />
      <div className="px-4 sm:px-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-end gap-3">
            <Avatar
              label={community.avatarLabel}
              imageUrl={community.avatarImageUrl}
              shape="square"
              tone="success"
              size="xl"
              className="-mt-9 ring-4 ring-surface"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-semibold text-text sm:text-lg">
                  {community.name}
                </span>
                {community.isVerified && <BadgeCheck size={16} className="text-info" />}
              </div>
              <p className="text-xs text-text-muted">
                {community.memberCountLabel}
                {community.onlineCountLabel ? ` · ${community.onlineCountLabel}` : ""}
              </p>
            </div>
          </div>
          <JoinButton isJoined={community.isJoined} onToggle={onToggleJoin} />
        </div>
      </div>
    </div>
  );
}