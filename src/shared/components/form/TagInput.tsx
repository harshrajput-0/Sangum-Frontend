import React, { useId, useMemo, useRef, useState } from "react";

/**
 * TagInput
 * --------
 * Chip-style multi-value input. Type and press Enter/comma to add a tag,
 * Backspace on an empty field removes the last one, and an optional
 * suggestion list gives simple typeahead autocomplete.
 *
 * Usage:
 *   <TagInput
 *     label="Tags"
 *     value={tags}
 *     onChange={setTags}
 *     suggestions={["React", "TypeScript", "Node.js"]}
 *   />
 */

export interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  maxTags?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** icon: replace with real "x" icon */
function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function TagInput({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder = "Add tag…",
  maxTags,
  error,
  helperText,
  disabled,
  className,
}: TagInputProps) {
  const [draft, setDraft] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();

  const atLimit = maxTags !== undefined && value.length >= maxTags;

  const filteredSuggestions = useMemo(() => {
    if (!draft) return [];
    const lower = draft.toLowerCase();
    return suggestions
      .filter((s) => s.toLowerCase().includes(lower) && !value.includes(s))
      .slice(0, 6);
  }, [draft, suggestions, value]);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || atLimit) return;
    if (value.includes(tag)) {
      setDraft("");
      return;
    }
    onChange([...value, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cx("relative w-full", className)}>
      {label && (
        <label
          htmlFor={autoId}
          className="mb-(--sp-2) block text-(length:--fs-sm) font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={cx(
          "flex min-h-[42px] w-full flex-wrap items-center gap-[6px] rounded-md border bg-(--input-bg) px-[10px] py-[8px]",
          "transition-colors duration-150 focus-within:border-primary focus-within:[box-shadow:var(--shadow-glow-purple)]",
          disabled && "cursor-not-allowed opacity-50",
          error ? "border-danger" : "border-border"
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-[6px] rounded-(--radius-full) bg-[rgba(109,93,254,0.15)] px-[10px] py-[4px] text-(length:--fs-xs) font-medium text-(--primary-light)"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="opacity-80 hover:opacity-100"
              >
                <XIcon />
              </button>
            )}
          </span>
        ))}

        {!atLimit && (
          <input
            ref={inputRef}
            id={autoId}
            type="text"
            value={draft}
            disabled={disabled}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
            placeholder={value.length === 0 ? placeholder : ""}
            className="min-w-[100px] flex-1 bg-transparent text-(length:--fs-sm) text-text placeholder:text-text-muted focus:outline-none"
          />
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 mt-(--sp-1) w-full overflow-hidden rounded-md border border-border bg-surface [box-shadow:var(--shadow-md)]">
          {filteredSuggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addTag(s)}
                className="w-full px-[14px] py-[8px] text-left text-(length:--fs-sm) text-text hover:bg-surface-hover"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

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

export default TagInput;
