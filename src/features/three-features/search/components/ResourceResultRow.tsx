import { FileText } from 'lucide-react';

interface ResourceResultRowProps {
  title: string;
  communityName: string;
  fileType: string;
  avatarColor: string;
}

export function ResourceResultRow({ title, communityName, fileType, avatarColor }: ResourceResultRowProps) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-surface p-5">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-on-primary"
        style={{ background: avatarColor }}
      >
        <FileText className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <span className="text-lg font-semibold text-text">{title}</span>
        <p className="mt-1 text-xs text-text-muted">
          {communityName} · {fileType}
        </p>
      </div>
    </div>
  );
}