import React, { useId, useRef, useState } from "react";

/**
 * ImageUpload
 * -----------
 * Single-image drag & drop zone with click-to-browse, preview, and
 * max-size / file-type validation. Fully controlled — you own the file
 * (or preview URL) and pass it back in via `value`.
 *
 * Usage:
 *   <ImageUpload
 *     value={avatarUrl}
 *     onChange={(file) => handleFile(file)}
 *     maxSizeMB={5}
 *   />
 */

export interface ImageUploadProps {
  label?: string;
  /** Preview URL of the currently selected image, or null/undefined for empty */
  value?: string | null;
  /** Called with the picked File, or null when removed */
  onChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** icon: replace with real "upload-cloud" icon */
function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
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

export function ImageUpload({
  label,
  value,
  onChange,
  accept = "image/png,image/jpeg,image/webp",
  maxSizeMB = 5,
  error,
  helperText,
  disabled,
  className,
}: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();

  const acceptLabel = accept
    .split(",")
    .map((t) => t.split("/")[1]?.toUpperCase())
    .filter(Boolean)
    .join(", ");

  const validateAndEmit = (file: File | undefined) => {
    if (!file) return;
    if (!accept.split(",").includes(file.type)) {
      setLocalError(`Unsupported file type. Use ${acceptLabel}.`);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setLocalError(`File is too large. Max size is ${maxSizeMB}MB.`);
      return;
    }
    setLocalError(null);
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    validateAndEmit(e.dataTransfer.files?.[0]);
  };

  const displayError = error ?? localError ?? undefined;

  return (
    <div className={cx("w-full", className)}>
      {label && (
        <label
          htmlFor={autoId}
          className="mb-(--sp-2) block text-[length:var(--fs-sm)] font-medium text-[color:var(--text-secondary)]"
        >
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        id={autoId}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={(e) => validateAndEmit(e.target.files?.[0])}
      />

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Uploaded preview"
            className="h-[140px] w-[140px] rounded-[var(--radius-lg)] border border-[color:var(--border)] object-cover"
          />
          {!disabled && (
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] text-[color:var(--text-muted)] [box-shadow:var(--shadow-sm)] hover:text-[color:var(--text)]"
            >
              <XIcon />
            </button>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cx(
            "flex cursor-pointer flex-col items-center justify-center rounded-[var(--radius-lg)] border-[1.5px] border-dashed px-[var(--sp-4)] py-[var(--sp-8)] text-center transition-colors duration-150",
            disabled && "cursor-not-allowed opacity-50",
            dragging
              ? "border-[color:var(--brand-purple)] bg-[rgba(109,93,254,0.06)]"
              : "border-[color:var(--border-strong)]"
          )}
        >
          <span className="mx-auto mb-[8px] block h-7 w-7 text-[color:var(--text-muted)]">
            <UploadIcon />
          </span>
          <p className="text-[length:var(--fs-sm)] text-[color:var(--text-muted)]">
            Drag &amp; drop an image, or{" "}
            <span className="font-medium text-[color:var(--brand-purple-light)]">browse</span>
          </p>
          <p className="mt-[2px] text-[length:var(--fs-xs)] text-[color:var(--text-muted)]">
            {acceptLabel} up to {maxSizeMB}MB
          </p>
        </div>
      )}

      {displayError ? (
        <p role="alert" className="mt-[var(--sp-1)] text-[length:var(--fs-xs)] text-[color:var(--danger)]">
          {displayError}
        </p>
      ) : helperText ? (
        <p className="mt-[var(--sp-1)] text-[length:var(--fs-xs)] text-[color:var(--text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default ImageUpload;
