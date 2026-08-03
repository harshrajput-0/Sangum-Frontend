// src/features/posts/components/create-post/CreatePostForm.tsx
import { List } from 'lucide-react';

interface CreatePostFormProps {
  title: string;
  content: string;
  tags: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onTagsChange: (value: string) => void;
  onPreview?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
  isSubmitting?: boolean;
}

/**
 * Pure form UI for title / content / tags. All values + handlers are
 * controlled by the caller — wired to `usePostForm()` in the shell.
 *
 * The B / i / list toolbar buttons are visual placeholders for a
 * future rich-text editor integration (Tiptap/Slate/etc.) — no
 * formatting logic lives here.
 */
export function CreatePostForm({
  title,
  content,
  tags,
  onTitleChange,
  onContentChange,
  onTagsChange,
  onPreview,
  onSaveDraft,
  onPublish,
  isSubmitting = false,
}: CreatePostFormProps) {
  return (
    <>
      <div className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-text-muted">Title</label>
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Write a clear and descriptive title"
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-muted">Content</label>
          <div className="overflow-hidden rounded-md border border-border">
            <div className="flex gap-1 border-b border-border bg-bg-elevated px-2.5 py-2">
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-sm font-bold text-text hover:bg-surface-hover">
                B
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-sm italic text-text hover:bg-surface-hover">
                i
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-text hover:bg-surface-hover">
                <List size={16} />
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Write your post content here…"
              className="min-h-[140px] w-full resize-y bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-muted">Tags</label>
          <input
            value={tags}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="Add up to 10 tags…"
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onPreview}
          className="rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover"
        >
          Preview Post
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="flex-1 rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover disabled:opacity-50 sm:flex-none"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onPublish}
            disabled={isSubmitting}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:opacity-50 sm:flex-none"
          >
            Publish Post
          </button>
        </div>
      </div>
    </>
  );
}