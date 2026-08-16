import { getInitials, pickFallbackColor } from '../lib/avatarFallback';

interface AvatarDisplayProps {
  avatarUrl: string | null | undefined;
  fullName: string;
}

// Renders the backend-returned avatar, or a client-side initials
// fallback for the edge case where it's null/empty (OnboardingResponse's
// type allows it, even though the identicon fallback means it's not
// expected in practice).
export function AvatarDisplay({ avatarUrl, fullName }: AvatarDisplayProps) {
  if (avatarUrl) {
    return (
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarUrl} alt="Your avatar" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-xl font-semibold text-text-on-primary"
      style={{ backgroundColor: pickFallbackColor() }}
    >
      {getInitials(fullName)}
    </div>
  );
}
