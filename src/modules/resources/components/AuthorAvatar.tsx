import type { AccentToken } from '../types';

const ACCENT_SOFT: Record<AccentToken, string> = {
  primary: 'bg-primary/15 text-primary-light',
  warning: 'bg-warning/15 text-warning',
  info: 'bg-info/15 text-info',
  danger: 'bg-danger/15 text-danger',
};

const ACCENT_SOLID: Record<AccentToken, string> = {
  primary: 'bg-primary text-text-on-primary',
  warning: 'bg-warning text-text-on-primary',
  info: 'bg-info text-text-on-primary',
  danger: 'bg-danger text-text-on-primary',
};

const SIZE_CLASSES = {
  xs: 'h-5 w-5 text-[9px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
};

interface AuthorAvatarProps {
  initials: string;
  accent: AccentToken;
  size?: keyof typeof SIZE_CLASSES;
  variant?: 'soft' | 'solid';
  shape?: 'circle' | 'square';
}

export function AuthorAvatar({
  initials,
  accent,
  size = 'sm',
  variant = 'soft',
  shape = 'circle',
}: AuthorAvatarProps) {
  const colorClasses = variant === 'solid' ? ACCENT_SOLID[accent] : ACCENT_SOFT[accent];
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      className={`flex shrink-0 items-center justify-center font-semibold ${SIZE_CLASSES[size]} ${shapeClass} ${colorClasses}`}
    >
      {initials}
    </span>
  );
}