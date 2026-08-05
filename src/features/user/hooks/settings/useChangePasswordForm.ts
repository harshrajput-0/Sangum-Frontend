import { useCallback, useState } from "react";
import { changePassword } from "../../services/account.service";
import { changePasswordSchema } from "../../validation/changePassword.schema";
import type { ChangePasswordFormData, FieldErrors } from "../../types/profile.types";

const EMPTY_FIELDS: ChangePasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export interface UseChangePasswordFormResult {
  fields: ChangePasswordFormData;
  errors: FieldErrors<ChangePasswordFormData>;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleFieldChange: (field: keyof ChangePasswordFormData, value: string) => void;
  handleSubmit: () => Promise<boolean>;
}

export function useChangePasswordForm(): UseChangePasswordFormResult {
  const [fields, setFields] = useState<ChangePasswordFormData>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<FieldErrors<ChangePasswordFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFieldChange = useCallback(
    (field: keyof ChangePasswordFormData, value: string) => {
      setFields((prev) => ({ ...prev, [field]: value }));
      setSubmitSuccess(false);
    },
    [],
  );

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    const result = changePasswordSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors<ChangePasswordFormData> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ChangePasswordFormData;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await changePassword(result.data);
      setSubmitSuccess(true);
      setFields(EMPTY_FIELDS);
      return true;
    } catch {
      setSubmitError("We couldn't update your password. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fields]);

  return {
    fields,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleFieldChange,
    handleSubmit,
  };
}
