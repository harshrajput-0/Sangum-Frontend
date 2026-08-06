import type { FeedTab } from '../../services/posts.service';

const EMPTY_COPY: Record<FeedTab, string> = {
  latest: 'No posts yet — be the first to share something with the community.',
  top: 'No posts yet — check back once the community gets going.',
  following: "You're not following anyone with posts yet. Follow some people to see their posts here.",
};

export interface FeedEmptyStateProps {
  tab: FeedTab;
}

export function FeedEmptyState({ tab }: FeedEmptyStateProps) {
  return <p className="py-16 text-center text-sm text-text-muted">{EMPTY_COPY[tab]}</p>;
}