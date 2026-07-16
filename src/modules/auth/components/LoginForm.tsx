// modules/auth/components/RegisterForm.tsx

import React, { useCallback, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { FormField, fieldControlClass } from "@/shared/components/form/FormField";
import PasswordInput from "@/shared/components/form/PasswordInput";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import Link from "next/link";


/**
 * LoginForm
 * ---------
 * Fully controlled, self-validating sign-in form built from the shared
 * FormField / PasswordInput / Checkbox primitives. The form owns its own
 * field state and light client-side validation; the consumer only has to
 * supply an `onSubmit` handler and (optionally) a server-side `submitError`.
 *
 * Usage:
 *   <LoginForm
 *     isLoading={isPending}
 *     submitError={apiError}
 *     onSubmit={async (values) => { await login(values); }}
 *     onForgotPasswordClick={() => navigate("/forgot-password")}
 *     onSignUpClick={() => navigate("/register")}
 *   />
 */


export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export interface LoginFormProps {
  /** Called with the validated values once the form passes client-side checks */
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  /** Disables inputs/button and swaps the button label (e.g. while a request is in flight) */
  isLoading?: boolean;
  /** Server/async error shown above the submit button, e.g. "Invalid email or password" */
  submitError?: string;
  /** Initial values, useful for pre-filling (e.g. remembered email) */
  defaultValues?: Partial<LoginFormValues>;
  /** Shows a "Forgot password?" link when provided */
  onForgotPasswordClick?: () => void;
  /** Shows a "Don't have an account? Sign up" row when provided */
  onSignUpClick?: () => void;
  /** Extra classes for the outer <form> */
  className?: string;
}


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




export function LoginForm({
  onSubmit,
  isLoading = false,
  submitError,
  defaultValues,
  className,
}: LoginFormProps) {

  // Stores the form state 
  const [values, setValues] = useState<LoginFormValues>({
    email: defaultValues?.email ?? "",
    password: "",
    rememberMe: defaultValues?.rememberMe ?? false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const setField = useCallback(
    <K extends keyof LoginFormValues>(key: K, value: LoginFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    },
    []
  );

  const validate = (v: LoginFormValues): LoginFormErrors => {
    const next: LoginFormErrors = {};

    if (!v.email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(v.email)) next.email = "Enter a valid email address.";

    if (!v.password) next.password = "Enter your password.";

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
      className={cn("w-full flex flex-col gap-4", className)}
    >
      <FormField label="Email Address" htmlFor="login-email" required error={errors.email}>
        <input
          id="login-email"
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
        id="login-password"
        name="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        disabled={isLoading}
        value={values.password}
        onChange={(e) => setField("password", e.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <Checkbox
          checked={values.rememberMe}
          onChange={(checked) => setField("rememberMe", checked)}
          label="Remember me"
        />

        <Link href="/forgetPassword" className="text-(length:--fs-sm) text-primary-light hover:underline left-0">
          Forgot Password
        </Link>

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
          "mt-2 w-full rounded-md bg-primary py-[11px]",
          "text-(length:--fs-sm) font-medium text-white",
          "transition-opacity duration-150 hover:opacity-90",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {isLoading ? "Signing in…" : "Sign In"}
      </button>

    </form>
  );
}

export default LoginForm;