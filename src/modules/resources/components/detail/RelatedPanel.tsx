import { RelatedResourceRow } from './RelatedResourceRow';
import type { Resource } from '../../types';

interface RelatedPanelProps {
  resources: Resource[];
}

export function RelatedPanel({ resources }: RelatedPanelProps) {
  return (
    <div className="rounded-sm border border-border/60 bg-bg-elevated p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-text">Related Resources</p>
      <div className="divide-y divide-border">
        {resources.map((resource) => (
          <RelatedResourceRow key={resource.id} resource={resource} size="md" />
        ))}
      </div>
    </div>
  );
}