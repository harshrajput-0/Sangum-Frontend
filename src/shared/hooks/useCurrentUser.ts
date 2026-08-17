'use client';

import { useSessionStore } from '@/shared/stores/session.store';

export interface CurrentUser {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
}

const AVATAR_COLOR_CLASSES = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger'];

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  return trimmed
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Deterministic, not random — the same user should always get the
// same fallback color across renders/sessions, unlike
// onboarding/lib/avatarFallback.ts's pickFallbackColor() (which picks
// randomly each call and is scoped to the onboarding feature anyway).
function pickAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLOR_CLASSES[hash % AVATAR_COLOR_CLASSES.length];
}

export function useCurrentUser(): CurrentUser {
  const user = useSessionStore((s) => s.user);

  if (!user) {
    // Session not resolved yet, or this consumer is rendering on a
    // page that isn't actually protected yet (Phase 1's route guards
    // aren't built — see plan). Keeps the return type non-nullable so
    // none of the 8 existing call sites need to change, matching what
    // the mock always returned. Once guards land, protected pages
    // won't reach here with a null user in practice.
    return { id: '', name: '', initials: '?', avatarColor: AVATAR_COLOR_CLASSES[0] };
  }

  return {
    id: user.id,
    name: user.displayName,
    initials: getInitials(user.displayName),
    avatarColor: pickAvatarColor(user.id),
  };
}
