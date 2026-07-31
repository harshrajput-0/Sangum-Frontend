"use client";

import { Chip } from "./Chip";

export interface ChipOption {
  id: string;
  label: string;
}

interface ChipGroupProps {
  options: ChipOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function ChipGroup({
  options,
  activeId,
  onChange,
  className = "",
}: ChipGroupProps) {
  return (
    <div className={["flex gap-2 overflow-x-auto no-scrollbar", className].join(" ")}>
      {options.map((option) => (
        <Chip
          key={option.id}
          label={option.label}
          active={option.id === activeId}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  );
}