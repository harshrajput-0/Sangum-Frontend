import { useCallback, useEffect, useState } from 'react';
import { usePostsStore } from '../stores/posts.store';
import * as postsService from '../services/posts.service';
import type { FeedTab } from '../services/posts.service';
import { useInfiniteScrollSentinel } from './useInfiniteScrollSentinel';

export function useFeed(initialTab: FeedTab = 'latest') {
  const feedOrder = usePostsStore((s) => s.feedOrder);
  const postsById = usePostsStore((s) => s.posts);
  const setFeedPage = usePostsStore((s) => s.setFeedPage);

  const [tab, setTab] = useState<FeedTab>(initialTab);
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

  // Reload from scratch whenever the tab changes.
  useEffect(() => {
    setIsInitialLoad(true);
    void loadPage(0, 'replace');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

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