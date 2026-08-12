'use client';

import { useCallback, useState, type KeyboardEvent } from 'react';
import { useActiveComposer } from './useActiveComposer';

export interface UseCommentComposerOptions {
  composerId: string; // unique per instance, e.g. `composer-${postId}` or `reply-${commentId}`
  onSubmit: (text: string) => void;
  submitOnEnter?: boolean;
}

/**
 * Local state + submit wiring for one comment/reply composer.
 * Field names on the returned object intentionally match
 * CommentComposer's props 1:1, so callers can pass it straight
 * through without remapping.
 */
export function useCommentComposer({ composerId, onSubmit, submitOnEnter = true }: UseCommentComposerOptions) {
  const [value, setValue] = useState('');
  const { isActive, activate, deactivate } = useActiveComposer(composerId);

  const open = useCallback(() => activate(), [activate]);
  const close = useCallback(() => {
    setValue('');
    deactivate();
  }, [deactivate]);
  const toggle = useCallback(() => (isActive ? close() : open()), [isActive, open, close]);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue(''); // matches the mock: submitting clears the box but leaves it open
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (submitOnEnter && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit, submitOnEnter]
  );

  return {
    value,
    isOpen: isActive,
    isSubmitDisabled: value.trim().length === 0,
    onChange: setValue,
    onKeyDown: handleKeyDown,
    onSubmit: submit,
    onCancel: close,
    open,
    toggle,
  } as const;
}

export type UseCommentComposerReturn = ReturnType<typeof useCommentComposer>;