import { create } from 'zustand';
import type { CreatePostMode } from '../types/createPost.types';

interface CreatePostState {
  isOpen: boolean;
  mode: CreatePostMode;
  editingPostId: string | null;
  openCreate: () => void;
  openEdit: (postId: string) => void;
  close: () => void;
}

/**
 * The cross-tree trigger seam: any button anywhere in the app — this
 * feature's own composer bar, a header "Create Post" button, a mobile
 * nav "+" (none of which live in this feature) — opens the same
 * modal by calling openCreate()/openEdit() via useCreatePostTrigger().
 */
export const useCreatePostStore = create<CreatePostState>((set) => ({
  isOpen: false,
  mode: 'create',
  editingPostId: null,
  openCreate: () => set({ isOpen: true, mode: 'create', editingPostId: null }),
  openEdit: (postId) => set({ isOpen: true, mode: 'edit', editingPostId: postId }),
  close: () => set({ isOpen: false, editingPostId: null }),
}));