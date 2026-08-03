import { BadgeCheck } from "lucide-react";
import { Card, Avatar, GradientBanner, JoinButton } from "@/features/communities/shared/components/ui";
import { CommunitySummaryCard } from "../types";

interface FeaturedCommunityCardProps {
  community: CommunitySummaryCard;
  onToggleJoin: (id: string) => void;
  onClick?: (id: string) => void;
}

export function FeaturedCommunityCard({
  community,
  onToggleJoin,
  onClick,
}: FeaturedCommunityCardProps) {
  return (
    <Card padding="none" interactive className="cursor-pointer overflow-hidden">
      <div onClick={() => onClick?.(community.id)}>
        <GradientBanner height="sm" gradientClassName={community.bannerGradientClassName} />
        <div className="p-4">
          <Avatar
            label={community.avatarLabel}
            imageUrl={community.avatarImageUrl}
            shape="square"
            tone="success"
            size="lg"
            className="-mt-8 mb-2.5 ring-4 ring-surface"
          />
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="text-sm font-semibold text-text">{community.name}</span>
            {community.isVerified && <BadgeCheck size={14} className="text-info" />}
          </div>
          <p className="mb-3 line-clamp-2 text-xs text-text-secondary">{community.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">{community.memberCountLabel}</span>
            <div onClick={(e) => e.stopPropagation()}>
              <JoinButton
                isJoined={community.isJoined}
                onToggle={() => onToggleJoin(community.id)}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}