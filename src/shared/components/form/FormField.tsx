/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { cn } from "@/shared/utils/cn";

/**
 * FormField
 * ---------
 * Wraps any form control (input, textarea, select, custom widget) with a
 * consistent label, required-marker, helper text and error message.
 *
 * Uses design tokens from token.css (colors, spacing, radius, type scale)
 * via Tailwind arbitrary values, so it automatically matches the rest of
 * the design system in both light and dark themes.
 *
 * Usage:
 *   <FormField label="Email Address" required error={errors.email}>
 *     <input id="email" className="..." />
 *   </FormField>
 */

export interface FormFieldProps {
  /** Field label shown above the control */
  label?: string;
  /** id of the control this label is for (recommended for a11y) */
  htmlFor?: string;
  /** Shows a purple/danger asterisk next to the label */
  required?: boolean;
  /** Error message — when present it replaces the helper text and tints the field */
  error?: string;
  /** Muted helper copy shown under the control when there is no error */
  helperText?: string;
  /** The input/textarea/select/custom control being wrapped */
  children: React.ReactNode;
  /** Extra classes for the outer wrapper */
  className?: string;
}


/** Small inline icon — swap for a real icon component later */
function ErrorDotIcon() {
  return (
    <svg
      className="h-3 w-3 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      {/* icon: replace with real "alert-circle" icon */}
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  helperText,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-(--sp-2) block text-(length:--fs-sm) font-medium text-text-secondary"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-danger">*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p
          role="alert"
          className="mt-(--sp-1) flex items-center gap-1 text-(length:--fs-xs) text-danger"
        >
          <ErrorDotIcon />
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-(--sp-1) text-(length:--fs-xs) text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Base input styling shared by the form component set. Exported so other
 * components (or consumers of FormField) can reuse the exact same look for
 * plain <input>/<textarea>/<select> elements.
 */
export const fieldControlClass = (hasError?: boolean) =>
  cn(
    "w-full rounded-[var(--radius-md)] border bg-[color:var(--input-bg)] px-[14px] py-[10px]",
    "text-[length:var(--fs-sm)] text-[color:var(--text)] placeholder:text-[color:var(--text-muted)]",
    "transition-colors duration-150 focus:outline-none focus:border-[color:var(--brand-purple)] focus:[box-shadow:var(--shadow-glow-purple)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    hasError
      ? "border-[color:var(--danger)]"
      : "border-[color:var(--border)]"
  );

export default FormField;
