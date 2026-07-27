import { useEffect, useRef, useState } from "react";

/**
 * SearchInput
 * -----------
 * Text input with a search icon prefix and a clear ("×") button that
 * appears once there's a value. Debounces `onSearch` so you don't fire a
 * query on every keystroke; `onChange` (if provided) still fires
 * immediately for controlled use-cases.
 *
 * Usage:
 *   <SearchInput placeholder="Search…" onSearch={(q) => runQuery(q)} />
 */

export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Fires immediately on every keystroke */
  onChange?: (value: string) => void;
  /** Fires `debounceMs` after the user stops typing */
  onSearch?: (value: string) => void;
  debounceMs?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** icon: replace with real "search" icon */
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

export function SearchInput({
  value,
  defaultValue = "",
  placeholder = "Search…",
  onChange,
  onSearch,
  debounceMs = 300,
  autoFocus,
  disabled,
  className,
}: SearchInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value! : internal;
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce onSearch
  useEffect(() => {
    if (!onSearch) return;
    const handle = setTimeout(() => onSearch(current), debounceMs);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, debounceMs]);

  const update = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleClear = () => {
    update("");
    inputRef.current?.focus();
  };

  return (
    <div className={cx("relative", className)}>
      <span className="pointer-events-none absolute left-[12px] top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted">
        <SearchIcon />
      </span>

      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        value={current}
        onChange={(e) => update(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        className={cx(
          "w-full rounded-md border border-border bg-(--input-bg) py-[10px] pl-[38px]",
          current ? "pr-[38px]" : "pr-[14px]",
          "text-(length:--fs-sm) text-text placeholder:text-text-muted",
          "transition-colors duration-150 focus:outline-none focus:border-primary focus:[box-shadow:var(--shadow-glow-purple)]",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />

      {current && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          aria-label="Clear search"
          className="absolute right-[12px] top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-text-muted transition-colors duration-150 hover:text-text"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
