'use client';

import { useCurrentUser } from '../../../../shared/hooks/useCurrentUser';
import { useUserPosts } from '../../hooks/useUserPosts';
import { PostCard } from '../PostCard/PostCard';
import { FeedLoadingSkeleton } from '../Feed/FeedLoadingSkeleton';

export interface UserPostsSectionProps {
  userId: string;
}

/**
 * Generalization of the mock's "My Posts" page into a reusable
 * section: works for any user's profile, not just the current
 * viewer's own. Own-post edit/delete controls vs. a Follow control
 * are resolved per-post by usePostCard (via PostCard's `variant` prop
 * + post.author.id), not by this component.
 *
 * Doesn't render its own page heading or "Create Post" button — the
 * profile page (and header/nav trigger buttons) own that context, per
 * your instruction to keep those triggers out of this feature's pages.
 */
export function UserPostsSection({ userId }: UserPostsSectionProps) {
  const currentUser = useCurrentUser();
  const { posts, isLoading } = useUserPosts(userId);
  const isOwnProfile = userId === currentUser.id;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <FeedLoadingSkeleton />
        <FeedLoadingSkeleton />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-text-muted">
        {isOwnProfile
          ? 'You haven\'t posted anything yet — use "Create Post" to share something.'
          : "This user hasn't posted anything yet."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} variant="profile" />
      ))}
    </div>
  );
}