"use client";

import { useLoginForm } from "../hooks/useLoginForm";
import { LoginForm } from "../components/forms/LoginForm";
import { AuthCard } from "../components/cards/AuthCard";

export function LoginShell() {
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

  return (
    <AuthCard>
      <LoginForm
        values={values}
        errors={errors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSocialLogin={handleSocialLogin}
      />
    </AuthCard>
  );
}