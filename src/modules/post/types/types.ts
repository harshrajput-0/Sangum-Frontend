// modules/posts/components/types.ts

import type { UserRole } from "@/modules/user/components/UserBadge";

/**
 * Post type is a single enum — Text · Image · Video · Link · Poll — matching
 * the backend model.
 *
 * (This resolves the 3 conflicting versions found in review: one treated
 * media/link/poll as separate post tables with their own endpoints, another
 * had a `kind` string with no shared shape, and a third duplicated `title`
 * across types. This file assumes ONE `PostData` shape with a `type`
 * discriminant — `media`/`link`/`poll` are just optional fields that get
 * populated depending on `type`. Every component below reads from this
 * single shape.)
 */
export type PostType = "text" | "image" | "video" | "link" | "poll";

export interface PostAuthor {
  displayName: string;
  username: string;
  avatarUrl?: string;
  role?: UserRole;
}

export interface PostMediaItem {
  url: string;
  alt?: string;
}

export interface PostLinkData {
  url: string;
  title: string;
  description?: string;
  domain: string;
  imageUrl?: string;
}

export interface PostPollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PostPollData {
  question: string;
  options: PostPollOption[];
  totalVotes: number;
  closesAt?: string | Date;
  /** Option the current viewer already voted for, if any. */
  votedOptionId?: string | null;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares?: number;
}

export interface PostData {
  id: string;
  slug: string;
  type: PostType;
  author: PostAuthor;
  /** Community/group the post was made in, e.g. "MERN Developers" */
  community?: string;
  createdAt: string | Date;
  /** Caption / body text — present on every type, required for "text" */
  body?: string;
  tags?: string[];
  /** Populated when type is "image" or "video" */
  media?: PostMediaItem[];
  /** Populated when type is "link" */
  link?: PostLinkData;
  /** Populated when type is "poll" */
  poll?: PostPollData;
  stats: PostStats;
  isLiked?: boolean;
  isBookmarked?: boolean;
  pinned?: boolean;
}
