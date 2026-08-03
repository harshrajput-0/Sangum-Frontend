import type { CommentAccent } from '../types';

const ACCENT_CYCLE: CommentAccent[] = ['primary', 'success', 'info', 'accent'];

export function getCommentAccent(name: string): CommentAccent {
  const hash = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENT_CYCLE[hash % ACCENT_CYCLE.length];
}

export function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
}