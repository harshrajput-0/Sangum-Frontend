import { useCallback, useEffect, useState } from 'react';
import { usePostsStore } from '../stores/posts.store';
import * as postsService from '../services/posts.service';

/** Powers the generic UserPosts section — works for any userId, own profile or someone else's. */
export function useUserPosts(userId: string) {
  const userPostOrder = usePostsStore((s) => s.userPostOrder[userId]) ?? [];
  const postsById = usePostsStore((s) => s.posts);
  const setUserPosts = usePostsStore((s) => s.setUserPosts);

  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const posts = await postsService.getPostsByUser(userId);
      setUserPosts(userId, posts);
    } finally {
      setIsLoading(false);
    }
  }, [userId, setUserPosts]);

  useEffect(() => {
    void load();
  }, [load]);

  const posts = userPostOrder.map((id) => postsById[id]).filter(Boolean);

  return { posts, isLoading, reload: load } as const;
}