import { useCallback, useState } from 'react';
import type { Comment, CommentTarget } from '../types/comment.types';
import * as commentsService from '../services/comments.service';
import { commentTextSchema } from '../validation/comment.schema';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useCommentComposer } from './useCommentComposer';
import { normalizeComment, countTopLevel, insertTopLevel, insertReply, removeNode, updateNodeText, toggleNodeLike } from '../lib/commentTree';

export interface UseCommentsOptions {
  postId: string; // TODO(api): generalize to a full CommentTarget once non-post entities need comments
  onCommentCountChange?: (delta: number) => void;
}

/**
 * The public orchestration hook for one entity's comment thread.
 * Owns: section open/closed, lazy-loaded comment tree, the
 * top-level composer, and every CRUD action. The consuming feature
 * (e.g. Posts' usePostCard) calls this once and hands the pieces
 * down to <CommentsSection /> and its own action-bar button.
 */
export function useComments({ postId, onCommentCountChange }: UseCommentsOptions) {
  const currentUser = useCurrentUser();
  const target: CommentTarget = { entityType: 'post', entityId: postId };

  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await commentsService.getComments(target);
      setComments(result.map(normalizeComment));
      setHasLoaded(true);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const buildNewComment = useCallback(
    (text: string): Comment => ({
      id: `local-${Date.now()}`,
      author: {
        name: currentUser.name,
        initials: currentUser.initials,
        color: currentUser.avatarColor,
        // Mirrors the mockup's ctSubmitComment behavior verbatim (always
        // labels the current user's own new comments "Author").
        // TODO(product): confirm this should reflect actual post
        // authorship once the API can tell us who wrote the post.
        badge: { label: 'Author', tone: 'outline' },
      },
      time: 'Just now',
      text,
      likes: 0,
      replies: [],
    }),
    [currentUser]
  );

  const addComment = useCallback(
    async (rawText: string) => {
      const parsed = commentTextSchema.safeParse(rawText);
      if (!parsed.success) return;
      const newComment = buildNewComment(parsed.data);
      setComments((prev) => insertTopLevel(prev, newComment));
      onCommentCountChange?.(1);
      await commentsService.addComment(target, newComment); // TODO(api): reconcile with the server's real id/timestamp
    },
    [buildNewComment, onCommentCountChange, target]
  );

  const addReply = useCallback(
    async (parentId: string, rawText: string) => {
      const parsed = commentTextSchema.safeParse(rawText);
      if (!parsed.success) return;
      const newReply = buildNewComment(parsed.data);
      setComments((prev) => insertReply(prev, parentId, newReply));
      onCommentCountChange?.(1); // TODO(product): confirm replies should count toward the badge
      await commentsService.addReply(target, parentId, newReply);
    },
    [buildNewComment, onCommentCountChange, target]
  );

  const editComment = useCallback(
    async (commentId: string, rawText: string) => {
      const parsed = commentTextSchema.safeParse(rawText);
      if (!parsed.success) return;
      setComments((prev) => updateNodeText(prev, commentId, parsed.data));
      await commentsService.editComment(target, commentId, parsed.data);
    },
    [target]
  );

  const deleteComment = useCallback(
    async (commentId: string, isTopLevel: boolean) => {
      setComments((prev) => removeNode(prev, commentId));
      if (isTopLevel) onCommentCountChange?.(-1);
      await commentsService.deleteComment(target, commentId);
    },
    [onCommentCountChange, target]
  );

  const toggleLike = useCallback(
    async (commentId: string, nextLikedState: boolean) => {
      setComments((prev) => toggleNodeLike(prev, commentId, nextLikedState));
      await commentsService.toggleCommentLike(target, commentId, nextLikedState);
    },
    [target]
  );

  const reportComment = useCallback(async (commentId: string) => {
    await commentsService.reportComment(target, commentId);
  }, [target]);

  const composer = useCommentComposer({ composerId: `composer-${postId}`, onSubmit: addComment });

  // Mirrors the mockup's ctFocusComments 3-step cascade:
  // closed -> open (composer visible) -> composer re-opened if it
  // was separately cancelled -> click again while both open -> closes.
  const toggleSection = useCallback(() => {
    if (!isSectionOpen) {
      setIsSectionOpen(true);
      if (!hasLoaded) void loadComments();
      composer.open();
      return;
    }
    if (!composer.isOpen) {
      composer.open();
      return;
    }
    setIsSectionOpen(false);
    composer.onCancel();
  }, [isSectionOpen, hasLoaded, loadComments, composer]);

  return {
    isSectionOpen,
    isLoading,
    comments,
    commentCount: countTopLevel(comments),
    composer,
    toggleSection,
    addReply,
    editComment,
    deleteComment,
    toggleLike,
    reportComment,
  } as const;
}