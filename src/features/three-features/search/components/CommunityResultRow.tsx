interface CommunityResultRowProps {
  name: string;
  visibility: 'Public' | 'Private';
  memberCount: string;
  avatarInitials: string;
  avatarColor: string;
  isMember?: boolean;
  onJoinToggle?: () => void;
}

export function CommunityResultRow({
  name,
  visibility,
  memberCount,
  avatarInitials,
  avatarColor,
  isMember = false,
  onJoinToggle,
}: CommunityResultRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-md font-semibold text-on-primary"
          style={{ background: avatarColor }}
        >
          {avatarInitials}
        </div>
        <div>
          <span className="block text-sm font-semibold text-text">{name}</span>
          <p className="text-xs text-text-muted">
            {visibility} · {memberCount} members
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onJoinToggle}
        className="rounded-sm bg-primary px-3 py-1.75 text-xs font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover"
      >
        {isMember ? 'Joined' : 'Join'}
      </button>
    </div>
  );
}