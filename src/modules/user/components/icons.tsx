// modules/users/components/icons.tsx

/**
 * Placeholder icon set for the User components.
 *
 * These are intentionally plain shapes so the components are runnable out
 * of the box — swap them for your real icon set later (e.g. lucide-react,
 * heroicons, an in-house sprite, etc). Every icon takes a `className` so
 * size/color can be controlled the same way everywhere: e.g.
 * `<PlusIcon className="w-4 h-4 text-[var(--text-muted)]" />`.
 */

type IconProps = { className?: string };

/** TODO: replace with real icon — used in FollowButton (not-following state) */
export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** TODO: replace with real icon — used in FollowButton (following state) */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** TODO: replace with real icon — used in UserHoverCard's "Message" action */
export function MessageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4V5z" />
    </svg>
  );
}

/** TODO: replace with real icon — default "Profile" row in UserMenu */
export function ProfileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.6-3.4 4.4-5 7.5-5s5.9 1.6 7.5 5" />
    </svg>
  );
}

/** TODO: replace with real icon — default "Settings" row in UserMenu */
export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.6M12 18.4V21M21 12h-2.6M5.6 12H3M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9M18.4 18.4l-1.9-1.9M7.5 7.5L5.6 5.6" />
    </svg>
  );
}

/** TODO: replace with real icon — default "Log out" row in UserMenu */
export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14 4H7a2 2 0 00-2 2v12a2 2 0 002 2h7M10 12h10m0 0l-3.5-3.5M20 12l-3.5 3.5" />
    </svg>
  );
}
