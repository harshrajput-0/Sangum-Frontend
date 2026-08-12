import { FileText } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { Textarea } from '../../../../../shared/components/ui';

export interface DocPanelProps {
  file: File | null | undefined;
  description: string;
  onFileChange: (file: File | null) => void;
  onDescriptionChange: (value: string) => void;
}

export function DocPanel({ file, description, onFileChange, onDescriptionChange }: DocPanelProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Document</label>
        <FileDropzone
          icon={<FileText size={26} className="text-text-muted" strokeWidth={1.8} />}
          placeholderLabel="Click to upload or drag and drop"
          hint="PDF, DOC, DOCX up to 25MB"
          accept=".pdf,.doc,.docx"
          selectedFileName={file?.name}
          onFileChange={onFileChange}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Description</label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="What's in this document?"
          resize="y"
          rows={3}
          className="min-h-20 text-sm"
        />
      </div>
    </div>
  );
}