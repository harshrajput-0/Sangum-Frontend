import { Info } from 'lucide-react';
import { ResourceTypeBadge } from '../ResourceTypeBadge';
import type { ResourceDraft } from './formTypes';

interface LivePreviewPanelProps {
  draft: ResourceDraft;
}

export function LivePreviewPanel({ draft }: LivePreviewPanelProps) {
  const bannerText = (draft.title || 'TITLE').toUpperCase().slice(0, 20);

  return (
    <aside className="mx-auto w-full max-w-sm sm:mx-0 sm:max-w-none lg:sticky lg:top-20 lg:self-start">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Live preview</p>
      </div>

      <div className="mb-4 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary to-info">
          <span className="absolute left-2.5 top-2.5">
            <ResourceTypeBadge type={draft.type} />
          </span>
          <span className="text-xs font-bold tracking-wide text-white/95">{bannerText}</span>
        </div>
        <div className="p-3.5">
          <p className="mb-1 text-sm font-semibold text-text">{draft.title || 'Resource Title'}</p>
          <p className="text-xs text-text-muted">{draft.description || 'This is a short description of the resource.'}</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-info/30 bg-info/10 p-3">
        <Info size={15} className="mt-0.5 shrink-0 text-info" strokeWidth={2} />
        <span className="text-xs text-text-secondary">Submissions are reviewed before appearing in the library.</span>
      </div>
    </aside>
  );
}