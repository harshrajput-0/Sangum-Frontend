import { Button, Card, Checkbox, Select } from "@/shared/components/ui";

import { SegmentedControl } from "../primitives/SegmentedControl";
import { DEACTIVATE_REASONS } from "../../constants/profile.constants";
import type { UseDeactivateAccountResult } from "../../hooks/settings/useDeactivateAccount";
import type { DeactivateOption } from "../../types/profile.types";

export interface DeactivateAccountSectionProps {
  form: UseDeactivateAccountResult;
}

const OPTIONS: { value: DeactivateOption; label: string }[] = [
  { value: "temporary", label: "Deactivate temporarily" },
  { value: "permanent", label: "Delete permanently" },
];

const REASON_OPTIONS = DEACTIVATE_REASONS.map((reason) => ({
  value: reason,
  label: reason,
}));

export function DeactivateAccountSection({ form }: DeactivateAccountSectionProps) {
  return (
    <Card className="border-danger/30">
      <h2 className="text-sm font-semibold text-danger">Deactivate Account</h2>
      <p className="mt-1 text-xs text-text-muted">
        This action affects your account&apos;s visibility and data. Choose carefully.
      </p>

      <div className="mt-4">
        <SegmentedControl options={OPTIONS} value={form.option} onChange={form.setOption} />
      </div>

      <Select
        id="deactivate-reason"
        label="Reason (optional)"
        containerClassName="mt-4 max-w-sm"
        placeholder="Select a reason"
        options={REASON_OPTIONS}
        value={form.reason}
        onChange={(e) => form.setReason(e.target.value)}
      />

      <div className="mt-4">
        <Checkbox
          checked={form.confirmChecked}
          onChange={form.setConfirmChecked}
          label={form.confirmText}
        />
        {form.errors.confirmChecked && (
          <p className="mt-1 text-xs text-danger">{form.errors.confirmChecked}</p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="danger"
          onClick={() => void form.handleSubmit()}
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? "Processing…" : form.submitLabel}
        </Button>
        {form.submitError && <span className="text-xs text-danger">{form.submitError}</span>}
      </div>
    </Card>
  );
}
