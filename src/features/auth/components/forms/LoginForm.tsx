import type { FormEvent } from "react";
import Link from "next/link";
import { AUTH_ROUTES } from "../../constants/auth.constants";
import { TextField } from "../fields/TextField";
import { PasswordField } from "../fields/PasswordField";
import { Divider } from "../common/Divider";
import { SocialAuthButtons } from "../common/SocialAuthButtons";
import type { LoginFormValues } from "../../validation/login.schema";
import type { SocialProvider } from "../../types/auth.types";
import type { LoginBanner } from "../../utils/resolveLoginBanner";

interface LoginFormProps {
  values: LoginFormValues;
  errors: Partial<Record<keyof LoginFormValues, string>>;
  submitError: string | null;
  isSubmitting: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  banner: LoginBanner | null;
  onChange: (field: keyof LoginFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSocialLogin: (provider: SocialProvider) => void;
}

export function LoginForm({
  values,
  errors,
  submitError,
  isSubmitting,
  showPassword,
  toggleShowPassword,
  banner,
  onChange,
  onSubmit,
  onSocialLogin,
}: LoginFormProps) {
  return (
    <div>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-primary-light">
        Welcome back
      </span>
      <h1 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-text">
        Log in to your <span className="text-primary-light">Sangum account</span>
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
        Access your communities, continue your conversations, and stay connected.
      </p>

      {banner && (
        <div
          className={`mb-4 rounded-md border px-3.5 py-2.5 text-xs font-medium ${
            banner.type === "success"
              ? "border-success/30 bg-success-bg text-success"
              : "border-danger/30 bg-danger-bg text-danger"
          }`}
        >
          {banner.message}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        <TextField
          id="login-email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={(value) => onChange("email", value)}
          error={errors.email}
          autoComplete="email"
        />

        <PasswordField
          id="login-password"
          label="Password"
          value={values.password}
          onChange={(value) => onChange("password", value)}
          showPassword={showPassword}
          onToggleVisibility={toggleShowPassword}
          error={errors.password}
          autoComplete="current-password"
          labelRightSlot={
            <Link
              href={AUTH_ROUTES.forgotPassword}
              className="text-xs font-medium text-primary-light hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        {submitError && (
          <p className="mb-4 text-xs font-medium text-danger">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mb-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <Divider />
      <SocialAuthButtons onProviderClick={onSocialLogin} />

      <p className="text-center text-xs text-text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href={AUTH_ROUTES.register}
          className="font-medium text-primary-light hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}