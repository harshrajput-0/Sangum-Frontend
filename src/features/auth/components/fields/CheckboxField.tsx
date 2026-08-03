import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  /** "start" is used for the two-line register terms checkbox */
  align?: "center" | "start";
  spacingClassName?: string;
  error?: string;
}

export function CheckboxField({
  id,
  checked,
  onChange,
  label,
  align = "center",
  spacingClassName = "mb-5",
  error,
}: CheckboxFieldProps) {
  return (
    <div className={spacingClassName}>
      <label
        htmlFor={id}
        className={`flex cursor-pointer gap-2.5 ${
          align === "start" ? "items-start" : "items-center"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border ${
            align === "start" ? "mt-0.5" : ""
          } ${
            checked
              ? "border-primary bg-primary text-text-on-primary"
              : "border-border-strong bg-transparent"
          }`}
        >
          {checked && <Check size={11} strokeWidth={3} />}
        </span>
        <span className="text-xs text-text-secondary">{label}</span>
      </label>
      {error && <p className="mt-1.5 text-[11px] text-danger">{error}</p>}
    </div>
  );
}