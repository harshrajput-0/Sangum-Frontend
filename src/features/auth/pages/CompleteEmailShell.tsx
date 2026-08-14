"use client";

import { useCompleteEmailForm } from "../hooks/useCompleteEmailForm";
import { CompleteEmailForm } from "../components/forms/CompleteEmailForm";
import { AuthCard } from "../components/cards/AuthCard";

export function CompleteEmailShell() {
  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } =
    useCompleteEmailForm();

  return (
    <AuthCard>
      <CompleteEmailForm
        values={values}
        errors={errors}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthCard>
  );
}