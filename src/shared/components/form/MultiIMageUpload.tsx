import React, { useId, useRef, useState } from "react";

/**
 * MultiImageUpload
 * -----------------
 * Grid of image thumbnails with per-item remove, a "+" tile to add more
 * (click or drag & drop), a running count, and max-file / max-size
 * validation. Same interaction model as ImageUpload, but for many files.
 *
 * Usage:
 *   <MultiImageUpload
 *     items={images}                 // { id: string; url: string }[]
 *     onAdd={(files) => upload(files)}
 *     onRemove={(id) => remove(id)}
 *     maxFiles={10}
 *     maxSizeMB={10}
 *   />
 */

export interface MultiImageItem {
  id: string;
  url: string;
}

export interface MultiImageUploadProps {
  label?: string;
  items: MultiImageItem[];
  /** Called with newly picked/dropped files (already filtered to remaining slots) */
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** icon: replace with real "plus" icon */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function MultiImageUpload({
  label,
  items,
  onAdd,
  onRemove,
  accept = "image/png,image/jpeg,image/webp",
  maxFiles = 10,
  maxSizeMB = 10,
  error,
  disabled,
  className,
}: MultiImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();

  const remaining = Math.max(0, maxFiles - items.length);

  const validateAndAdd = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    const accepted = accept.split(",");
    const valid: File[] = [];

    for (const file of files) {
      if (valid.length >= remaining) break;
      if (!accepted.includes(file.type)) {
        setLocalError(`Some files were skipped — unsupported type.`);
        continue;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setLocalError(`Some files were skipped — over ${maxSizeMB}MB.`);
        continue;
      }
      valid.push(file);
    }

    if (valid.length) {
      setLocalError(null);
      onAdd(valid);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled || remaining === 0) return;
    validateAndAdd(e.dataTransfer.files);
  };

  const displayError = error ?? localError ?? undefined;

  return (
    <div className={cx("w-full", className)}>
      {label && (
        <label className="mb-[var(--sp-2)] block text-[length:var(--fs-sm)] font-medium text-[color:var(--text-secondary)]">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        id={autoId}
        type="file"
        accept={accept}
        multiple
        disabled={disabled}
        className="hidden"
        onChange={(e) => e.target.files && validateAndAdd(e.target.files)}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && remaining > 0) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cx(
          "flex flex-wrap gap-[var(--sp-2)] rounded-[var(--radius-lg)] p-[var(--sp-1)] transition-colors duration-150",
          dragging && "bg-[rgba(109,93,254,0.06)]"
        )}
      >
        {items.map((item) => (
          <div key={item.id} className="relative h-16 w-16 shrink-0">
            <img
              src={item.url}
              alt=""
              className="h-16 w-16 rounded-[var(--radius-md)] border border-[color:var(--border)] object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label="Remove image"
                className="absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] text-[10px] text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {remaining > 0 && !disabled && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Add images"
            className={cx(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-dashed text-[color:var(--text-muted)] transition-colors duration-150",
              dragging ? "border-[color:var(--brand-purple)]" : "border-[color:var(--border-strong)]"
            )}
          >
            <span className="h-5 w-5">
              <PlusIcon />
            </span>
          </button>
        )}
      </div>

      <p className="mt-[var(--sp-2)] text-[length:var(--fs-xs)] text-[color:var(--text-muted)]">
        {items.length} of {maxFiles} images · {maxSizeMB}MB each max
      </p>

      {displayError && (
        <p role="alert" className="mt-[var(--sp-1)] text-[length:var(--fs-xs)] text-[color:var(--danger)]">
          {displayError}
        </p>
      )}
    </div>
  );
}

export default MultiImageUpload;
