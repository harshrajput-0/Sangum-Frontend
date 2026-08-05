import { useRef } from "react";
import { Camera } from "lucide-react";
import type { UseProfileImageUploadResult } from "../../hooks/edit/useProfileImageUpload";

export interface EditProfileHeaderProps {
  fullName: string;
  avatar: UseProfileImageUploadResult;
  cover: UseProfileImageUploadResult;
}

export function EditProfileHeader({ fullName, avatar, cover }: EditProfileHeaderProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-xs">
      <div
        className="relative h-40 w-full bg-cover bg-center sm:h-52"
        style={{
          backgroundImage: cover.previewUrl
            ? `url(${cover.previewUrl})`
            : "var(--brand-gradient-cover)",
        }}
      >
        <button
          type="button"
          onClick={() => coverInputRef.current?.click()}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-text backdrop-blur transition-colors duration-150 hover:bg-surface"
        >
          <Camera size={14} />
          Change Cover
        </button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => cover.handleFileChange(e.target.files?.[0])}
        />
      </div>

      <div className="px-5 pb-5">
        <div className="-mt-10 flex items-end gap-4">
          <div className="relative h-24 w-24 shrink-0">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-surface bg-surface-hover">
              {avatar.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar.previewUrl}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-text-secondary">
                  {fullName.charAt(0)}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Change avatar"
              className="absolute bottom-0 right-0 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary text-text-on-primary transition-colors duration-150 hover:bg-primary-hover"
            >
              <Camera size={14} />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => avatar.handleFileChange(e.target.files?.[0])}
            />
          </div>
        </div>

        {(avatar.error || cover.error) && (
          <p className="mt-2 text-xs text-danger">{avatar.error ?? cover.error}</p>
        )}
      </div>
    </div>
  );
}
