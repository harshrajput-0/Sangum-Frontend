"use client";

import { useRegisterForm } from "../hooks/useRegisterForm";
import { RegisterForm } from "../components/forms/RegisterForm";
import { AuthCard } from "../components/cards/AuthCard";

export function RegisterShell() {
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