import { useCallback, useEffect, useState } from 'react';
import type { CreatePostFormValues, CreatePostMode } from '../types/createPost.types';
import { createEmptyFormValues } from '../types/createPost.types';
import type { Post, PostType } from '../types/post.types';
import type { Community } from '../types/community.types';
import { createPostSchema } from '../validation/createPost.schema';
import { derivePostContent } from '../lib/derivePostContent';
import * as postsService from '../services/posts.service';
import * as communitiesService from '../services/communities.service';
import { usePostsStore } from '../stores/posts.store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import { useTagsInput } from './useTagsInput';

export interface UseCreatePostFormOptions {
  mode: CreatePostMode;
  editingPostId: string | null;
  onDone: () => void;
}

export function useCreatePostForm({ mode, editingPostId, onDone }: UseCreatePostFormOptions) {
  const currentUser = useCurrentUser();
  const addCreatedPost = usePostsStore((s) => s.addCreatedPost);
  const patchPost = usePostsStore((s) => s.patchPost);

  const [values, setValues] = useState<CreatePostFormValues>(createEmptyFormValues());
  const [titleError, setTitleError] = useState<string | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tags = useTagsInput(values.tags, (nextTags) => setValues((v) => ({ ...v, tags: nextTags })));

  useEffect(() => {
    let cancelled = false;
    communitiesService.getCommunitiesForPicker().then((list) => {
      if (!cancelled) setCommunities(list);
    });
    return () => { cancelled = true; };
  }, []);

  const setField = useCallback(<K extends keyof CreatePostFormValues>(key: K, value: CreatePostFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key === 'title') setTitleError(null);
  }, []);

  const setType = useCallback((type: PostType) => setField('type', type), [setField]);

  const setPollOption = useCallback((index: number, value: string) => {
    setValues((v) => {
      const pollOptions = [...v.pollOptions];
      pollOptions[index] = value;
      return { ...v, pollOptions };
    });
  }, []);

  const addPollOption = useCallback(() => {
    setValues((v) => ({ ...v, pollOptions: [...v.pollOptions, ''] }));
  }, []);

  const removePollOption = useCallback((index: number) => {
    setValues((v) => ({ ...v, pollOptions: v.pollOptions.filter((_, i) => i !== index) }));
  }, []);

  const reset = useCallback(() => {
    setValues(createEmptyFormValues());
    setTitleError(null);
  }, []);

  // Hydrates the form from an existing post when opening in edit
  // mode — called by useCreatePostModal once it has the cached post.
  const loadFromPost = useCallback((post: Post) => {
    setValues({
      communityId: post.communityId ?? null,
      type: post.type ?? 'text',
      title: post.title ?? '',
      content: post.type === 'poll' ? '' : post.excerpt ?? '',
      pollQuestion: post.type === 'poll' ? post.excerpt ?? '' : '',
      pollOptions: post.type === 'poll' && post.topics?.length ? post.topics : ['', ''],
      // TODO(product): the mock only stores duration as a "Poll · X"
      // tag string, not a separate field, so it can't be recovered
      // exactly on edit — defaulting to the same default as create.
      pollDuration: '3 days',
      tags: (post.tags ?? []).filter((t) => !t.startsWith('Poll · ')),
      imageFile: null,
      videoFile: null,
      docFile: null,
    });
    setTitleError(null);
  }, []);

  const submit = useCallback(async () => {
    // Commit any half-typed tag first, and validate against the
    // resulting array directly rather than `values.tags` — state
    // updates from commitPending() won't be visible in this closure
    // until the next render, so we thread it through a local
    // candidate object instead.
    const finalTags = tags.commitPending();
    const candidate = { ...values, tags: finalTags };

    const parsed = createPostSchema.safeParse(candidate);
    if (!parsed.success) {
      setTitleError(parsed.error.issues.find((i) => i.path[0] === 'title')?.message ?? 'Title is required');
      return;
    }
    setTitleError(null);
    setIsSubmitting(true);

    try {
      const derived = derivePostContent(candidate);

      if (mode === 'edit' && editingPostId) {
        const updated = await postsService.updatePost(editingPostId, {
          communityId: candidate.communityId,
          title: candidate.title.trim(),
          type: candidate.type,
          tags: derived.tags,
          excerpt: derived.excerpt,
          topics: derived.topics,
          pollVotes: derived.pollVotes,
        });
        patchPost(editingPostId, updated);
      } else {
        const created = await postsService.createPost({
          author: {
            id: currentUser.id,
            name: currentUser.name,
            initials: currentUser.initials,
            avatarColor: currentUser.avatarColor,
            badge: 'Author',
          },
          communityId: candidate.communityId,
          title: candidate.title.trim(),
          type: candidate.type,
          tags: derived.tags,
          excerpt: derived.excerpt,
          topics: derived.topics,
          pollVotes: derived.pollVotes,
        });
        addCreatedPost(created);
      }
      reset();
      onDone();
    } finally {
      setIsSubmitting(false);
    }
  }, [values, tags, mode, editingPostId, currentUser, addCreatedPost, patchPost, reset, onDone]);

  return {
    values,
    titleError,
    communities,
    isSubmitting,
    tags,
    setField,
    setType,
    setPollOption,
    addPollOption,
    removePollOption,
    reset,
    loadFromPost,
    submit,
  } as const;
}