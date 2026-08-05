import { Button, Card, Input, ComingSoonBadge } from "@/shared/components/ui";
import type { UseChangePasswordFormResult } from "../../hooks/settings/useChangePasswordForm";

export interface ChangePasswordSectionProps {
  form: UseChangePasswordFormResult;
}

export function ChangePasswordSection({ form }: ChangePasswordSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-text">Change Password</h2>
        <ComingSoonBadge />
      </div>
      <div className="mt-4 grid max-w-sm grid-cols-1 gap-4">
        <Input
          id="settings-current-password"
          label="Current Password"
          type="password"
          value={form.fields.currentPassword}
          error={form.errors.currentPassword}
          onChange={(e) => form.handleFieldChange("currentPassword", e.target.value)}
        />
        <Input
          id="settings-new-password"
          label="New Password"
          type="password"
          helperText="Use at least 8 characters."
          value={form.fields.newPassword}
          error={form.errors.newPassword}
          onChange={(e) => form.handleFieldChange("newPassword", e.target.value)}
        />
        <Input
          id="settings-confirm-password"
          label="Confirm New Password"
          type="password"
          value={form.fields.confirmPassword}
          error={form.errors.confirmPassword}
          onChange={(e) => form.handleFieldChange("confirmPassword", e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => void form.handleSubmit()}
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? "Updating…" : "Update Password"}
        </Button>
        {form.submitSuccess && (
          <span className="text-xs text-success">Password updated</span>
        )}
        {form.submitError && <span className="text-xs text-danger">{form.submitError}</span>}
      </div>
    </Card>
  );
}
