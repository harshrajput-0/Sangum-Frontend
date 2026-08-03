'use client';

import { useState, type ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

const ALLOWED_TYPES = ['image/png', 'image/jpeg'];
const MAX_BYTES = 2 * 1024 * 1024;

interface ThumbnailDropzoneProps {
  onFileSelect: (file: File | null) => void;
}

export function ThumbnailDropzone({ onFileSelect }: ThumbnailDropzoneProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('Click to upload a custom thumbnail · PNG or JPG, up to 2MB');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setStatus('error');
      setMessage('Only PNG or JPG images are allowed · try again');
      e.target.value = '';
      onFileSelect(null);
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus('error');
      setMessage('That file is over 2MB · try a smaller image');
      e.target.value = '';
      onFileSelect(null);
      return;
    }

    setStatus('success');
    setMessage(`${file.name} selected · click to replace`);
    onFileSelect(file);
  }

  const zoneClasses =
    status === 'error'
      ? 'border-danger bg-danger/5'
      : status === 'success'
        ? 'border-success bg-success/5'
        : 'border-border-strong hover:border-primary hover:bg-primary/5';

  return (
    <div>
      <label
        htmlFor="thumbnailInput"
        className={`block cursor-pointer rounded-lg border-1.5 border-dashed p-6 text-center transition-colors ${zoneClasses}`}
      >
        <Upload size={22} className="mx-auto mb-2 text-text-muted" strokeWidth={1.5} />
        <p className="text-xs text-text-muted">{message}</p>
      </label>
      <input id="thumbnailInput" type="file" accept="image/png, image/jpeg" onChange={handleChange} className="hidden" />
    </div>
  );
}