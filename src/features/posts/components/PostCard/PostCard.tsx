import type { Post } from '../../types/post.types';
import { usePostCard, type PostCardVariant } from '../../hooks/usePostCard';
import { PostCardHeader } from './PostCardHeader';
import { PostOwnMenu } from './PostOwnMenu';
import { PostFollowControl } from './PostFollowControl';
import { PostExcerpt } from './PostExcerpt';
import { PostActionsBar } from './PostActionsBar';
import { PostMedia } from './media/PostMedia';
import { CommentsSection } from '../../../../shared/comments';
import { useCurrentUser } from '../../../../shared/hooks/useCurrentUser';

export interface PostCardProps {
  post: Post;
  variant?: PostCardVariant;
}

/**
 * Composes usePostCard (all interaction/business logic) with the pure
 * presentational pieces below it — playing the same role a page-level
 * Shell would, just scoped to one reusable card instead of a route.
 */
export function PostCard({ post, variant = 'feed' }: PostCardProps) {
  const currentUser = useCurrentUser();
  const card = usePostCard(post, { variant });

  return (
    <div className="post-card rounded-sm border border-border bg-surface p-4 transition-shadow duration-200 hover:shadow-md sm:p-5">
      <PostCardHeader
        authorName={post.author?.name ?? 'Unknown'}
        authorInitials={post.author?.initials ?? '?'}
        authorColor={post.author?.avatarColor ?? 'bg-neutral'}
        authorBadge={post.author?.badge}
        date={post.date ?? ''}
        edited={post.edited}
        rightSlot={
          card.showOwnMenu ? (
            <PostOwnMenu onEdit={card.onEdit} onDelete={card.onDelete} />
          ) : card.showFollowControl ? (
            <PostFollowControl
              isFollowed={card.isFollowed}
              isSaved={card.isSaved}
              onToggleFollow={card.onToggleFollow}
              onToggleBookmark={card.onToggleBookmark}
              onCopyLink={card.onCopyLink}
              onReport={card.onReport}
            />
          ) : null
        }
      />

      <PostExcerpt
        title={post.title ?? ''}
        tags={post.tags ?? []}
        excerpt={post.excerpt ?? ''}
        topics={post.type === 'poll' ? [] : post.topics ?? []}
      />

      <PostMedia post={post} onVote={card.onVote} />

      <PostActionsBar
        isLiked={card.isLiked}
        likeCount={card.likeCount}
        commentCount={post.commentCount ?? 0}
        isSaved={card.isSaved}
        onToggleLike={card.onToggleLike}
        onToggleComments={card.comments.toggleSection}
        onToggleBookmark={card.onToggleBookmark}
        onShare={card.onShare}
      />

      <CommentsSection
        isOpen={card.comments.isSectionOpen}
        isLoading={card.comments.isLoading}
        comments={card.comments.comments}
        commentCount={card.comments.commentCount}
        composer={card.comments.composer}
        currentUserInitials={currentUser.initials}
        currentUserAvatarColor={currentUser.avatarColor}
        onReply={card.comments.addReply}
        onEdit={card.comments.editComment}
        onDelete={card.comments.deleteComment}
        onToggleLike={card.comments.toggleLike}
        onReport={card.comments.reportComment}
      />
    </div>
  );
}