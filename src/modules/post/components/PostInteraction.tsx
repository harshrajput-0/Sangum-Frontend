import { type ReactNode } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

interface InteractionButtonProps {
  icon: ReactNode;
  count?: number;
  label: string;
  active?: boolean;
  activeColor?: string;
  onClick?: () => void;
}

function InteractionButton({
  icon,
  count,
  label,
  active = false,
  activeColor = "var(--primary)",
  onClick,
}: InteractionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-medium leading-none transition-colors duration-(--t-fast) hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-outline)"
      style={{ color: active ? activeColor : "var(--text-muted)" }}
    >
      <span className="[&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span>
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}

interface PostInteractionsProps {
  likes: number;
  comments: number;
  shares: number;
  /** Whether the current user has liked this post */
  hasLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
}

export default function PostInteractions({
  likes,
  comments,
  shares,
  hasLiked = false,
  onLike,
  onComment,
  onShare,
  className = "",
}: PostInteractionsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <InteractionButton
        icon={<Heart strokeWidth={2} fill={hasLiked ? "currentColor" : "none"} />}
        count={likes}
        label="Like"
        active={hasLiked}
        activeColor="var(--danger)"
        onClick={onLike}
      />
      <InteractionButton
        icon={<MessageCircle strokeWidth={2} />}
        count={comments}
        label="Comment"
        onClick={onComment}
      />
      <InteractionButton
        icon={<Send strokeWidth={2} />}
        count={shares}
        label="Share"
        onClick={onShare}
      />
    </div>
  );
}

/* ============================================================
   USAGE EXAMPLE
   ------------------------------------------------------------
   const [hasLiked, setHasLiked] = useState(false);
   const [likes, setLikes] = useState(93);

   <PostInteractions
     likes={likes}
     comments={8}
     shares={1}
     hasLiked={hasLiked}
     onLike={() => {
       setHasLiked((v) => !v);
       setLikes((n) => (hasLiked ? n - 1 : n + 1));
     }}
     onComment={() => setCommentsOpen(true)}
     onShare={() => openShareSheet(post.id)}
   />
   ============================================================ */