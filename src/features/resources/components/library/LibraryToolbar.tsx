import { Search } from 'lucide-react';
import { SORT_OPTIONS, type SortOption } from '../../types';

interface LibraryToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function LibraryToolbar({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: LibraryToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-2.5 sm:flex-row">
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-input-bg px-3.5 py-2.5">
        <Search size={16} className="shrink-0 text-text-muted" />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search resources…"
          className="w-full bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
        />
      </div>
      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-lg border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none sm:w-40"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}