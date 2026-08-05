import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  containerClassName = "",
  ...rest
}: InputProps) {
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-xs font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={[
          "w-full rounded-md border bg-bg-elevated px-3 py-2 text-sm text-text outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-primary",
          error ? "border-danger" : "border-border",
          className,
        ].join(" ")}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
