"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-lg border border-border bg-input-bg px-3.5 py-2.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Search size={16} className="shrink-0 text-text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
      />
    </div>
  );
}