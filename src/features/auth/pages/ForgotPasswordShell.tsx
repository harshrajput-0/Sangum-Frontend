"use client";

import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { ForgotPasswordForm } from "../components/forms/ForgotPasswordForm";
import { AuthCard } from "../components/cards/AuthCard";

export function ForgotPasswordShell() {
  const { values, errors, submitError, isSubmitting, isSubmitted, handleChange, handleSubmit } =
    useForgotPasswordForm();

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