import { ImageIcon } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { Textarea } from '../../../../../shared/components/ui';

export interface ImagePanelProps {
  file: File | null | undefined;
  caption: string;
  onFileChange: (file: File | null) => void;
  onCaptionChange: (value: string) => void;
}

export function ImagePanel({ file, caption, onFileChange, onCaptionChange }: ImagePanelProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Image</label>
        <FileDropzone
          icon={<ImageIcon size={26} className="text-text-muted" strokeWidth={1.8} />}
          placeholderLabel="Click to upload or drag and drop"
          hint="PNG, JPG, GIF up to 10MB"
          accept="image/*"
          selectedFileName={file?.name}
          onFileChange={onFileChange}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Caption</label>
        <Textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Say something about this image…"
          resize="y"
          rows={3}
          className="min-h-[80px] text-sm"
        />
      </div>
    </div>
  );
}