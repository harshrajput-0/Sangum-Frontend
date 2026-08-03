'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';

export function SaveButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      // TODO: Replace with Express API integration — POST/DELETE /api/resources/:id/save
      onClick={() => setSaved((prev) => !prev)}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors ${
        saved ? 'border-primary bg-primary/10 text-primary-light' : 'border-border-strong text-text-muted hover:bg-surface-hover'
      }`}
    >
      <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
    </button>
  );
}