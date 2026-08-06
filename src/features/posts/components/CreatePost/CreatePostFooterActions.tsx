import { Button } from '../../../../shared/components/ui';
import type { CreatePostMode } from '../../types/createPost.types';

export interface CreatePostFooterActionsProps {
  mode: CreatePostMode;
  isSubmitting: boolean;
  onCancel: () => void;
  onPublish: () => void;
}

/** "Save Draft" is visually present but intentionally inert — matches the mock, which never wired it to a handler either. TODO(product): wire once draft persistence exists. It's also hidden entirely in edit mode, matching opEditPost(). */
export function CreatePostFooterActions({ mode, isSubmitting, onCancel, onPublish }: CreatePostFooterActionsProps) {
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Publish Post';

  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <div className="flex gap-2">
        {mode !== 'edit' && (
          <Button variant="outline" className="flex-1 sm:flex-none">Save Draft</Button>
        )}
        <Button variant="primary" className="flex-1 sm:flex-none" disabled={isSubmitting} onClick={onPublish}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </div>
  );
}