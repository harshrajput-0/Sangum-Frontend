"use client";

import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { useRequireGuest } from "../hooks/useRequireGuest";
import { ForgotPasswordForm } from "../components/forms/ForgotPasswordForm";
import { AuthCard } from "../components/cards/AuthCard";

export function ForgotPasswordShell() {
  const { isAllowed } = useRequireGuest();
  const { values, errors, submitError, isSubmitting, isSubmitted, handleChange, handleSubmit } =
    useForgotPasswordForm();

  // isAllowed is false only while an authenticated user's redirect
  // (via resolveOnboardingRoute) is in flight — render nothing rather
  // than flash this form for a tick.
  if (!isAllowed) return null;

  return (
    <AuthCard>
      <ForgotPasswordForm
        values={values}
        errors={errors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}