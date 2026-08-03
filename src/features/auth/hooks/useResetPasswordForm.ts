import { useCallback, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../validation/resetPassword.schema";
import { AUTH_ROUTES } from "../constants/auth.constants";
import { calculatePasswordStrength } from "../utils/passwordStrength";
import type { AuthApiError } from "../types/auth.types";

type FieldErrors = Partial<Record<keyof ResetPasswordFormValues, string>>;

const INITIAL_VALUES: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

/**
 * @param token - the reset token from the `?token=` query param, read
 * server-side in app/(auth)/reset-password/page.tsx and passed down
 * as a plain prop through ResetPasswordShell.
 */
export function useResetPasswordForm(token: string | undefined) {
  const router = useRouter();
  const [values, setValues] =
    useState<ResetPasswordFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasValidToken = Boolean(token);

  const passwordStrengthScore = useMemo(
    () => calculatePasswordStrength(values.password),
    [values.password],
  );

  const handleChange = useCallback(
    (field: keyof ResetPasswordFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const toggleShowPassword = useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  );
  const toggleShowConfirmPassword = useCallback(
    () => setShowConfirmPassword((prev) => !prev),
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitError(null);

      if (!token) {
        setSubmitError("This reset link is invalid or has expired.");
        return;
      }

      const result = resetPasswordSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof ResetPasswordFormValues;
          fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await authService.resetPassword({
          token,
          password: result.data.password,
        });
        router.push(AUTH_ROUTES.login);
      } catch (error) {
        const apiError = error as AuthApiError;
        setSubmitError(
          apiError.message ??
            "Unable to reset your password. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [token, values, router],
  );

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    hasValidToken,
    showPassword,
    showConfirmPassword,
    passwordStrengthScore,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleChange,
    handleSubmit,
  };
}