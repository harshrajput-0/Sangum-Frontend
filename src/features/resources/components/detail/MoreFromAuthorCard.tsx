import { RelatedResourceRow } from './RelatedResourceRow';
import type { Resource } from '../../types';

interface MoreFromAuthorCardProps {
  resources: Resource[];
}

export function MoreFromAuthorCard({ resources }: MoreFromAuthorCardProps) {
  return (
    <div className="rounded-sm border border-border/60 bg-bg-elevated p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-text">More from this author</p>
      <div className="space-y-1">
        {resources.map((resource) => (
          <RelatedResourceRow key={resource.id} resource={resource} size="sm" showMeta={false} />
        ))}
      </div>
    </div>
  );
}