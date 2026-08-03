import { useCallback, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validation/register.schema";
import { AUTH_ROUTES } from "../constants/auth.constants";
import { calculatePasswordStrength } from "../utils/passwordStrength";
import type { AuthApiError, SocialProvider } from "../types/auth.types";

type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>;

const INITIAL_VALUES: RegisterFormValues = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  agreeToTerms: false,
};

export function useRegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrengthScore = useMemo(
    () => calculatePasswordStrength(values.password),
    [values.password],
  );

  const handleChange = useCallback(
    (field: keyof RegisterFormValues, value: string | boolean) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitError(null);

      const result = registerSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof RegisterFormValues;
          fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const { fullName, username, email, password } = result.data;
        const { email: confirmedEmail } = await authService.register({
          fullName,
          username,
          email,
          password,
        });
        router.push(
          `${AUTH_ROUTES.verifyEmail}?email=${encodeURIComponent(confirmedEmail)}`,
        );
      } catch (error) {
        const apiError = error as AuthApiError;
        setSubmitError(
          apiError.message ??
            "Unable to create your account. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, router],
  );

  const handleSocialLogin = useCallback((provider: SocialProvider) => {
    authService.loginWithProvider(provider);
  }, []);

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    showPassword,
    passwordStrengthScore,
    toggleShowPassword,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
}