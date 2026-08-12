import { Video } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { Textarea } from '../../../../../shared/components/ui';

export interface VideoPanelProps {
  file: File | null | undefined;
  caption: string;
  onFileChange: (file: File | null) => void;
  onCaptionChange: (value: string) => void;
}

export function VideoPanel({ file, caption, onFileChange, onCaptionChange }: VideoPanelProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Video</label>
        <FileDropzone
          icon={<Video size={26} className="text-text-muted" strokeWidth={1.8} />}
          placeholderLabel="Click to upload or drag and drop"
          hint="MP4, MOV, WebM up to 500MB"
          accept="video/*"
          selectedFileName={file?.name}
          onFileChange={onFileChange}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Caption</label>
        <Textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Say something about this video…"
          resize="y"
          rows={3}
          className="min-h-20 text-sm"
        />
      </div>
    </div>
  );
}