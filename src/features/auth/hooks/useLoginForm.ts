import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { loginSchema } from "../validation/login.schema";
import { resolveOnboardingRoute } from "../utils/resolveOnboardingRoute";
import type { AuthApiError, SocialProvider } from "../types/auth.types";

interface LoginValues {
  email: string;
  password: string;
}

type FieldErrors = Partial<Record<"email" | "password", string>>;

const INITIAL_VALUES: LoginValues = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((field: keyof LoginValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitError(null);

      const result = loginSchema.safeParse({
        email: values.email,
        password: values.password,
      });
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof FieldErrors;
          fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const user = await authService.login(result.data);
        router.push(resolveOnboardingRoute(user));
      } catch (error) {
        const apiError = error as AuthApiError;
        // Covers 401 (wrong credentials), 403 (deactivated), and 429
        // (5 failed attempts locks the account 30 min) — the backend's
        // message already distinguishes these, shown as-is.
        setSubmitError(apiError.message ?? "Unable to log in. Please try again.");
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
    toggleShowPassword,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
}