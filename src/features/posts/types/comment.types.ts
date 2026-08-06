import type { BadgeTone } from '../../components/ui';

/**
 * Loosely typed on purpose — the backend is still in development.
 * Only `id` is required; everything else is optional so a shifting
 * API response shape doesn't break the build. The index signature
 * lets extra fields the API sends pass through untyped rather than
 * erroring. TODO(api): tighten once /api/comments is finalized.
 */
export interface CommentAuthor {
  name?: string;
  initials?: string;
  color?: string; // tailwind bg-* token
  badge?: { label: string; tone: BadgeTone } | null;
  [key: string]: unknown;
}

export interface Comment {
  id: string;
  author?: CommentAuthor;
  time?: string; // TODO(api): likely an ISO timestamp; format to relative time client-side
  text?: string;
  likes?: number;
  likedByCurrentUser?: boolean;
  replies?: Comment[];
  [key: string]: unknown;
}

export type CommentEntityType = string; // was a fixed 'post' union — loosened so new entity types don't need a change here later

export interface CommentTarget {
  entityType: CommentEntityType;
  entityId: string;
}