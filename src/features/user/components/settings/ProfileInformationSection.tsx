import { Button, Card, Input } from "@/shared/components/ui";

import type { UseAccountInfoFormResult } from "../../hooks/settings/useAccountInfoForm";

export interface ProfileInformationSectionProps {
  form: UseAccountInfoFormResult;
}

export function ProfileInformationSection({ form }: ProfileInformationSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Profile Information</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="settings-full-name"
          label="Full Name"
          value={form.fields.fullName}
          error={form.errors.fullName}
          onChange={(e) => form.handleFieldChange("fullName", e.target.value)}
        />
        <Input
          id="settings-username"
          label="Username"
          value={form.fields.username}
          error={form.errors.username}
          onChange={(e) => form.handleFieldChange("username", e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="primary"
          onClick={() => void form.handleSubmit()}
          disabled={!form.isDirty || form.isSubmitting}
        >
          {form.isSubmitting ? "Saving…" : "Save Changes"}
        </Button>
        {form.submitSuccess && <span className="text-xs text-success">Saved</span>}
        {form.submitError && <span className="text-xs text-danger">{form.submitError}</span>}
      </div>
    </Card>
  );
}
