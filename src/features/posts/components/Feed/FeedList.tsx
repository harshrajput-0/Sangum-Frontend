import type { Post } from '../../types/post.types';
import { PostCard } from '../PostCard/PostCard';

export interface FeedListProps {
  posts: Post[];
}

export function FeedList({ posts }: FeedListProps) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} variant="feed" />
      ))}
    </div>
  );
}