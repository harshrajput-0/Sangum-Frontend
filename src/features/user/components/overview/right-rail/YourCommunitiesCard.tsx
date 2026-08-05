import { Card } from "@/shared/components/ui";
import type { CommunitySummary } from "../../../types/profile.types";

export interface YourCommunitiesCardProps {
  communities: CommunitySummary[];
}

export function YourCommunitiesCard({ communities }: YourCommunitiesCardProps) {
  if (communities.length === 0) return null;

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text">Your Communities</h3>
      <div className="mt-3 flex flex-col gap-3">
        {communities.slice(0, 4).map((community) => (
          <div key={community.id} className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-hover text-xs font-semibold text-text-secondary">
              {community.avatarInitials}
            </div>
            <span className="text-sm text-text">{community.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
