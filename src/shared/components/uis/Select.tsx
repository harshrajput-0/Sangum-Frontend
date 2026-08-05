/**
 * Select.tsx
 * native <select>, custom styling. Keeps the browser's native dropdown
 * arrow (no custom chevron icon baked in).
 */

import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  options: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, helperText, errorText, options, placeholder, wrapperClassName, className, id, ...rest },
    ref,
  ) => {
    const autoId = useId();
    const selectId = id ?? autoId;
    const hasError = Boolean(errorText);

    return (
      <div className={wrapperClassName}>
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-[length:var(--fs-sm)] font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={hasError || undefined}
          className={cn(
            "w-full rounded-[var(--radius-md)] border bg-[var(--input-bg)] px-3.5 py-2.5 text-[length:var(--fs-sm)] text-[var(--text)] [transition:border-color_var(--t-fast),box-shadow_var(--t-fast)] focus:outline-none",
            hasError
              ? "border-[var(--danger)] focus:[box-shadow:0_0_0_3px_var(--danger-bg-dark)]"
              : "border-[var(--border)] focus:border-[var(--primary)] focus:[box-shadow:var(--shadow-glow-purple)]",
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorText ? (
          <p className="mt-1.5 text-[length:var(--fs-xs)] text-[var(--danger)]">{errorText}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-[length:var(--fs-xs)] text-[var(--text-muted)]">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
