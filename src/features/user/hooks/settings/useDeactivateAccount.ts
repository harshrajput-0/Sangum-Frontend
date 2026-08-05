import { useCallback, useMemo, useState } from "react";
import { deactivateAccount } from "../../services/account.service";
import {
  getDeactivateConfirmText,
  getDeactivateSubmitLabel,
} from "../../lib/deactivateCopy";
import { deactivateAccountSchema } from "../../validation/deactivateAccount.schema";
import type {
  DeactivateAccountFormData,
  DeactivateOption,
  FieldErrors,
} from "../../types/profile.types";

export interface UseDeactivateAccountResult {
  option: DeactivateOption;
  reason: string;
  confirmChecked: boolean;
  confirmText: string;
  submitLabel: string;
  errors: FieldErrors<DeactivateAccountFormData>;
  isSubmitting: boolean;
  submitError: string | null;
  setOption: (option: DeactivateOption) => void;
  setReason: (reason: string) => void;
  setConfirmChecked: (checked: boolean) => void;
  handleSubmit: () => Promise<boolean>;
}

export function useDeactivateAccount(): UseDeactivateAccountResult {
  const [option, setOption] = useState<DeactivateOption>("temporary");
  const [reason, setReason] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<DeactivateAccountFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const confirmText = useMemo(() => getDeactivateConfirmText(option), [option]);
  const submitLabel = useMemo(() => getDeactivateSubmitLabel(option), [option]);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    const payload: DeactivateAccountFormData = { option, reason, confirmChecked };
    const result = deactivateAccountSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: FieldErrors<DeactivateAccountFormData> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DeactivateAccountFormData;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await deactivateAccount(result.data);
      return true;
    } catch {
      setSubmitError("We couldn't process this request. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [option, reason, confirmChecked]);

  return {
    option,
    reason,
    confirmChecked,
    confirmText,
    submitLabel,
    errors,
    isSubmitting,
    submitError,
    setOption,
    setReason,
    setConfirmChecked,
    handleSubmit,
  };
}
