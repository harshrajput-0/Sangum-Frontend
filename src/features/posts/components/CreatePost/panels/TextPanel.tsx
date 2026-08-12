import { Bold, Italic, List } from 'lucide-react';

export interface TextPanelProps {
  content: string;
  onChange: (value: string) => void;
}

/**
 * The formatting toolbar (Bold/Italic/List) is decorative in the mock
 * — no rich-text logic backs it, just plain textarea content.
 * Uses a raw textarea rather than the shared Textarea primitive since
 * it needs to visually merge with the toolbar above it (no border/
 * radius of its own) — every other panel below uses the primitive.
 */
export function TextPanel({ content, onChange }: TextPanelProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-text-muted">Content</label>
      <div className="overflow-hidden rounded-md border border-border">
        <div className="flex gap-1 border-b border-border bg-bg-elevated px-2.5 py-2">
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-text hover:bg-surface-hover">
            <Bold size={14} />
          </button>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-text hover:bg-surface-hover">
            <Italic size={14} />
          </button>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-text hover:bg-surface-hover">
            <List size={16} />
          </button>
        </div>
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your post content here…"
          rows={6}
          className="min-h-35 w-full resize-y bg-bg-elevated px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none"
        />
      </div>
    </div>
  );
}