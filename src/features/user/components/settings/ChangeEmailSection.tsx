import { Button, Card, Input, ComingSoonBadge } from "@/shared/components/ui";
import type { UseChangeEmailFormResult } from "../../hooks/settings/useChangeEmailForm";

export interface ChangeEmailSectionProps {
  form: UseChangeEmailFormResult;
}

export function ChangeEmailSection({ form }: ChangeEmailSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-text">Change Email</h2>
        <ComingSoonBadge />
      </div>
      <div className="mt-4 max-w-sm">
        <Input
          id="settings-new-email"
          label="New Email"
          type="email"
          value={form.fields.newEmail}
          error={form.errors.newEmail}
          onChange={(e) => form.handleFieldChange(e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => void form.handleSubmit()}
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? "Updating…" : "Update Email"}
        </Button>
        {form.submitSuccess && <span className="text-xs text-success">Request sent</span>}
        {form.submitError && <span className="text-xs text-danger">{form.submitError}</span>}
      </div>
    </Card>
  );
}
