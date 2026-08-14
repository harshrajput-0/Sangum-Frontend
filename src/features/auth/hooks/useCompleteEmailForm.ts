import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import {
  completeEmailSchema,
  type CompleteEmailFormValues,
} from "../validation/completeEmail.schema";
import { resolveOnboardingRoute } from "../utils/resolveOnboardingRoute";
import { AUTH_ROUTES } from "../constants/auth.constants";
import type { AuthApiError } from "../types/auth.types";

type FieldErrors = Partial<Record<keyof CompleteEmailFormValues, string>>;

const INITIAL_VALUES: CompleteEmailFormValues = { email: "" };

export function useCompleteEmailForm() {
  const router = useRouter();
  const [values, setValues] = useState<CompleteEmailFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (field: keyof CompleteEmailFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitError(null);

      const result = completeEmailSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof CompleteEmailFormValues;
          fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        // Backend sets the email and sends a verification email —
        // account is now in the same state as a fresh registration
        // that hasn't verified yet, so resolveOnboardingRoute() will
        // land on verify-email.
        const user = await authService.completeEmail(result.data);
        const destination = resolveOnboardingRoute(user);
        const target =
          destination === AUTH_ROUTES.verifyEmail
            ? `${destination}?email=${encodeURIComponent(result.data.email)}`
            : destination;
        router.push(target);
      } catch (error) {
        const apiError = error as AuthApiError;
        setSubmitError(apiError.message ?? "Unable to save your email. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, router],
  );

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}