"use client";

import { useLoginForm } from "../hooks/useLoginForm";
import { useRequireGuest } from "../hooks/useRequireGuest";
import { LoginForm } from "../components/forms/LoginForm";
import { AuthCard } from "../components/cards/AuthCard";
import { resolveLoginBanner } from "../utils/resolveLoginBanner";

interface LoginShellProps {
  /** Read server-side from ?verified=/?error= in app/(auth)/login/page.tsx */
  verified?: string;
  error?: string;
}

export function LoginShell({ verified, error }: LoginShellProps) {
  const { isAllowed } = useRequireGuest();
  const {
    values,
    errors,
    submitError,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  } = useLoginForm();

  const banner = resolveLoginBanner({ verified, error });

  // isAllowed is false only while an authenticated user's redirect
  // (via resolveOnboardingRoute) is in flight — render nothing rather
  // than flash the login form for a tick.
  if (!isAllowed) return null;

  return (
    <AuthCard>
      <LoginForm
        values={values}
        errors={errors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        banner={banner}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSocialLogin={handleSocialLogin}
      />
    </AuthCard>
  );
}