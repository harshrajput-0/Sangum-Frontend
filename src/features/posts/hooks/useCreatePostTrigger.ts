import { useCreatePostStore } from '../stores/createPost.store';

/**
 * The public seam for triggering Create/Edit Post from ANYWHERE in
 * the app — header, mobile nav, a post's own "Edit" menu item, this
 * feature's composer bar. None of those trigger buttons live here
 * except the composer bar; this hook is what all the others call.
 */
export function useCreatePostTrigger() {
  const openCreate = useCreatePostStore((s) => s.openCreate);
  const openEdit = useCreatePostStore((s) => s.openEdit);

  return {
    openCreatePost: openCreate,
    openEditPost: openEdit,
  } as const;
}