import { FileText, ExternalLink } from 'lucide-react';

/**
 * Matches the mock exactly: a generic "Attached document" placeholder
 * — the reference data never carried a real filename/URL for any
 * doc-type post. TODO(api): once posts carry a real file name/size/URL,
 * render those instead of the placeholder copy.
 */
export function PostDocMedia() {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-lg border border-border bg-bg-elevated p-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
        <FileText size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">Attached document</p>
        <p className="text-xs text-text-muted">PDF · Click to view</p>
      </div>
      <ExternalLink size={16} className="shrink-0 text-text-muted" />
    </div>
  );
}