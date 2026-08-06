'use client';

import { useFeed } from '../../hooks/useFeed';
import { CreatePostComposerBar } from './CreatePostComposerBar';
import { FeedTabs } from './FeedTabs';
import { FeedList } from './FeedList';
import { FeedLoadingSkeleton } from './FeedLoadingSkeleton';
import { FeedEndOfFeed } from './FeedEndOfFeed';
import { FeedEmptyState } from './FeedEmptyState';

export function FeedShell() {
  const feed = useFeed();

  const showEmpty = !feed.isInitialLoad && !feed.isLoading && feed.posts.length === 0;
  const showEndOfFeed = !feed.isInitialLoad && !feed.hasMore && feed.posts.length > 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <CreatePostComposerBar />

      <FeedTabs activeTab={feed.tab} onChange={feed.setTab} />

      <FeedList posts={feed.posts} />

      {feed.isLoading && <FeedLoadingSkeleton />}
      {showEndOfFeed && <FeedEndOfFeed />}
      {showEmpty && <FeedEmptyState tab={feed.tab} />}

      <div ref={feed.sentinelRef} className="h-1" />
    </div>
  );
}