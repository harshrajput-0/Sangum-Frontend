import { useCallback, useState, type FormEvent } from "react";
import { authService } from "../services/auth.service";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../validation/forgotPassword.schema";
import type { AuthApiError } from "../types/auth.types";

type FieldErrors = Partial<Record<keyof ForgotPasswordFormValues, string>>;

const INITIAL_VALUES: ForgotPasswordFormValues = { email: "" };

export function useForgotPasswordForm() {
  const [values, setValues] =
    useState<ForgotPasswordFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback(
    (field: keyof ForgotPasswordFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitError(null);

      const result = forgotPasswordSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof ForgotPasswordFormValues;
          fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await authService.requestPasswordReset(result.data);
        setIsSubmitted(true);
      } catch (error) {
        const apiError = error as AuthApiError;
        setSubmitError(
          apiError.message ??
            "Unable to send the reset link. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [values],
  );

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
  };
}