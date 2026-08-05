import type { KeyboardEvent, ReactNode } from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  className = "",
}: CheckboxProps) {
  const toggle = () => onChange(!checked);

  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <label
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={[
        "inline-flex cursor-pointer select-none items-center gap-2",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150",
          checked ? "border-primary bg-primary" : "border-border bg-transparent",
        ].join(" ")}
      >
        {checked && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            className="text-text-on-primary"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      {label && <span className="text-sm text-text">{label}</span>}
    </label>
  );
}
