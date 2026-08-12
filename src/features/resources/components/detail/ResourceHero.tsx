import { ResourceTypeBadge } from '../ResourceTypeBadge';
import { getAccentFromId, getBannerLabel } from '../../lib/deriveResourceDisplay';
import type { ResourceDetail } from '../../types';

const GRADIENT_CLASSES: Record<string, string> = {
  primary: 'from-primary to-primary-active',
  warning: 'from-warning to-orange-700',
  info: 'from-info to-cyan-800',
  danger: 'from-danger to-rose-900',
  success: 'from-success to-green-800',
};

interface ResourceHeroProps {
  resource: ResourceDetail;
}

export function ResourceHero({ resource }: ResourceHeroProps) {
  const accent = resource.accent ?? getAccentFromId(resource.id);
  const bannerLabel = resource.bannerLabel ?? getBannerLabel(resource.title);

  return (
    <div className={`relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br sm:h-52 ${GRADIENT_CLASSES[accent]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(255,255,255,0.18),transparent_70%)]" />
      <span className="absolute left-3 top-3">
        <ResourceTypeBadge type={resource.type} />
      </span>
      <span className="relative text-xl font-extrabold tracking-wide text-white sm:text-2xl">{bannerLabel}</span>
    </div>
  );
}