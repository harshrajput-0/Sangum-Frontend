import React, { useId } from "react";

/**
 * PollBuilder
 * ------------
 * Poll question + a dynamic list of options (add up to `maxOptions`,
 * remove down to `minOptions`) plus an expiry picker. Fully controlled.
 *
 * Usage:
 *   <PollBuilder
 *     question={question}
 *     onQuestionChange={setQuestion}
 *     options={options}
 *     onOptionsChange={setOptions}
 *     expiresIn={expiresIn}
 *     onExpiresChange={setExpiresIn}
 *   />
 */

export interface PollExpiryOption {
  value: string;
  label: string;
}

const DEFAULT_EXPIRY_OPTIONS: PollExpiryOption[] = [
  { value: "1d", label: "1 day" },
  { value: "3d", label: "3 days" },
  { value: "1w", label: "1 week" },
  { value: "never", label: "Never" },
];

export interface PollBuilderProps {
  label?: string;
  question: string;
  onQuestionChange: (value: string) => void;
  options: string[];
  onOptionsChange: (options: string[]) => void;
  expiresIn?: string;
  onExpiresChange?: (value: string) => void;
  expiryOptions?: PollExpiryOption[];
  minOptions?: number;
  maxOptions?: number;
  error?: string;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--input-bg)] px-[14px] py-[10px] text-[length:var(--fs-sm)] text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] transition-colors duration-150 focus:outline-none focus:border-[color:var(--brand-purple)] focus:[box-shadow:var(--shadow-glow-purple)]";

/** icon: replace with real "x" icon */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PollBuilder({
  label = "Poll",
  question,
  onQuestionChange,
  options,
  onOptionsChange,
  expiresIn,
  onExpiresChange,
  expiryOptions = DEFAULT_EXPIRY_OPTIONS,
  minOptions = 2,
  maxOptions = 6,
  error,
  className,
}: PollBuilderProps) {
  const autoId = useId();

  const updateOption = (index: number, value: string) => {
    const next = [...options];
    next[index] = value;
    onOptionsChange(next);
  };

  const removeOption = (index: number) => {
    if (options.length <= minOptions) return;
    onOptionsChange(options.filter((_, i) => i !== index));
  };

  const addOption = () => {
    if (options.length >= maxOptions) return;
    onOptionsChange([...options, ""]);
  };

  return (
    <div className={cx("w-full", className)}>
      {label && (
        <label className="mb-[var(--sp-2)] block text-[length:var(--fs-sm)] font-medium text-[color:var(--text-secondary)]">
          {label}
        </label>
      )}

      <input
        type="text"
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Ask a question…"
        className={cx(inputClass, "mb-[var(--sp-2)]")}
      />

      <div className="mb-[var(--sp-2)] flex flex-col gap-[var(--sp-2)]">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-[var(--sp-2)]">
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className={cx(inputClass, "flex-1")}
            />
            {options.length > minOptions && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                aria-label={`Remove option ${index + 1}`}
                className="flex h-4 w-4 shrink-0 items-center justify-center text-[color:var(--text-muted)] hover:text-[color:var(--text)]"
              >
                <XIcon />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-[var(--sp-3)]">
        {options.length < maxOptions ? (
          <button
            type="button"
            onClick={addOption}
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] px-[12px] py-[7px] text-[length:var(--fs-xs)] font-semibold text-[color:var(--text)] transition-colors duration-150 hover:bg-[color:var(--surface-hover)]"
          >
            + Add option
          </button>
        ) : (
          <span />
        )}

        {onExpiresChange && (
          <div className="flex items-center gap-[var(--sp-2)]">
            <label htmlFor={autoId} className="text-[length:var(--fs-xs)] text-[color:var(--text-muted)]">
              Ends in
            </label>
            <select
              id={autoId}
              value={expiresIn}
              onChange={(e) => onExpiresChange(e.target.value)}
              className="rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--input-bg)] px-[10px] py-[6px] text-[length:var(--fs-xs)] text-[color:var(--text)] focus:outline-none focus:border-[color:var(--brand-purple)]"
            >
              {expiryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-[var(--sp-2)] text-[length:var(--fs-xs)] text-[color:var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default PollBuilder;
