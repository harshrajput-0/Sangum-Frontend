// src/features/posts/constants.ts
import type { PostType } from './types';

export const POST_TYPE_OPTIONS: Array<{ id: PostType; label: string }> = [
  { id: 'text', label: 'Text' },
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
  { id: 'link', label: 'Link' },
  { id: 'poll', label: 'Poll' },
];

export const MAX_TAGS = 10;