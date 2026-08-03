import { FileText, Globe, Calendar } from 'lucide-react';
import { InfoRow } from './InfoRow';
import type { ResourceDetail } from '../../types';

interface ResourceInfoCardProps {
  resource: ResourceDetail;
}

export function ResourceInfoCard({ resource }: ResourceInfoCardProps) {
  return (
    <div className="rounded-sm border border-border/60 bg-bg-elevated p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-text">Resource Info</p>
      <div className="space-y-2.5">
        <InfoRow icon={FileText} label="Type" value={resource.type} />
        <InfoRow icon={Globe} label="Language" value={resource.language} />
        <InfoRow icon={Calendar} label="Last updated" value={resource.lastUpdatedLabel} />
      </div>
    </div>
  );
}