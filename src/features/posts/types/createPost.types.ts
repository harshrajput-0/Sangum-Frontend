import type { PostAuthor, PostType } from './post.types';

export type CreatePostMode = 'create' | 'edit';

export interface CreatePostFormValues {
  communityId: string | null;
  type: PostType;
  title: string;
  content: string; // unified field for text body / image caption / video caption / doc description
  pollQuestion: string; // poll only — separate from `title`, matches the mock's cpPollQuestion field
  pollOptions: string[];
  pollDuration: '1 day' | '3 days' | '1 week';
  tags: string[];
  imageFile?: File | null;
  videoFile?: File | null;
  docFile?: File | null;
}

export function createEmptyFormValues(): CreatePostFormValues {
  return {
    communityId: null,
    type: 'text',
    title: '',
    content: '',
    pollQuestion: '',
    pollOptions: ['', ''],
    pollDuration: '3 days',
    tags: [],
    imageFile: null,
    videoFile: null,
    docFile: null,
  };
}

/**
 * What posts.service needs to persist a post — the derived
 * excerpt/topics/tags (see lib/derivePostContent.ts) plus author
 * identity. Kept separate from CreatePostFormValues since the form
 * shape and the persisted-post shape genuinely differ (e.g. poll
 * duration only exists as a tag suffix once persisted).
 */
export interface CreatePostServiceInput {
  author: PostAuthor;
  communityId: string | null;
  title: string;
  type: PostType;
  tags: string[];
  excerpt: string;
  topics: string[];
  pollVotes?: number[];
}