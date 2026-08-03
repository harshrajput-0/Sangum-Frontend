import type { AccentToken } from '../types';

const ACCENT_CYCLE: AccentToken[] = ['primary', 'warning', 'info', 'danger', 'success'];

export function getAccentFromId(id: string): AccentToken {
  const hash = Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENT_CYCLE[hash % ACCENT_CYCLE.length];
}

export function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
}

export function getBannerLabel(title: string): string {
  return (title.split(' ')[0] ?? '').slice(0, 6).toUpperCase();
}

export function formatViewCount(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count);
}