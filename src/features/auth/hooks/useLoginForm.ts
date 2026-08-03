import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { loginSchema, type LoginFormValues } from "../validation/login.schema";
import type { AuthApiError, SocialProvider } from "../types/auth.types";

type FieldErrors = Partial<Record<keyof LoginFormValues, string>>;

const INITIAL_VALUES: LoginFormValues = {
  identifier: "",
  password: "",
  rememberMe: false,
};

export function useLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback(
    (field: keyof LoginFormValues, value: string | boolean) => {
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

      const result = loginSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof LoginFormValues;
          fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await authService.login(result.data);
        // TODO: point this at your actual post-login destination
        router.push("/");
      } catch (error) {
        const apiError = error as AuthApiError;
        setSubmitError(
          apiError.message ?? "Unable to log in. Please try again.",
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
    toggleShowPassword,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
}