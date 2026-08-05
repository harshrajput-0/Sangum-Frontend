import { Button } from "@/shared/components/ui";

export interface StickySaveBarProps {
  isVisible: boolean;
  isSubmitting: boolean;
  submitError?: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export function StickySaveBar({
  isVisible,
  isSubmitting,
  submitError,
  onSave,
  onCancel,
}: StickySaveBarProps) {
  if (!isVisible) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between gap-3 rounded-lg border border-border bg-bg-elevated px-4 py-3 shadow-lg">
      <div>
        <p className="text-sm font-medium text-text">You have unsaved changes</p>
        {submitError && <p className="mt-0.5 text-xs text-danger">{submitError}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Discard
        </Button>
        <Button variant="primary" onClick={onSave} disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
