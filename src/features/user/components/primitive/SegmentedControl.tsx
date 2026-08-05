import type { ReactNode } from "react";

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={[
        "inline-flex items-center gap-1 rounded-md border border-border bg-bg-elevated p-1",
        className,
      ].join(" ")}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={[
              "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-2 text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-primary text-text-on-primary"
                : "text-text-secondary hover:text-text",
            ].join(" ")}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
