import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';
export type SpinnerTone = 'primary' | 'current' | 'muted';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  /** Screen-reader label — spinners carry no visible text of their own. */
  label?: string;
}

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3 border-[1.5px]',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-7 w-7 border-[3px]',
};

const TONE_CLASSES: Record<SpinnerTone, string> = {
  primary: 'border-primary/25 border-t-primary',
  current: 'border-current/25 border-t-current',
  muted: 'border-border-strong border-t-text-muted',
};

/**
 * Inline loading indicator. Use `tone="current"` when nesting inside a
 * colored button (e.g. Button variant="primary") so it inherits the
 * button's own text color instead of clashing with it.
 */
export function Spinner({ size = 'sm', tone = 'primary', label = 'Loading', className = '', ...rest }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={['inline-block shrink-0 animate-spin rounded-full', SIZE_CLASSES[size], TONE_CLASSES[tone], className].join(' ')}
      {...rest}
    />
  );
}