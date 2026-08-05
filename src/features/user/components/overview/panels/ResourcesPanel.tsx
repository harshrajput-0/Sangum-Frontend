import { Card } from "@/shared/components/ui";
import { ResourceRow } from "./ResourceRow";
import type { ResourceItem } from "../../../types/profile.types";

export interface ResourcesPanelProps {
  resources: ResourceItem[];
  isLoading?: boolean;
}

export function ResourcesPanel({ resources, isLoading }: ResourcesPanelProps) {
  if (isLoading) {
    return <Card className="text-sm text-text-muted">Loading resources…</Card>;
  }
  if (resources.length === 0) {
    return <Card className="text-sm text-text-muted">No saved resources yet.</Card>;
  }
  return (
    <Card padded={false} className="px-5">
      {resources.map((resource) => (
        <ResourceRow key={resource.id} resource={resource} />
      ))}
    </Card>
  );
}
