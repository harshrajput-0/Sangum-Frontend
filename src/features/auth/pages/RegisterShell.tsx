"use client";

import { useRegisterForm } from "../hooks/useRegisterForm";
import { useRequireGuest } from "../hooks/useRequireGuest";
import { RegisterForm } from "../components/forms/RegisterForm";
import { AuthCard } from "../components/cards/AuthCard";

export function RegisterShell() {
  const { isAllowed } = useRequireGuest();
  const {
    values,
    errors,
    submitError,
    isSubmitting,
    showPassword,
    toggleShowPassword,
    passwordStrengthScore,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  } = useRegisterForm();

  // isAllowed is false only while an authenticated user's redirect
  // (via resolveOnboardingRoute) is in flight — render nothing rather
  // than flash the register form for a tick.
  if (!isAllowed) return null;

  return (
    <AuthCard>
      <RegisterForm
        values={values}
        errors={errors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        passwordStrengthScore={passwordStrengthScore}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSocialLogin={handleSocialLogin}
      />
    </AuthCard>
  );
}