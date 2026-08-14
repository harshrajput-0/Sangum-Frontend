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
 * @param token - the reset token, read server-side from the dynamic
 * route segment in app/(auth)/reset-password/[token]/page.tsx and
 * passed down as a plain prop through ResetPasswordShell. Always a
 * non-empty string when this route matches — an invalid/expired/
 * already-used token is a submit-time error from the backend, not a
 * routing concern.
 */
export function useResetPasswordForm(token: string) {
  const router = useRouter();
  const [values, setValues] = useState<ResetPasswordFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);
  const toggleShowConfirmPassword = useCallback(
    () => setShowConfirmPassword((prev) => !prev),
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitError(null);

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
        await authService.resetPassword({ token, newPassword: result.data.password });
        // Backend invalidates every existing session on a successful
        // reset, so there's nowhere to land but a fresh login.
        router.push(AUTH_ROUTES.login);
      } catch (error) {
        const apiError = error as AuthApiError;
        // 400 covers invalid, expired, AND already-used tokens — the
        // backend's message already distinguishes these.
        setSubmitError(
          apiError.message ?? "Unable to reset your password. Please try again.",
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
    showPassword,
    showConfirmPassword,
    passwordStrengthScore,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleChange,
    handleSubmit,
  };
}