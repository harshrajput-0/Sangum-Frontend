import type { TextareaHTMLAttributes } from "react";

export type TextareaResize = "none" | "y" | "x" | "both";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  /** e.g. "118 / 160" — parent owns the count, this just renders it */
  counterLabel?: string;
  containerClassName?: string;
  resize?: TextareaResize;
}

const RESIZE_CLASSES: Record<TextareaResize, string> = {
  none: "resize-none",
  y: "resize-y",
  x: "resize-x",
  both: "resize",
};

export function Textarea({
  label,
  error,
  counterLabel,
  id,
  className = "",
  containerClassName = "",
  rows = 4,
  resize = "none",
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
          "w-full rounded-md border bg-bg-elevated px-3 py-2 text-sm text-text outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-primary",
          RESIZE_CLASSES[resize],
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