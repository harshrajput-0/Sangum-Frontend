'use client';

import { useState } from 'react';
import { CommentAvatar } from './CommentAvatar';
import type { CommentAccent } from '../types';

interface CommentComposerProps {
  avatarInitials: string;
  avatarAccent: CommentAccent;
  placeholder: string;
  submitLabel: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  autoFocus?: boolean;
}

export function CommentComposer({
  avatarInitials,
  avatarAccent,
  placeholder,
  submitLabel,
  onSubmit,
  onCancel,
  initialValue = '',
  autoFocus,
}: CommentComposerProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  }

  return (
    <div className="flex gap-3">
      <CommentAvatar initials={avatarInitials} accent={avatarAccent} size="sm" />
      <div className="min-w-0 flex-1">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="min-h-[40px] w-full resize-y rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <div className="mt-2 flex justify-end gap-2">
          {onCancel && (
            <button
              onClick={() => {
                setValue(initialValue);
                onCancel();
              }}
              className="rounded-sm px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-hover"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="rounded-sm bg-primary px-3 py-1.5 text-xs font-semibold text-text-on-primary hover:bg-primary-hover"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}