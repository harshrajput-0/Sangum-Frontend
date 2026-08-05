import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  id,
  className = "",
  containerClassName = "",
  ...rest
}: SelectProps) {
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
      <select
        id={id}
        className={[
          "w-full rounded-md border bg-bg-elevated px-3 py-2 text-sm text-text outline-none transition-colors duration-150 focus:border-primary",
          error ? "border-danger" : "border-border",
          className,
        ].join(" ")}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
