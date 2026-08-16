import { AVATAR_FALLBACK_COLORS } from '../constants/onboarding.constants';

export function getInitials(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return '?';
  return trimmed
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function pickFallbackColor(): string {
  return AVATAR_FALLBACK_COLORS[
    Math.floor(Math.random() * AVATAR_FALLBACK_COLORS.length)
  ];
}
