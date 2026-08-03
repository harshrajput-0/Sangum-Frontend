import type { Resource } from '../../types';
import { ResourceCard } from '../ResourceCard';
import { EmptyState } from '../EmptyState';

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  if (resources.length === 0) {
    return <EmptyState message="No resources match this filter yet." />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}