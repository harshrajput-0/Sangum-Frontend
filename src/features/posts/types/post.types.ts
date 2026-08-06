export type PostType = 'text' | 'image' | 'video' | 'doc' | 'poll';

/**
 * Loosely typed on purpose — the backend is still in development.
 * Only `id` is required; everything else is optional with fallbacks
 * applied wherever it's consumed (hooks/components), and the index
 * signature lets extra API fields pass through without breaking the
 * build. TODO(api): tighten once /api/posts is finalized.
 */
export interface PostAuthor {
  id: string;
  name?: string;
  initials?: string;
  avatarColor?: string;
  badge?: string | null;
  [key: string]: unknown;
}

export interface Post {
  id: string;
  author?: PostAuthor;
  date?: string;
  title?: string;
  type?: PostType;
  tags?: string[];
  excerpt?: string;
  topics?: string[];
  image?: string;
  imageAspect?: '4:5' | '5:3' | '16:9';
  pollVotes?: number[];
  pollVotedIndex?: number | null;
  likes?: number;
  likedByCurrentUser?: boolean;
  savedByCurrentUser?: boolean;
  commentCount?: number;
  followedByCurrentUser?: boolean;
  pinned?: boolean;
  edited?: boolean;
  communityId?: string | null;
  [key: string]: unknown;
}