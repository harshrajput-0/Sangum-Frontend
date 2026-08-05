import { Card } from "@/shared/components/ui";
import { CommunityCard } from "./CommunityCard";
import type { CommunitySummary } from "../../../types/profile.types";

export interface CommunitiesPanelProps {
  communities: CommunitySummary[];
  isLoading?: boolean;
}

export function CommunitiesPanel({ communities, isLoading }: CommunitiesPanelProps) {
  if (isLoading) {
    return <Card className="text-sm text-text-muted">Loading communities…</Card>;
  }
  if (communities.length === 0) {
    return <Card className="text-sm text-text-muted">Not part of any communities yet.</Card>;
  }
  return (
    <Card padded={false} className="px-5">
      {communities.map((community) => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </Card>
  );
}
