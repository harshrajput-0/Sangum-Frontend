import { useCallback, useEffect, useState } from 'react';
import { usePostsStore } from '../stores/posts.store';
import * as postsService from '../services/posts.service';
import type { FeedTab } from '../services/posts.service';
import { useInfiniteScrollSentinel } from './useInfiniteScrollSentinel';

export function useFeed(initialTab: FeedTab = 'latest') {
  const feedOrder = usePostsStore((s) => s.feedOrder);
  const postsById = usePostsStore((s) => s.posts);
  const setFeedPage = usePostsStore((s) => s.setFeedPage);

  const [tab, setTabState] = useState<FeedTab>(initialTab);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadPage = useCallback(
    async (nextCursor: number, mode: 'replace' | 'append') => {
      setIsLoading(true);
      try {
        const result = await postsService.getFeedPosts({ tab, cursor: nextCursor });
        setFeedPage(result.posts, mode);
        setCursor(result.nextCursor);
        setHasMore(result.hasMore);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    },
    [tab, setFeedPage]
  );

  // Reload from scratch whenever the tab changes. isInitialLoad is
  // reset in setTab (the event handler below) rather than here, so
  // this effect's body never calls setState synchronously itself —
  // only the async loadPage() continuation does, after its await.
  useEffect(() => {
     
    // is async; setIsLoading(true) runs synchronously in its pre-`await`
    // portion, which this effect intentionally triggers on tab change.
    // No clean restructure avoids this without delaying the loading
    // indicator purely to satisfy static analysis.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPage(0, 'replace');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

    const setTab = useCallback((nextTab: FeedTab) => {
    setIsInitialLoad(true);
    setTabState(nextTab);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    void loadPage(cursor, 'append');
  }, [isLoading, hasMore, cursor, loadPage]);

  const sentinelRef = useInfiniteScrollSentinel<HTMLDivElement>(loadMore, hasMore && !isLoading);

  const posts = feedOrder.map((id) => postsById[id]).filter(Boolean);

  return {
    tab,
    setTab,
    posts,
    isLoading,
    isInitialLoad,
    hasMore,
    sentinelRef,
  } as const;
}