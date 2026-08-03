import type { CommentAccent } from '../types';

const ACCENT_CLASSES: Record<CommentAccent, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  info: 'bg-info',
  accent: 'bg-accent',
};

const SIZE_CLASSES = {
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-9 w-9 text-xs',
};

interface CommentAvatarProps {
  initials: string;
  accent: CommentAccent;
  size?: keyof typeof SIZE_CLASSES;
}

export function CommentAvatar({ initials, accent, size = 'md' }: CommentAvatarProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-text-on-primary ${SIZE_CLASSES[size]} ${ACCENT_CLASSES[accent]}`}
    >
      {initials}
    </span>
  );
}