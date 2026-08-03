import { useState } from 'react';

/**
 * Owns interaction state for a single PostCard: expand/collapse and
 * like toggle. Comment state (draft, submit, reply) now lives inside
 * CommentsPanel — this hook no longer owns any of it.
 *
 * PLACEHOLDER: swap local state for data from a query hook (e.g.
 * React Query) once the service layer talks to a real API, and
 * update like/save optimistically through `postsService`.
 */
export function usePostCard(postId: string) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    // TODO: await postsService.toggleLike(postId) and reconcile on failure
  };

  const handleSave = () => {
    // TODO: await postsService.toggleSave(postId)
  };

  const handleShare = () => {
    // TODO: open native share sheet / copy link
  };

  return { isExpanded, toggleExpand, isLiked, toggleLike, handleSave, handleShare };
}