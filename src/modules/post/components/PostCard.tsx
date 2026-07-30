import { type ReactNode } from "react";
import PostHeader from "./PostHeader";
import PostContent, { type PostMedia } from "./PostContent";
import PostInteractions from "./PostInteractions";

type PostCardTextOrMedia =
  | { text: string; media?: PostMedia }
  | { text?: string; media: PostMedia };

type PostCardProps = {
  /** Your existing <Avatar /> component, passed in as-is */
  avatar: ReactNode;
  /** Your existing <Badge /> component (e.g. <Badge>Admin</Badge>). Omit if no role. */
  badge?: ReactNode;
  name: string;
  community?: string;
  timeAgo: string;
  onNameClick?: () => void;

  likes: number;
  comments: number;
  shares: number;
  hasLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;

  className?: string;
} & PostCardTextOrMedia;

/**
 * PostCard
 * -------------------------------------------------------------------------
 * Combines PostHeader + PostContent + PostInteractions into the full feed
 * card: surface background, border, rounded corners, and a divider above
 * the interactions row.
 *
 * Just wires props through to the three sub-components — no logic of its
 * own beyond layout. Keep this component and PostHeader.tsx / PostContent.tsx
 * / PostInteractions.tsx in the same folder, or adjust the import paths.
 *
 * Relies entirely on the semantic tokens in global.css
 * (--color-surface, --color-border, --radius-lg, --elevation-sm, etc.)
 * via Tailwind utilities — no hard-coded colors.
 */
export default function PostCard({
  avatar,
  badge,
  name,
  community,
  timeAgo,
  onNameClick,
  text,
  media,
  likes,
  comments,
  shares,
  hasLiked,
  onLike,
  onComment,
  onShare,
  className = "",
}: PostCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] ${className}`}
    >
      <PostHeader
        avatar={avatar}
        badge={badge}
        name={name}
        community={community}
        timeAgo={timeAgo}
        onNameClick={onNameClick}
      />

      <PostContent text={text as string} media={media as PostMedia} />

      <div className="-mx-4 border-t border-[var(--border)]" />

      <PostInteractions
        likes={likes}
        comments={comments}
        shares={shares}
        hasLiked={hasLiked}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
      />
    </div>
  );
}

/* ============================================================
   USAGE EXAMPLE
   ------------------------------------------------------------
   <PostCard
     avatar={<Avatar src={user.avatarUrl} name={user.name} size="md" />}
     badge={<Badge variant="admin">Admin</Badge>}
     name="Aaryan Verma"
     community="MERN Developers"
     timeAgo="2h ago"
     onNameClick={() => router.push(`/profile/${user.id}`)}
     text="Just shipped a new feature for resource collections. Would love your feedback! 🚀"
     media={{
       type: "image",
       src: "/preview.png",
       alt: "Feature preview",
       width: 1200,
       height: 400,
     }}
     likes={128}
     comments={24}
     shares={3}
     hasLiked={false}
     onLike={() => toggleLike(post.id)}
     onComment={() => openComments(post.id)}
     onShare={() => openShareSheet(post.id)}
   />

   // Text-only post, no media
   <PostCard
     avatar={<Avatar src={user.avatarUrl} name={user.name} size="md" />}
     name="Riya Sharma"
     timeAgo="5m ago"
     text="No media here — just thoughts."
     likes={4}
     comments={0}
     shares={0}
   />
   ============================================================ */