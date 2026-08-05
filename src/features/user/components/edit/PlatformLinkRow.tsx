import type { ReactNode } from "react";
import { Input } from "@/shared/components/ui";

export interface PlatformLinkRowProps {
  icon: ReactNode;
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PlatformLinkRow({
  icon,
  label,
  placeholder,
  value,
  error,
  onChange,
}: PlatformLinkRowProps) {
  return (
    <div className="flex items-end gap-3">
      <span className="mb-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-bg-elevated text-text-secondary">
        {icon}
      </span>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        error={error}
        onChange={(e) => onChange(e.target.value)}
        containerClassName="flex-1"
      />
    </div>
  );
}
