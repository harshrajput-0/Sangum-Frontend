import type { KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Badge } from '../../../../shared/components/ui';

export interface TagsInputProps {
  tags: string[];
  draft: string;
  isAtLimit: boolean;
  onDraftChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (index: number) => void;
}

export function TagsInput({ tags, draft, isAtLimit, onDraftChange, onKeyDown, onRemoveTag }: TagsInputProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-text-muted">Tags</label>
      <div className="flex w-full flex-wrap items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-2.5 py-2 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20">
        {tags.map((tag, index) => (
          <Badge key={tag} tone="neutral" className="gap-1 pr-1">
            {tag}
            <button type="button" onClick={() => onRemoveTag(index)} className="rounded-full p-0.5 hover:bg-surface-hover" aria-label={`Remove ${tag}`}>
              <X size={11} />
            </button>
          </Badge>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isAtLimit}
          placeholder={isAtLimit ? 'Tag limit reached' : 'Add up to 10 tags…'}
          className="min-w-30 flex-1 bg-transparent px-1 py-1 text-sm text-text outline-none placeholder:text-text-muted disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}