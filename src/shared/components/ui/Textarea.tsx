import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  /** e.g. "118 / 160" — parent owns the count, this just renders it */
  counterLabel?: string;
  containerClassName?: string;
}

export function Textarea({
  label,
  error,
  counterLabel,
  id,
  className = "",
  containerClassName = "",
  rows = 4,
  ...rest
}: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        className={[
          "w-full resize-none rounded-md border bg-bg-elevated px-3 py-2 text-sm text-text outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-primary",
          error ? "border-danger" : "border-border",
          className,
        ].join(" ")}
        {...rest}
      />
      {(error || counterLabel) && (
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-danger">{error ?? ""}</span>
          {counterLabel && (
            <span className="text-xs text-text-muted">{counterLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
