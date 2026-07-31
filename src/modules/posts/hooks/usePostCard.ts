// src/features/posts/hooks/usePostCard.ts
import { useState } from 'react';
import { postsService } from '../services/postsService';

/**
 * Owns interaction state for a single PostCard: expand/collapse,
 * like toggle, and the in-progress comment draft.
 *
 * PLACEHOLDER: swap local state for data from a query hook (e.g.
 * React Query) once the service layer talks to a real API, and
 * update like/save optimistically through `postsService`.
 */
export function usePostCard(postId: string) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [draftComment, setDraftComment] = useState('');

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

  const handleReply = (commentId: string) => {
    // TODO: focus composer, prefill "@author " mention for commentId
  };

  const submitComment = async () => {
    if (!draftComment.trim()) return;
    await postsService.addComment(postId, draftComment);
    setDraftComment('');
  };

  return {
    isExpanded,
    toggleExpand,
    isLiked,
    toggleLike,
    draftComment,
    setDraftComment,
    handleSave,
    handleShare,
    handleReply,
    submitComment,
  };
}