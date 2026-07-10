import React, { forwardRef, useId, useState } from "react";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** icon: replace with real "eye" icon */
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** icon: replace with real "eye-off" icon */
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-6.06M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-3.22 4.31M14.12 14.12a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { label, error, helperText, required, id, containerClassName, className, disabled, ...rest },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className={cx("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-(--sp-2) block text-(length:--fs-sm) font-medium text-text-secondary"
          >
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            disabled={disabled}
            aria-invalid={!!error}
            className={cx(
              "w-full rounded-md border bg-(--input-bg) py-[10px] pl-[14px] pr-[38px]",
              "text-(length:--fs-sm) text-text placeholder:text-text-muted",
              "transition-colors duration-150 focus:outline-none focus:border-brand-purple focus:[box-shadow:var(--shadow-glow-purple)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-danger" : "border-border",
              className
            )}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-[12px] top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors duration-150 hover:text-text disabled:cursor-not-allowed"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {error ? (
          <p role="alert" className="mt-(--sp-1) text-(length:--fs-xs) text-danger">
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
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
