import { Card } from "@/shared/components/ui";
import { PostListItem } from "./PostListItem";
import type { PostSummary } from "../../../types/profile.types";

export interface PostsPanelProps {
  posts: PostSummary[];
  isLoading?: boolean;
}

export function PostsPanel({ posts, isLoading }: PostsPanelProps) {
  if (isLoading) {
    return <Card className="text-sm text-text-muted">Loading posts…</Card>;
  }
  if (posts.length === 0) {
    return <Card className="text-sm text-text-muted">No posts yet.</Card>;
  }
  return (
    <Card padded={false} className="px-5">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </Card>
  );
}
