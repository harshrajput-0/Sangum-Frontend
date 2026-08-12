import type { FormEvent } from "react";
import Link from "next/link";
import { AUTH_ROUTES } from "../../constants/auth.constants";
import { TextField } from "../fields/TextField";
import { PasswordField } from "../fields/PasswordField";
import { CheckboxField } from "../fields/CheckboxField";
import { PasswordStrengthMeter } from "../fields/PasswordStrengthMeter";
import { Divider } from "../common/Divider";
import { SocialAuthButtons } from "../common/SocialAuthButtons";
import type { RegisterFormValues } from "../../validation/register.schema";
import type { SocialProvider } from "../../types/auth.types";

interface RegisterFormProps {
  values: RegisterFormValues;
  errors: Partial<Record<keyof RegisterFormValues, string>>;
  submitError: string | null;
  isSubmitting: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  passwordStrengthScore: number;
  onChange: (field: keyof RegisterFormValues, value: string | boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSocialLogin: (provider: SocialProvider) => void;
}

export function RegisterForm({
  values,
  errors,
  submitError,
  isSubmitting,
  showPassword,
  toggleShowPassword,
  passwordStrengthScore,
  onChange,
  onSubmit,
  onSocialLogin,
}: RegisterFormProps) {
  return (
    <div>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-primary-light">
        Join Sangum
      </span>
      <h1 className="mb-2 font-heading text-xl font-bold text-text">
        Create your <span className="text-primary-light">Sangum account</span>
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
        Join thousands of developers building the future together.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <TextField
          id="register-full-name"
          label="Full Name"
          placeholder="Enter your full name"
          value={values.fullName}
          onChange={(value) => onChange("fullName", value)}
          error={errors.fullName}
          autoComplete="name"
        />

        <TextField
          id="register-username"
          label="Username"
          placeholder="Choose a username"
          value={values.username}
          onChange={(value) => onChange("username", value)}
          error={errors.username}
          hint="This will be your unique public handle."
          autoComplete="username"
        />

        <TextField
          id="register-email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={(value) => onChange("email", value)}
          error={errors.email}
          autoComplete="email"
        />

        <PasswordField
          id="register-password"
          label="Password"
          placeholder="Create a password"
          value={values.password}
          onChange={(value) => onChange("password", value)}
          showPassword={showPassword}
          onToggleVisibility={toggleShowPassword}
          error={errors.password}
          autoComplete="new-password"
          spacingClassName="mb-2"
        />
        <PasswordStrengthMeter
          score={passwordStrengthScore}
          showLabel={false}
          barsSpacingClassName="mb-5"
        />

        <CheckboxField
          id="register-agree-to-terms"
          checked={values.agreeToTerms}
          onChange={(checked) => onChange("agreeToTerms", checked)}
          align="start"
          error={errors.agreeToTerms}
          label={
            <>
              I agree to the{" "}
              <a className="font-medium text-primary-light hover:underline">Terms</a> and{" "}
              <a className="font-medium text-primary-light hover:underline">Privacy Policy</a>
            </>
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <Divider />
      <SocialAuthButtons onProviderClick={onSocialLogin} />

      <p className="text-center text-xs text-text-muted">
        Already have an account?{" "}
        <Link href={AUTH_ROUTES.login} className="font-medium text-primary-light hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}