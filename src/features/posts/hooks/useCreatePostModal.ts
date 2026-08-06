import { useEffect } from 'react';
import { useCreatePostStore } from '../stores/createPost.store';
import { usePostsStore } from '../stores/posts.store';
import { useCreatePostForm } from './useCreatePostForm';

/**
 * Composition point for the globally-mounted CreatePostModalShell:
 * reads the open/mode/editingPostId seam and, in edit mode, hydrates
 * the form from the already-cached post (same normalized store the
 * Feed/Profile read from — no extra fetch needed).
 */
export function useCreatePostModal() {
  const isOpen = useCreatePostStore((s) => s.isOpen);
  const mode = useCreatePostStore((s) => s.mode);
  const editingPostId = useCreatePostStore((s) => s.editingPostId);
  const close = useCreatePostStore((s) => s.close);
  const postsById = usePostsStore((s) => s.posts);

  const form = useCreatePostForm({ mode, editingPostId, onDone: close });

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'edit' && editingPostId) {
      const existing = postsById[editingPostId];
      if (existing) form.loadFromPost(existing);
    } else if (mode === 'create') {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, editingPostId, isOpen]);

  return { isOpen, mode, close, form } as const;
}