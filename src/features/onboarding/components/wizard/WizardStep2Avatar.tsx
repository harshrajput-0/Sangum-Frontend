'use client';

import { useRef } from 'react';
import { Button } from '@/shared/components/ui';
import { AVATAR_ACCEPT_ATTR } from '../../constants/onboarding.constants';

interface WizardStep2AvatarProps {
  avatarPreviewUrl: string | null;
  submitError: string | null;
  onAvatarSelected: (file: File | null) => void;
  onFinish: () => void;
}

// No isSubmitting/spinner state here anymore — clicking Skip or Finish
// advances immediately to step 3, which IS the loading state. This
// screen unmounts before the request resolves either way.
export function WizardStep2Avatar({
  avatarPreviewUrl,
  submitError,
  onAvatarSelected,
  onFinish,
}: WizardStep2AvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="animate-welcome-in">
      <h1 className="mb-1.5 text-2xl font-bold text-text">Add a profile photo</h1>
      <p className="mb-7 text-sm text-text-secondary">
        Skip this and we&apos;ll generate one for you automatically — you can always change it later.
      </p>

      {/* No shared primitive covers a large click-to-upload avatar circle
          with a preview — Avatar in shared/components/ui tops out at 40px
          (lg) and is image-display-only, so this stays custom. */}
      <div className="mb-6 flex flex-col items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative mb-3 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border-strong bg-bg-elevated text-text-muted transition-colors duration-200 hover:border-primary hover:text-primary-light"
        >
          {avatarPreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarPreviewUrl} alt="Avatar preview" className="h-full w-full object-cover" />
          ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          )}
          <div className="absolute inset-0 hidden items-center justify-center bg-black/40 text-xs font-medium text-white group-hover:flex">
            Change
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={AVATAR_ACCEPT_ATTR}
          onChange={(e) => onAvatarSelected(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <p className="text-xs text-text-muted">PNG, JPG, WEBP or GIF, up to 5MB</p>
      </div>

      {submitError && <p className="mb-4 text-center text-xs text-danger">{submitError}</p>}

      <div className="flex gap-2">
        <Button variant="outline" size="lg" fullWidth onClick={onFinish}>
          Skip
        </Button>
        <Button variant="primary" size="lg" fullWidth onClick={onFinish}>
          Finish
        </Button>
      </div>
    </section>
  );
}
