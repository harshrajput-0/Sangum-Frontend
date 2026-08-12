'use client';

import { useFeed } from '../../hooks/useFeed';
import { CreatePostComposerBar } from './CreatePostComposerBar';
import { FeedTabs } from './FeedTabs';
import { FeedList } from './FeedList';
import { FeedLoadingSkeleton } from './FeedLoadingSkeleton';
import { FeedEndOfFeed } from './FeedEndOfFeed';
import { FeedEmptyState } from './FeedEmptyState';

export function FeedShell() {
  const { tab, setTab, posts, isLoading, isInitialLoad, hasMore, sentinelRef } = useFeed();

  const showEmpty = !isInitialLoad && !isLoading && posts.length === 0;
  const showEndOfFeed = !isInitialLoad && !hasMore && posts.length > 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <CreatePostComposerBar />

      <FeedTabs activeTab={tab} onChange={setTab} />

      <FeedList posts={posts} />

      {isLoading && <FeedLoadingSkeleton />}
      {showEndOfFeed && <FeedEndOfFeed />}
      {showEmpty && <FeedEmptyState tab={tab} />}

      <div ref={sentinelRef} className="h-1" />
    </div>
  );
}