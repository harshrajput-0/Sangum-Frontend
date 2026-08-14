import type { FormEvent } from "react";
import { Mail } from "lucide-react";
import { IconBadge } from "../cards/IconBadge";
import { TextField } from "../fields/TextField";
import type { CompleteEmailFormValues } from "../../validation/completeEmail.schema";

interface CompleteEmailFormProps {
  values: CompleteEmailFormValues;
  errors: Partial<Record<keyof CompleteEmailFormValues, string>>;
  submitError: string | null;
  isSubmitting: boolean;
  onChange: (field: keyof CompleteEmailFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function CompleteEmailForm({
  values,
  errors,
  submitError,
  isSubmitting,
  onChange,
  onSubmit,
}: CompleteEmailFormProps) {
  return (
    <div className="text-center">
      <IconBadge icon={<Mail size={24} strokeWidth={2} />} />

      <h1 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-text">
        Add your <span className="text-primary-light">email</span>
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
        Your account was signed in but didn&apos;t come with an email address. Add one to finish
        setting up your account.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <TextField
          id="complete-email-address"
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={(value) => onChange("email", value)}
          error={errors.email}
          autoComplete="email"
          spacingClassName="mb-4"
          labelClassName="text-left"
        />

        {submitError && (
          <p className="mb-4 text-xs font-medium text-danger">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}