// src/features/posts/components/post-detail/PostCard.tsx
import { PostCardHeader } from './PostCardHeader';
import { PostCardBody } from './PostCardBody';
import { PostActionsBar } from './PostActionsBar';
import { CommentList } from './CommentList';
import type { PostSummary, PostComment } from '../../types';

interface PostCardProps {
  post: PostSummary;
  comments: PostComment[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  currentUserAvatarLabel: string;
  draftComment: string;
  onDraftChange: (value: string) => void;
  onReply?: (commentId: string) => void;
}

/**
 * Header, title/tags/excerpt (+ collapsible body), action row, and
 * comments — matching the merged card+comments layout from the design.
 * The whole card is clickable to expand/collapse; the comments block
 * stops propagation so typing/clicking there never toggles it.
 * All state (`isExpanded`, `draftComment`, etc.) is owned by `usePostCard()`.
 */
export function PostCard({
  post,
  comments,
  isExpanded,
  onToggleExpand,
  isLiked,
  onToggleLike,
  onSave,
  onShare,
  currentUserAvatarLabel,
  draftComment,
  onDraftChange,
  onReply,
}: PostCardProps) {
  return (
    <div
      onClick={onToggleExpand}
      className="cursor-pointer rounded-xl border border-border bg-surface p-4 transition-shadow duration-base hover:shadow-md sm:p-5"
    >
      <PostCardHeader author={post.author} date={post.date} edited={post.edited} pinned={post.pinned} />
      <PostCardBody
        title={post.title}
        tags={post.tags}
        excerpt={post.excerpt}
        expandedContent={post.expandedContent}
        isExpanded={isExpanded}
      />
      <PostActionsBar
        likes={post.stats.likes}
        commentCount={post.stats.commentCount}
        isExpanded={isExpanded}
        isLiked={isLiked}
        onToggleLike={onToggleLike}
        onSave={onSave}
        onShare={onShare}
      />
      <div onClick={(e) => e.stopPropagation()}>
        <CommentList
          comments={comments}
          commentCount={post.stats.commentCount}
          currentUserAvatarLabel={currentUserAvatarLabel}
          draftComment={draftComment}
          onDraftChange={onDraftChange}
          onReply={onReply}
        />
      </div>
    </div>
  );
}