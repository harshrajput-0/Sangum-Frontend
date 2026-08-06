import { useCallback } from 'react';
import type { Post } from '../types/post.types';
import { usePostsStore } from '../stores/posts.store';
import { useCreatePostTrigger } from './useCreatePostTrigger';
import * as postsService from '../services/posts.service';
import * as shareService from '../services/share.service';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import { useComments } from '../../../shared/comments';

export type PostCardVariant = 'feed' | 'profile';

export interface UsePostCardOptions {
  variant?: PostCardVariant;
}

/**
 * Per-card orchestration: like/save/follow/poll-vote/delete/share and
 * the comments-open toggle. `variant` controls which controls render
 * — matches the mock's exact behavior (own posts get NO controls on
 * Feed; edit/delete only appears in a profile context) generalized
 * slightly further: a Follow control now also appears for other
 * users' posts on a *visited* profile, not just on Feed, since
 * UserPostsSection can show anyone's posts, not only the viewer's own
 * (the mock never had to handle that case).
 */
export function usePostCard(post: Post, { variant = 'feed' }: UsePostCardOptions = {}) {
  const currentUser = useCurrentUser();
  const patchPost = usePostsStore((s) => s.patchPost);
  const removePostFromStore = usePostsStore((s) => s.removePost);
  const { openEditPost } = useCreatePostTrigger();

  const isOwnPost = post.author?.id === currentUser.id;
  const showOwnMenu = variant === 'profile' && isOwnPost;
  const showFollowControl = !isOwnPost;

  const comments = useComments({
    postId: post.id,
    onCommentCountChange: (delta) => patchPost(post.id, { commentCount: (post.commentCount ?? 0) + delta }),
  });

  const onToggleLike = useCallback(async () => {
    const next = !post.likedByCurrentUser;
    patchPost(post.id, { likedByCurrentUser: next, likes: (post.likes ?? 0) + (next ? 1 : -1) }); // optimistic
    const result = await postsService.toggleLike(post.id, next);
    patchPost(post.id, result); // reconcile with the "server"
  }, [post.id, post.likedByCurrentUser, post.likes, patchPost]);

  const onToggleBookmark = useCallback(async () => {
    const next = !post.savedByCurrentUser;
    patchPost(post.id, { savedByCurrentUser: next });
    const result = await postsService.toggleBookmark(post.id, next);
    patchPost(post.id, result);
  }, [post.id, post.savedByCurrentUser, patchPost]);

  const onToggleFollow = useCallback(async () => {
    const next = !post.followedByCurrentUser;
    patchPost(post.id, { followedByCurrentUser: next });
    const result = await postsService.toggleFollow(post.id, next);
    patchPost(post.id, result);
  }, [post.id, post.followedByCurrentUser, patchPost]);

  // No guard against re-voting — matches pollVote() in the mock,
  // which supports changing or retracting a vote (see the service fix above).
  const onVote = useCallback(
    async (optionIndex: number) => {
      const result = await postsService.votePoll(post.id, optionIndex);
      patchPost(post.id, result);
    },
    [post.id, patchPost]
  );

  const onEdit = useCallback(() => openEditPost(post.id), [openEditPost, post.id]);

  const onDelete = useCallback(async () => {
    // TODO(ux): mock uses window.confirm() — preserved here for exact
    // parity; swap for a custom ConfirmDialog component later if desired.
    if (typeof window !== 'undefined' && !window.confirm('Delete this post? This cannot be undone.')) return;
    removePostFromStore(post.id);
    await postsService.deletePost(post.id);
  }, [post.id, removePostFromStore]);

  const buildPostUrl = useCallback(
    // TODO(routing): confirm the real post-detail URL pattern once that route exists.
    () => (typeof window !== 'undefined' ? `${window.location.origin}/posts/${post.id}` : `/posts/${post.id}`),
    [post.id]
  );

  const onShare = useCallback(
    () => shareService.sharePost({ title: post.title ?? '', url: buildPostUrl() }),
    [post.title, buildPostUrl]
  );

  const onCopyLink = useCallback(() => shareService.copyPostLink(buildPostUrl()), [buildPostUrl]);

  const onReport = useCallback(() => postsService.reportPost(post.id), [post.id]);

  return {
    isOwnPost,
    showOwnMenu,
    showFollowControl,
    isLiked: !!post.likedByCurrentUser,
    likeCount: post.likes ?? 0,
    isSaved: !!post.savedByCurrentUser,
    isFollowed: !!post.followedByCurrentUser,
    onToggleLike,
    onToggleBookmark,
    onToggleFollow,
    onVote,
    onEdit,
    onDelete,
    onShare,
    onCopyLink,
    onReport,
    comments,
  } as const;
}