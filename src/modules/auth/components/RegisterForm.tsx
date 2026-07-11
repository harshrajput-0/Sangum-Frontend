// modules/auth/components/RegisterForm.tsx

import React, { useCallback, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { FormField, fieldControlClass } from "@/shared/components/form/FormField";
import PasswordInput from "@/shared/components/form/PasswordInput";
import { Checkbox } from "@/shared/components/ui/Checkbox";


/**
 * RegisterForm
 * ------------
 * Fully controlled, self-validating sign-up form built from the shared
 * FormField / PasswordInput / Checkbox primitives. The form owns its own
 * field state and client-side validation; the consumer only has to supply
 * an `onSubmit` handler and (optionally) a server-side `submitError`.
 *
 * Usage:
 *   <RegisterForm
 *     isLoading={isPending}
 *     submitError={apiError}
 *     onSubmit={async (values) => { await register(values); }}
 *     onSignInClick={() => navigate("/login")}
 *   />
 */


export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

// Defines what the parent must provide 
export interface RegisterFormProps {
  /** Called with the validated values once the form passes client-side checks */
  onSubmit: (values: RegisterFormValues) => void | Promise<void>;
  /** Disables inputs/button and swaps the button label (e.g. while a request is in flight) */
  isLoading?: boolean;
  /** Server/async error shown above the submit button, e.g. "Email already registered" */
  submitError?: string;
  /** Minimum accepted password length (client-side check only) */
  minPasswordLength?: number;
  /** Initial values, useful for pre-filling (e.g. invited email) */
  defaultValues?: Partial<RegisterFormValues>;
  /** href for the Terms of Service link */
  termsHref?: string;
  /** href for the Privacy Policy link */
  privacyHref?: string;
  /** Extra classes for the outer <form> */
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm({
  onSubmit,
  isLoading = false,
  submitError,
  minPasswordLength = 8,
  defaultValues,
  termsHref = "#",
  privacyHref = "#",
  className,
}: RegisterFormProps) {

  // Stores the form state 
  const [values, setValues] = useState<RegisterFormValues>({
    fullName: defaultValues?.fullName ?? "",
    email: defaultValues?.email ?? "",
    password: "",
    confirmPassword: "",
    agreeToTerms: defaultValues?.agreeToTerms ?? false,
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const setField = useCallback(
    <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    },
    []
  );

  const validate = (v: RegisterFormValues): RegisterFormErrors => {
    const next: RegisterFormErrors = {};

    if (!v.fullName.trim()) next.fullName = "Enter your full name.";

    if (!v.email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(v.email)) next.email = "Enter a valid email address.";

    if (!v.password) next.password = "Enter a password.";
    else if (v.password.length < minPasswordLength)
      next.password = `Password must be at least ${minPasswordLength} characters.`;

    if (!v.confirmPassword) next.confirmPassword = "Confirm your password.";
    else if (v.confirmPassword !== v.password) next.confirmPassword = "Passwords do not match.";

    if (!v.agreeToTerms) next.agreeToTerms = "You must accept the terms to continue.";

    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(values);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("w-full flex flex-col gap-(--sp-4)", className)}
    >
      <FormField label="Full Name" htmlFor="register-full-name" required error={errors.fullName}>
        <input
          id="register-full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          disabled={isLoading}
          value={values.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          className={fieldControlClass(!!errors.fullName)}
        />
      </FormField>

      <FormField label="Email Address" htmlFor="register-email" required error={errors.email}>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isLoading}
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          className={fieldControlClass(!!errors.email)}
        />
      </FormField>

      <PasswordInput
        label="Password"
        required
        id="register-password"
        name="password"
        autoComplete="new-password"
        placeholder="Create a password"
        disabled={isLoading}
        value={values.password}
        onChange={(e) => setField("password", e.target.value)}
        error={errors.password}
        helperText={!errors.password ? `At least ${minPasswordLength} characters.` : undefined}
      />

      <PasswordInput
        label="Confirm Password"
        required
        id="register-confirm-password"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        disabled={isLoading}
        value={values.confirmPassword}
        onChange={(e) => setField("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
      />

      <div>
        <Checkbox
          checked={values.agreeToTerms}
          onChange={(checked) => setField("agreeToTerms", checked)}
          required
          label={
            <>
              I agree to the{" "}
              <a
                href={termsHref}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href={privacyHref}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>
              .
            </>
          }
        />
        {errors.agreeToTerms && (
          <p role="alert" className="mt-(--sp-1) text-(length:--fs-xs) text-danger">
            {errors.agreeToTerms}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-center text-(length:--fs-sm) text-danger">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full rounded-[var(--radius-md)] bg-(--primary) py-[10px]",
          "text-(length:--fs-sm) font-medium text-white",
          "transition-opacity duration-150 hover:opacity-90",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {isLoading ? "Creating account…" : "Create Account"}
      </button>
      
    </form>
  );
}

export default RegisterForm;