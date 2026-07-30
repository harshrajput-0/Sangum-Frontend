import { type ReactNode } from "react";

interface PostHeaderProps {
  /** Your existing <Avatar /> component, passed in as-is */
  avatar: ReactNode;
  /** Your existing <Badge /> component (e.g. <Badge>Admin</Badge>), passed in as-is. Omit if the poster has no role badge. */
  badge?: ReactNode;
  /** Display name of the poster */
  name: string;
  /** Community / group the post was made in, e.g. "MERN Developers". Omit for posts with no community context. */
  community?: string;
  /** Relative timestamp, e.g. "2h ago" */
  timeAgo: string;
  /** Optional click handler for the name (e.g. open profile) */
  onNameClick?: () => void;
  className?: string;
}

export default function PostHeader({
  avatar,
  badge,
  name,
  community,
  timeAgo,
  onNameClick,
  className = "",
}: PostHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {avatar}

      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNameClick}
            className="truncate text-md font-semibold leading-none text-text hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-outline) rounded-sm"
          >
            {name}
          </button>
          {badge}
        </div>

        <p className="truncate text-[13px] leading-none text-text-muted">
          {community && (
            <>
              in <span className="text-text-secondary">{community}</span>
              <span aria-hidden="true"> · </span>
            </>
          )}
          <span>{timeAgo}</span>
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   USAGE EXAMPLE
   ------------------------------------------------------------
   // With community + role badge
   <PostHeader
     avatar={<Avatar src={user.avatarUrl} name={user.name} size="md" />}
     badge={<Badge variant="admin">Admin</Badge>}
     name="Aaryan Verma"
     community="MERN Developers"
     timeAgo="2h ago"
     onNameClick={() => router.push(`/profile/${user.id}`)}
   />

   // No community, no badge
   <PostHeader
     avatar={<Avatar src={user.avatarUrl} name={user.name} size="md" />}
     name="Riya Sharma"
     timeAgo="5m ago"
   />
   ============================================================ */