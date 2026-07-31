import { BadgeCheck } from "lucide-react";
import { Avatar, JoinButton } from "@/modules/communities/shared/components/ui";
import { CommunitySummaryCard } from "../types";

interface CommunityListItemProps {
  community: CommunitySummaryCard;
  onToggleJoin: (id: string) => void;
  onClick?: (id: string) => void;
}

export function CommunityListItem({ community, onToggleJoin, onClick }: CommunityListItemProps) {
  return (
    <div
      onClick={() => onClick?.(community.id)}
      className="flex cursor-pointer items-center gap-3.5 rounded-xl border border-border bg-surface p-3.5 transition-all hover:border-border-strong hover:shadow-md sm:p-4"
    >
      <Avatar
        label={community.avatarLabel}
        imageUrl={community.avatarImageUrl}
        shape="square"
        tone="success"
        size="lg"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-text">{community.name}</span>
          {community.isVerified && <BadgeCheck size={14} className="text-info" />}
        </div>
        <p className="truncate text-xs text-text-secondary">{community.description}</p>
        <p className="text-xs text-text-muted">{community.memberCountLabel}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <JoinButton isJoined={community.isJoined} onToggle={() => onToggleJoin(community.id)} />
      </div>
    </div>
  );
}