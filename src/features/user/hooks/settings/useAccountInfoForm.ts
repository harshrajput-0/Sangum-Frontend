import { useCallback, useMemo, useState } from "react";
import { updateAccountInfo } from "../../services/account.service";
import { accountInfoSchema } from "../../validation/accountInfo.schema";
import type {
  AccountInfoFormData,
  FieldErrors,
  ProfileData,
} from "../../types/profile.types";

export interface UseAccountInfoFormResult {
  fields: AccountInfoFormData;
  errors: FieldErrors<AccountInfoFormData>;
  isDirty: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleFieldChange: <K extends keyof AccountInfoFormData>(
    field: K,
    value: AccountInfoFormData[K],
  ) => void;
  handleSubmit: () => Promise<boolean>;
}

export function useAccountInfoForm(profile: ProfileData): UseAccountInfoFormResult {
  const initialFields = useMemo<AccountInfoFormData>(
    () => ({ fullName: profile.fullName, username: profile.username }),
    [profile],
  );
  const [fields, setFields] = useState<AccountInfoFormData>(initialFields);
  const [errors, setErrors] = useState<FieldErrors<AccountInfoFormData>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFieldChange = useCallback(
    <K extends keyof AccountInfoFormData>(field: K, value: AccountInfoFormData[K]) => {
      setFields((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);
      setSubmitSuccess(false);
    },
    [],
  );

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    const result = accountInfoSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors<AccountInfoFormData> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof AccountInfoFormData;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await updateAccountInfo(result.data);
      setIsDirty(false);
      setSubmitSuccess(true);
      return true;
    } catch {
      setSubmitError("We couldn't save your changes. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fields]);

  return {
    fields,
    errors,
    isDirty,
    isSubmitting,
    submitError,
    submitSuccess,
    handleFieldChange,
    handleSubmit,
  };
}
