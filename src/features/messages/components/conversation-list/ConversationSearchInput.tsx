import { Search } from "lucide-react";

interface ConversationSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ConversationSearchInput({ value, onChange }: ConversationSearchInputProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search conversations…"
        aria-label="Search conversations"
        className="w-full rounded-full border border-border bg-[var(--input-bg)] py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-primary focus:shadow-[var(--shadow-glow-purple)] focus:outline-none"
      />
    </div>
  );
}