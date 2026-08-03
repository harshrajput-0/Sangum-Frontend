interface PersonResultCardProps {
  name: string;
  handle: string;
  avatarInitials: string;
  avatarColor: string;
  isFollowing?: boolean;
  onFollowToggle?: () => void;
}

export function PersonResultCard({
  name,
  handle,
  avatarInitials,
  avatarColor,
  isFollowing = false,
  onFollowToggle,
}: PersonResultCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-on-primary"
          style={{ background: avatarColor }}
        >
          {avatarInitials}
        </div>
        <div>
          <span className="block text-sm text-text">{name}</span>
          <div className="text-xs text-text-muted">{handle}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onFollowToggle}
        className="rounded-sm border border-border-strong px-3 py-[7px] text-xs font-semibold text-text transition-colors hover:bg-surface-hover"
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}