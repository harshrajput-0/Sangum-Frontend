// src/features/posts/index.ts — public API of the feature

export { CreatePostShell } from './components/create-post/CreatePostShell';
export { PostDetailShell } from './components/post-detail/PostDetailShell';

export type {
  PostType,
  PostGroup,
  PostAuthor,
  PostTagItem,
  PostSummary,
  PostComment,
  CreatePostFormValues,
} from './types';