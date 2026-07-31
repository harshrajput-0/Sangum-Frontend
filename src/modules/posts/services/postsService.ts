// src/features/posts/services/postsService.ts
import type { CreatePostFormValues } from '../types';

/**
 * All Post-feature API communication lives here — no React, no UI.
 * Replace the bodies below with real HTTP calls once the endpoints exist.
 */
export const postsService = {
  async saveDraft(values: CreatePostFormValues): Promise<void> {
    // TODO: POST /api/posts/drafts
    console.log('saveDraft', values);
  },

  async publishPost(values: CreatePostFormValues): Promise<void> {
    // TODO: POST /api/posts
    console.log('publishPost', values);
  },

  async toggleLike(postId: string): Promise<void> {
    // TODO: POST /api/posts/:postId/like
  },

  async toggleSave(postId: string): Promise<void> {
    // TODO: POST /api/posts/:postId/save
  },

  async addComment(postId: string, content: string): Promise<void> {
    // TODO: POST /api/posts/:postId/comments
  },

  async toggleFollow(authorId: string): Promise<void> {
    // TODO: POST /api/authors/:authorId/follow
  },
};