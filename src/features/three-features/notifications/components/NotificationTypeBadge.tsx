import { AtSign, FileText, Reply, BookOpen, Heart, UserPlus, type LucideIcon } from 'lucide-react';
import type { NotificationType } from '../types/types';

const TYPE_CONFIG: Record<NotificationType, { icon: LucideIcon; bg: string; iconColor?: string }> = {
  mention: { icon: AtSign, bg: 'var(--primary)' },
  post: { icon: FileText, bg: 'var(--info)' },
  reply: { icon: Reply, bg: 'var(--accent)', iconColor: '#052E2A' },
  resource: { icon: BookOpen, bg: 'var(--warning)' },
  like: { icon: Heart, bg: 'var(--danger)' },
  follow: { icon: UserPlus, bg: 'var(--success)' },
};

interface NotificationTypeBadgeProps {
  type: NotificationType;
}

export function NotificationTypeBadge({ type }: NotificationTypeBadgeProps) {
  const { icon: Icon, bg, iconColor } = TYPE_CONFIG[type];

  return (
    <span
      className="absolute -bottom-0.75 -right-0.75 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-surface"
      style={{ background: bg, color: iconColor ?? '#fff' }}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} fill={type === 'like' ? 'currentColor' : 'none'} />
    </span>
  );
}