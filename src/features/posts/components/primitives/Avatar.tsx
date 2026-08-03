// src/features/posts/components/primitives/Avatar.tsx
import type { AvatarVariant } from '../../types';

interface AvatarProps {
  label: string;
  variant?: AvatarVariant;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square';
  className?: string;
}

const VARIANT_CLASSES: Record<AvatarVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  info: 'bg-info',
  neutral: 'bg-neutral',
};

const SIZE_CLASSES: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

/**
 * Presentational avatar — initials on a colored background.
 * No data fetching; pass label/variant from whatever author/group
 * object the parent already has.
 */
export function Avatar({
  label,
  variant = 'primary',
  size = 'md',
  shape = 'circle',
  className = '',
}: AvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center font-semibold text-text-on-primary ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'} ${className}`}
    >
      {label}
    </div>
  );
}