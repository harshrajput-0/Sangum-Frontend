import { useEffect, useId, useRef, useState } from "react";

/**
 * SlugInput
 * ---------
 * Slug field that auto-generates from a `source` string (e.g. a title the
 * user is typing elsewhere) until the person edits the slug by hand, after
 * which it stops overwriting their edits. Shows a live URL preview and an
 * optional availability indicator.
 *
 * Usage:
 *   <SlugInput
 *     label="Community Slug"
 *     source={communityName}
 *     value={slug}
 *     onChange={setSlug}
 *     baseUrl="sangum.com/c/"
 *     status="available"
 *   />
 */

export type SlugStatus = "idle" | "checking" | "available" | "taken";

export interface SlugInputProps {
  label?: string;
  /** Text to auto-derive the slug from (e.g. a title field) until manually edited */
  source?: string;
  value: string;
  onChange: (value: string) => void;
  baseUrl?: string;
  status?: SlugStatus;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react-refresh/only-export-components
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** icon: replace with real "check" icon */
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/** icon: replace with real "x" icon */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** icon: replace with real "spinner/loader" icon */
function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 11-9-9" />
    </svg>
  );
}

export function SlugInput({
  label,
  source,
  value,
  onChange,
  baseUrl = "example.com/",
  status = "idle",
  error,
  helperText,
  required,
  disabled,
  className,
}: SlugInputProps) {
  const [touched, setTouched] = useState(false);
  const autoId = useId();
  const lastAutoSlug = useRef("");

  // Auto-generate from `source` until the user manually edits the field.
  useEffect(() => {
    if (touched || source === undefined) return;
    const next = slugify(source);
    lastAutoSlug.current = next;
    onChange(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, touched]);

  const handleChange = (raw: string) => {
    setTouched(true);
    onChange(slugify(raw));
  };

  const statusIcon =
    status === "checking" ? (
      <SpinnerIcon />
    ) : status === "available" ? (
      <CheckIcon />
    ) : status === "taken" ? (
      <XIcon />
    ) : null;

  const statusColor =
    status === "available"
      ? "var(--success)"
      : status === "taken"
      ? "var(--danger)"
      : "var(--text-muted)";

  const resolvedHelper =
    helperText ??
    (status === "taken" ? undefined : `${baseUrl}${value || "your-slug"}`);

  return (
    <div className={cx("w-full", className)}>
      {label && (
        <label
          htmlFor={autoId}
          className="mb-[var(--sp-2)] block text-[length:var(--fs-sm)] font-medium text-text-secondary"
        >
          {label}
          {required && <span className="ml-0.5 text-[color:var(--danger)]">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={autoId}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          className={cx(
            "w-full rounded-[var(--radius-md)] border bg-[color:var(--input-bg)] py-[10px] pl-[14px] pr-[38px]",
            "text-[length:var(--fs-sm)] text-text placeholder:text-text-muted",
            "transition-colors duration-150 focus:outline-none focus:border-[color:var(--brand-purple)] focus:[box-shadow:var(--shadow-glow-purple)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-[color:var(--danger)]" : "border-[color:var(--border)]"
          )}
        />
        {statusIcon && (
          <span
            className="absolute right-[12px] top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: statusColor }}
          >
            {statusIcon}
          </span>
        )}
      </div>

      {error ? (
        <p role="alert" className="mt-[var(--sp-1)] text-[length:var(--fs-xs)] text-[color:var(--danger)]">
          {error}
        </p>
      ) : (
        resolvedHelper && (
          <p className="mt-[var(--sp-1)] truncate text-[length:var(--fs-xs)] text-text-muted">
            {resolvedHelper}
          </p>
        )
      )}
    </div>
  );
}

export default SlugInput;
