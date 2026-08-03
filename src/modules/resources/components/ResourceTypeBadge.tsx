import type { ResourceType } from '../types';

interface ResourceTypeBadgeProps {
  type: ResourceType;
}

export function ResourceTypeBadge({ type }: ResourceTypeBadgeProps) {
  return (
    <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
      {type}
    </span>
  );
}