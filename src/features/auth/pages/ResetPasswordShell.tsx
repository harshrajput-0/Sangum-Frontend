"use client";

import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import { ResetPasswordForm } from "../components/forms/ResetPasswordForm";
import { AuthCard } from "../components/cards/AuthCard";

interface ResetPasswordShellProps {
  /** Read server-side from the dynamic route segment in
   * app/(auth)/reset-password/[token]/page.tsx — always a string. */
  token: string;
}

export function ResetPasswordShell({ token }: ResetPasswordShellProps) {
  const {
    values,
    errors,
    submitError,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    passwordStrengthScore,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleChange,
    handleSubmit,
  } = useResetPasswordForm(token);

  return (
    <AuthCard>
      <ResetPasswordForm
        values={values}
        errors={errors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        passwordStrengthScore={passwordStrengthScore}
        toggleShowPassword={toggleShowPassword}
        toggleShowConfirmPassword={toggleShowConfirmPassword}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}