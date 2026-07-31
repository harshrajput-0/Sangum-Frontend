// src/features/posts/hooks/useAuthorFollow.ts
import { useState } from 'react';
import { postsService } from '../services/postsService';

/**
 * Owns follow/unfollow state + the API call for the author sidebar.
 * PLACEHOLDER: swap the local boolean for cached data from your data
 * layer (React Query/SWR) keyed by authorId, so follow state stays
 * correct across the app instead of resetting per mount.
 */
export function useAuthorFollow(authorId: string, initialIsFollowing = false) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const toggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    // TODO: await postsService.toggleFollow(authorId) and reconcile on failure
  };

  return { isFollowing, toggleFollow };
}