import type { BadgeTone } from '@/shared/components/ui';

export interface CommentAuthor {
  name: string;
  initials: string;
  color: string; // tailwind bg-* token
  badge?: { label: string; tone: BadgeTone } | null;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  time: string; // TODO(api): likely an ISO timestamp from the server; format to relative time client-side
  text: string;
  likes: number;
  likedByCurrentUser?: boolean;
  replies: Comment[];
}

export type CommentEntityType = 'post'; // TODO(api): extend for community posts, etc.

export interface CommentTarget {
  entityType: CommentEntityType;
  entityId: string;
}