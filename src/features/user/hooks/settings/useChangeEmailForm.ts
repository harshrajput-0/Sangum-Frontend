import { useCallback, useState } from "react";
import { changeEmail } from "../../services/account.service";
import { createChangeEmailSchema } from "../../validation/changeEmail.schema";
import type { ChangeEmailFormData, FieldErrors } from "../../types/profile.types";

export interface UseChangeEmailFormResult {
  fields: ChangeEmailFormData;
  errors: FieldErrors<ChangeEmailFormData>;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleFieldChange: (value: string) => void;
  handleSubmit: () => Promise<boolean>;
}

export function useChangeEmailForm(currentEmail: string): UseChangeEmailFormResult {
  const [fields, setFields] = useState<ChangeEmailFormData>({ newEmail: "" });
  const [errors, setErrors] = useState<FieldErrors<ChangeEmailFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFieldChange = useCallback((value: string) => {
    setFields({ newEmail: value });
    setSubmitSuccess(false);
  }, []);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    const schema = createChangeEmailSchema(currentEmail);
    const result = schema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors<ChangeEmailFormData> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ChangeEmailFormData;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await changeEmail(result.data);
      setSubmitSuccess(true);
      setFields({ newEmail: "" });
      return true;
    } catch {
      setSubmitError("We couldn't update your email. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, currentEmail]);

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
