import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  className?: string;
}

export function SearchInput({ value, onChange, onSubmit, className = '' }: SearchInputProps) {
  return (
    <div className={`relative mb-4 max-w-120 ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit(value);
        }}
        placeholder="Search Sangum..."
        className="w-full rounded-md border border-border bg-(--input-bg) py-2.5 pl-9.5 pr-3.5 text-sm text-text transition-colors focus:border-primary focus:outline-none focus:shadow-(--shadow-glow-purple)"
      />
    </div>
  );
}
