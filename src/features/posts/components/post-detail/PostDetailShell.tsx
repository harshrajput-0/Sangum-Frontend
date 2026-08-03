import { PostBreadcrumb } from './PostBreadcrumb';
import { PostCard } from './PostCard';
import { AuthorSidebarCard } from './AuthorSidebarCard';
import { usePostCard } from '../../hooks/usePostCard';
import { useAuthorFollow } from '../../hooks/useAuthorFollow';
import type { Comment } from '@/features/comments';
import type { PostSummary } from '../../types';

interface PostDetailShellProps {
  groupName: string;
  post: PostSummary;
  comments: Comment[];
  currentUserAvatarLabel: string;
  postCount: number;
  followerCount: string;
  relatedTopics: string[];
}

/**
 * Page-level shell for Post Detail. `post`/`comments` would normally
 * come from a data-fetching hook (e.g. `usePostDetail(postId)` with
 * React Query) that this shell calls instead of receiving props,
 * once that layer exists:
 *
 *   const { post, comments, isLoading } = usePostDetail(postId);
 *   if (isLoading) return <PostDetailSkeleton />;
 *   <PostDetailShell post={post} comments={comments} ... />
 */
export function PostDetailShell({
  groupName,
  post,
  comments,
  currentUserAvatarLabel,
  postCount,
  followerCount,
  relatedTopics,
}: PostDetailShellProps) {
  const { isExpanded, toggleExpand, isLiked, toggleLike, handleSave, handleShare } = usePostCard(post.id);

  const { isFollowing, toggleFollow } = useAuthorFollow(post.author.id);

  return (
    <div className="space-y-6">
      <PostBreadcrumb groupName={groupName} postTitle={post.title} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <PostCard
          post={post}
          comments={comments}
          isExpanded={isExpanded}
          onToggleExpand={toggleExpand}
          isLiked={isLiked}
          onToggleLike={toggleLike}
          onSave={handleSave}
          onShare={handleShare}
        />
        <AuthorSidebarCard
          author={post.author}
          postCount={postCount}
          followerCount={followerCount}
          relatedTopics={relatedTopics}
          isFollowing={isFollowing}
          onToggleFollow={toggleFollow}
        />
      </div>
    </div>
  );
}