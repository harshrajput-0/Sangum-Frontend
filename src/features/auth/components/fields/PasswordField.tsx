import { Eye } from "lucide-react";
import type { ReactNode } from "react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggleVisibility: () => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  /** e.g. a "Forgot password?" link rendered next to the label */
  labelRightSlot?: ReactNode;
  /** Margin below the field block. Varies slightly per page in the source design. */
  spacingClassName?: string;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  placeholder,
  autoComplete,
  error,
  labelRightSlot,
  spacingClassName = "mb-3.5",
}: PasswordFieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-medium text-text-muted">
          {label}
        </label>
        {labelRightSlot}
      </div>
      <div
        className={`flex items-center gap-2 rounded-md border bg-input-bg px-3.5 py-2.5 focus-within:ring-4 ${
          error
            ? "border-danger focus-within:border-danger focus-within:ring-danger/20"
            : "border-border focus-within:border-primary focus-within:ring-primary/20"
        } ${spacingClassName}`}
      >
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className="w-full bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
        />
        {/* Source design uses a single static eye glyph regardless of
            visibility state (it only toggles input type) — preserved
            as-is rather than swapping to an eye-off icon. */}
        <button
          type="button"
          onClick={onToggleVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="shrink-0 text-text-muted hover:text-text"
        >
          <Eye size={16} strokeWidth={2} />
        </button>
      </div>
      {error && <p className="-mt-2 mb-3.5 text-[11px] text-danger">{error}</p>}
    </div>
  );
}