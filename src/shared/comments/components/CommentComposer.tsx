import type { KeyboardEvent } from 'react';
import { Avatar, Textarea, Button } from '../../components/ui';

export interface CommentComposerProps {
  authorInitials: string;
  authorColor: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitDisabled: boolean;
  placeholder?: string;
  submitLabel?: string;
  size?: 'default' | 'compact';
}

/** Purely presentational — reused for the top-level composer and every reply composer via `size`. */
export function CommentComposer({
  authorInitials,
  authorColor,
  value,
  onChange,
  onKeyDown,
  onSubmit,
  onCancel,
  isSubmitDisabled,
  placeholder = 'Write a comment…',
  submitLabel = 'Comment',
  size = 'default',
}: CommentComposerProps) {
  const isCompact = size === 'compact';

  return (
    <div className="flex gap-3">
      <Avatar initials={authorInitials} color={authorColor} size={isCompact ? 'sm' : 'md'} />
      <div className="min-w-0 flex-1">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          resize="y"
          rows={isCompact ? 2 : 3}
          className={isCompact ? 'min-h-[40px] text-sm' : 'min-h-[46px] text-sm'}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" disabled={isSubmitDisabled} onClick={onSubmit}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}