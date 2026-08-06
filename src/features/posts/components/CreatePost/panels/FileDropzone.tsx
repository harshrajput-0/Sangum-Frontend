import type { ReactNode, ChangeEvent } from 'react';

export interface FileDropzoneProps {
  icon: ReactNode;
  placeholderLabel: string;
  hint: string;
  accept: string;
  selectedFileName?: string | null;
  onFileChange: (file: File | null) => void;
}

/** Shared visual for the Image/Video/Doc upload areas — only the icon, hint text, and accepted file types differ per type. */
export function FileDropzone({ icon, placeholderLabel, hint, accept, selectedFileName, onFileChange }: FileDropzoneProps) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-8 text-center hover:border-border-strong hover:bg-surface-hover">
      {icon}
      <span className="text-sm text-text-secondary">{selectedFileName || placeholderLabel}</span>
      <span className="text-xs text-text-muted">{hint}</span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}