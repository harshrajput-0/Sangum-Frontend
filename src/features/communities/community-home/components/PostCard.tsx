import { ThumbsUp, MessageCircle, Eye } from "lucide-react";
import { Avatar, Tag } from "../../shared/components/ui";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  onClick?: (id: string) => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article
      onClick={() => onClick?.(post.id)}
      className="cursor-pointer rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-strong hover:shadow-md sm:p-5"
    >
      <div className="mb-2.5 flex items-center gap-3">
        <Avatar label={post.author.avatarLabel} imageUrl={post.author.avatarImageUrl} size="sm" />
        <div>
          <p className="text-sm font-semibold text-text">{post.author.name}</p>
          <p className="text-xs text-text-muted">{post.timestamp}</p>
        </div>
      </div>
      <p className="mb-1.5 text-sm font-semibold text-text sm:text-base">{post.title}</p>
      {post.excerpt && (
        <p className="mb-3 text-xs text-text-secondary sm:text-sm">{post.excerpt}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}
      <div className="flex items-center gap-5 border-t border-border pt-3 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <ThumbsUp size={14} /> {post.likeCount}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle size={14} /> {post.commentCount}
        </span>
        <span className="flex items-center gap-1.5">
          <Eye size={14} /> {post.viewCount}
        </span>
      </div>
    </article>
  );
}