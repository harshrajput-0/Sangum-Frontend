// src/features/posts/types.ts

export type PostType = 'text' | 'image' | 'video' | 'link' | 'poll';

export type AvatarVariant = 'primary' | 'success' | 'info' | 'neutral';

export interface PostGroup {
  id: string;
  name: string;
  avatarLabel: string;
  avatarVariant?: AvatarVariant;
  visibility?: string;
  memberCount?: string;
}

export interface PostAuthor {
  id: string;
  name: string;
  avatarLabel: string;
  avatarVariant?: AvatarVariant;
  role?: string;
  title?: string;
}

export interface PostTagItem {
  id: string;
  label: string;
}

export interface PostStats {
  likes: number;
  commentCount: number;
}

export interface PostExpandedContent {
  coverImageUrl?: string;
  keyTopics?: string[];
}

export interface PostSummary {
  id: string;
  title: string;
  author: PostAuthor;
  date: string;
  edited?: boolean;
  pinned?: boolean;
  tags: PostTagItem[];
  excerpt: string;
  expandedContent?: PostExpandedContent;
  stats: PostStats;
}

export interface PostComment {
  id: string;
  author: PostAuthor;
  date: string;
  content: string;
  likes: number;
  isAdmin?: boolean;
}

export interface CreatePostFormValues {
  groupId: string;
  type: PostType;
  title: string;
  content: string;
  tags: string;
}