import type { FormEvent } from "react";
import { Lock } from "lucide-react";
import { BackLink } from "../common/BackLink";
import { IconBadge } from "../cards/IconBadge";
import { PasswordField } from "../fields/PasswordField";
import { PasswordStrengthMeter } from "../fields/PasswordStrengthMeter";
import type { ResetPasswordFormValues } from "../../validation/resetPassword.schema";

interface ResetPasswordFormProps {
  values: ResetPasswordFormValues;
  errors: Partial<Record<keyof ResetPasswordFormValues, string>>;
  submitError: string | null;
  isSubmitting: boolean;
  hasValidToken: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordStrengthScore: number;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  onChange: (field: keyof ResetPasswordFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ResetPasswordForm({
  values,
  errors,
  submitError,
  isSubmitting,
  hasValidToken,
  showPassword,
  showConfirmPassword,
  passwordStrengthScore,
  toggleShowPassword,
  toggleShowConfirmPassword,
  onChange,
  onSubmit,
}: ResetPasswordFormProps) {
  return (
    <div>
      <BackLink />

      <div className="mb-6 text-center">
        <IconBadge icon={<Lock size={24} strokeWidth={2} />} />
        <h1 className="mb-2 font-heading text-xl font-bold text-text">
          Reset your <span className="text-primary-light">password</span>
        </h1>
        <p className="text-sm text-text-secondary">Create a new password for your account.</p>
      </div>

      {hasValidToken ? (
        <form onSubmit={onSubmit} noValidate>
          <PasswordField
            id="reset-password-new"
            label="New password"
            value={values.password}
            onChange={(value) => onChange("password", value)}
            showPassword={showPassword}
            onToggleVisibility={toggleShowPassword}
            error={errors.password}
            autoComplete="new-password"
            spacingClassName="mb-2"
          />
          <PasswordStrengthMeter score={passwordStrengthScore} />

          <PasswordField
            id="reset-password-confirm"
            label="Confirm new password"
            value={values.confirmPassword}
            onChange={(value) => onChange("confirmPassword", value)}
            showPassword={showConfirmPassword}
            onToggleVisibility={toggleShowConfirmPassword}
            error={errors.confirmPassword}
            autoComplete="new-password"
            spacingClassName="mb-5"
          />

          {submitError && (
            <p className="mb-4 text-xs font-medium text-danger">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
          </button>
        </form>
      ) : (
        <p className="text-center text-xs font-medium text-danger">
          {submitError ?? "This reset link is invalid or has expired."}
        </p>
      )}
    </div>
  );
}