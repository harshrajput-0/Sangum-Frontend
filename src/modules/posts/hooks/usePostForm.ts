// src/features/posts/hooks/usePostForm.ts
import { useState } from 'react';
import type { PostType, PostGroup, CreatePostFormValues } from '../types';
import { postsService } from '../services/postsService';

/**
 * Owns all Create Post business logic: field state, type selection,
 * validation, and calling postsService to save/publish.
 *
 * PLACEHOLDER: local useState stands in for now. Promote this to a
 * `createPost.store.ts` Zustand store only if the draft needs to
 * persist across route changes (e.g. autosave); otherwise this hook
 * is enough per-feature-store rules.
 */
export function usePostForm(activeGroup: PostGroup) {
  const [type, setType] = useState<PostType>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildValues = (): CreatePostFormValues => ({
    groupId: activeGroup.id,
    type,
    title,
    content,
    tags,
  });

  const handleChangeGroup = () => {
    // TODO: open group picker (modal/drawer), update active group on selection
  };

  const handlePreview = () => {
    // TODO: navigate to / open a preview using buildValues()
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      await postsService.saveDraft(buildValues());
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      await postsService.publishPost(buildValues());
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    type,
    setType,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    isSubmitting,
    handleChangeGroup,
    handlePreview,
    handleSaveDraft,
    handlePublish,
  };
}