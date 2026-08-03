import { FilterChip } from '../FilterChip';
import { RESOURCE_TYPES, type ResourceTypeFilter } from '../../types';

interface TypeFilterChipsProps {
  active: ResourceTypeFilter;
  onChange: (type: ResourceTypeFilter) => void;
}

export function TypeFilterChips({ active, onChange }: TypeFilterChipsProps) {
  const filters: ResourceTypeFilter[] = ['All', ...RESOURCE_TYPES];

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar">
      {filters.map((filter) => (
        <FilterChip key={filter} label={filter} active={active === filter} onClick={() => onChange(filter)} />
      ))}
    </div>
  );
}