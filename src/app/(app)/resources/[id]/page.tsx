import { ResourceDetailShell } from '@/modules/resources';

interface ResourceDetailPageProps {
  params: { id: string };
}

export default function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ResourceDetailShell resourceId={params.id} />
    </div>
  );
}