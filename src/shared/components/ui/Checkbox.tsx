// modules/auth/components/Checkbox.tsx

import React from "react";
import { CheckIcon } from "./icons/SangumIcons";
import { cn } from "@/shared/utils/cn";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
}

/** Square checkbox + label. A real (visually-hidden) checkbox input backs the custom box, so keyboard/screen-reader behavior stays native. Used for "Remember me" and "I agree to the Terms". */
export function Checkbox({ checked, onChange, label, required, className }: CheckboxProps) {
  return (
    <label className={cn("flex items-start gap-2 cursor-pointer select-none", className)}>
      <input type="checkbox" checked={checked} required={required} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center w-[18px] h-[18px] mt-0.5 rounded-[5px] border transition-colors duration-150 flex-shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-purple-light)]",
          checked ? "bg-[var(--brand-purple)] border-[var(--brand-purple)]" : "bg-[var(--input-bg)] border-[var(--border-strong)]"
        )}
      >
        {checked && <CheckIcon className="w-3 h-3 text-[var(--text-on-brand)]" />}
      </span>
      <span className="text-[length:var(--fs-sm)] text-[var(--text-secondary)] leading-snug">{label}</span>
    </label>
  );
}
