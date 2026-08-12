import { Play } from 'lucide-react';

/**
 * Matches the mock exactly: a generic gradient placeholder + play
 * button — the reference data never included a real video source or
 * thumbnail for any post. TODO(api): once posts carry a real
 * thumbnail/video URL, swap the gradient div for an actual poster frame.
 */
export function PostVideoMedia() {
  return (
    <div className="relative mb-4 w-full overflow-hidden rounded-lg">
      <div className="aspect-video w-full bg-linear-to-br from-primary to-info" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
          <Play size={22} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}