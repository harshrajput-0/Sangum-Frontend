// src/features/posts/components/post-detail/CommentComposer.tsx
import { Avatar } from '../primitives/Avatar';

interface CommentComposerProps {
  currentUserAvatarLabel: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Textarea for a new comment. Submission is wired up by the caller. */
export function CommentComposer({
  currentUserAvatarLabel,
  value,
  onChange,
  placeholder = 'Write a comment…',
}: CommentComposerProps) {
  return (
    <div className="mb-4 flex gap-3">
      <Avatar label={currentUserAvatarLabel} size="md" />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[46px] flex-1 resize-y rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
      />
    </div>
  );
}