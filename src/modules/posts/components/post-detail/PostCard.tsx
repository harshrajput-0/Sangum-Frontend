import { PostCardHeader } from './PostCardHeader';
import { PostCardBody } from './PostCardBody';
import { PostActionsBar } from './PostActionsBar';
import { CommentsPanel } from '@/modules/comments';
import type { Comment } from '@/modules/comments';
import type { PostSummary } from '../../types';

interface PostCardProps {
  post: PostSummary;
  comments: Comment[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  /** Top-level comments shown before "Show all" is clicked. Defaults to a feed-style preview. */
  commentsPreviewCount?: number;
}

export function PostCard({
  post,
  comments,
  isExpanded,
  onToggleExpand,
  isLiked,
  onToggleLike,
  onSave,
  onShare,
  commentsPreviewCount = 2,
}: PostCardProps) {
  return (
    <div
      onClick={onToggleExpand}
      className="cursor-pointer rounded-xl border border-border bg-surface p-4 transition-shadow duration-base hover:shadow-md sm:p-5"
    >
      <PostCardHeader author={post.author} date={post.date} edited={post.edited} pinned={post.pinned} />
      <PostCardBody title={post.title} tags={post.tags} excerpt={post.excerpt} expandedContent={post.expandedContent} isExpanded={isExpanded} />
      <PostActionsBar likes={post.stats.likes} commentCount={post.stats.commentCount} isExpanded={isExpanded} isLiked={isLiked} onToggleLike={onToggleLike} onSave={onSave} onShare={onShare} />
      <div onClick={(e) => e.stopPropagation()} className="mt-4 border-t border-border pt-4">
        <CommentsPanel entityType="post" entityId={post.id} initialComments={comments} initialVisibleCount={commentsPreviewCount} />
      </div>
    </div>
  );
}