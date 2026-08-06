import { NotificationTypeBadge } from './NotificationTypeBadge';
import type { NotificationType } from '../types/types';

interface NotificationRowProps {
  type: NotificationType;
  actorName: string;
  message: string;
  avatarInitials: string;
  avatarColor: string;
  avatarShape?: 'circle' | 'rounded';
  timestamp: string;
  isRead: boolean;
  onMarkRead?: () => void;
}

export function NotificationRow({
  type,
  actorName,
  message,
  avatarInitials,
  avatarColor,
  avatarShape = 'circle',
  timestamp,
  isRead,
  onMarkRead,
}: NotificationRowProps) {
  return (
    <div
      onClick={onMarkRead}
      className="flex cursor-pointer gap-3 rounded-md border-b border-border px-2.5 py-3.5 transition-colors last:border-b-0 hover:bg-surface-hover"
    >
      <div className="relative shrink-0">
        <div
          className={`flex h-9 w-9 items-center justify-center text-xs font-semibold text-on-primary ${
            avatarShape === 'rounded' ? 'rounded-md' : 'rounded-full'
          }`}
          style={{ background: avatarColor }}
        >
          {avatarInitials}
        </div>
        <NotificationTypeBadge type={type} />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-sm text-text">
          <b className="font-semibold">{actorName}</b> {message}
        </span>
        <div className="text-xs text-text-muted">{timestamp}</div>
      </div>

      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary transition-all ${
          isRead ? 'scale-[0.4] opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}