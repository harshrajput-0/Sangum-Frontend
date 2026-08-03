interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  hint?: string;
  error?: string;
  /** Margin below the field block. Varies slightly per page in the source design. */
  spacingClassName?: string;
  labelClassName?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  autoComplete,
  hint,
  error,
  spacingClassName = "mb-3.5",
  labelClassName = "",
}: TextFieldProps) {
  const helperText = error ?? hint;
  const hasHelperText = Boolean(helperText);

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-1.5 block text-xs font-medium text-text-muted ${labelClassName}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-md border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:ring-4 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/20"
            : "border-border focus:border-primary focus:ring-primary/20"
        } ${hasHelperText ? "" : spacingClassName}`}
      />
      {hasHelperText && (
        <p
          className={`mt-1.5 text-[11px] ${spacingClassName} ${
            error ? "text-danger" : "text-text-muted"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}