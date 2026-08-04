import type { FormEvent } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { AUTH_ROUTES } from "../../constants/auth.constants";
import { IconBadge } from "../cards/IconBadge";
import { TextField } from "../fields/TextField";
import type { ForgotPasswordFormValues } from "../../validation/forgotPassword.schema";

interface ForgotPasswordFormProps {
  values: ForgotPasswordFormValues;
  errors: Partial<Record<keyof ForgotPasswordFormValues, string>>;
  submitError: string | null;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onChange: (field: keyof ForgotPasswordFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ForgotPasswordForm({
  values,
  errors,
  submitError,
  isSubmitting,
  isSubmitted,
  onChange,
  onSubmit,
}: ForgotPasswordFormProps) {
  return (
    <div className="text-center">
      <IconBadge icon={<Mail size={24} strokeWidth={2} />} />

      {isSubmitted ? (
        <>
          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-text">
            Check your <span className="text-primary-light">inbox</span>
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            If an account exists for <span className="text-text">{values.email}</span>,
            we&apos;ve sent a link to reset your password.
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-text">
            Forgot your <span className="text-primary-light">password?</span>
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            No worries! Enter your email address and we&apos;ll send you a link to reset your
            password.
          </p>

          <form onSubmit={onSubmit} noValidate>
            <TextField
              id="forgot-password-email"
              label="Email address"
              type="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={(value) => onChange("email", value)}
              error={errors.email}
              autoComplete="email"
              spacingClassName="mb-4"
              labelClassName="text-left"
            />

            {submitError && (
              <p className="mb-4 text-xs font-medium text-danger">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mb-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </>
      )}

      <p className="text-xs text-text-muted">
        Remember your password?{" "}
        <Link href={AUTH_ROUTES.login} className="font-medium text-primary-light hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}