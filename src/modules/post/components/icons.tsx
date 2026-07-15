// modules/posts/components/icons.tsx

/**
 * Placeholder icon set for the posts module.
 * These are deliberately simple/generic outline shapes — swap each one for
 * your real icon set (lucide-react, heroicons, custom SVGs, ...) later.
 * Every icon takes `className` so size/color is controlled via Tailwind
 * (e.g. `className="w-4 h-4 text-[var(--text-muted)]"`).
 */


export interface IconProps {
  className?: string;
}

// ---- PostTypeSelector icons ------------------------------------------------

/** icon: text lines placeholder — replace later */
export function TextTypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

/** icon: photo placeholder — replace later */
export function ImageTypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

/** icon: play/video placeholder — replace later */
export function VideoTypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

/** icon: chain-link placeholder — replace later */
export function LinkTypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 007.07 0l1.93-1.93a5 5 0 00-7.07-7.07L10 5" />
      <path d="M14 11a5 5 0 00-7.07 0l-1.93 1.93a5 5 0 007.07 7.07L14 19" />
    </svg>
  );
}

/** icon: bar-chart placeholder — replace later */
export function PollTypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 21H4a1 1 0 01-1-1V3" />
      <path d="M7 14l4-4 4 4 5-5" />
    </svg>
  );
}

// ---- PostHeader menu icons --------------------------------------------------

/** icon: 3-dot menu trigger — replace later */
export function MoreIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

/** icon: pencil/edit placeholder — replace later */
export function EditIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

/** icon: trash/delete placeholder — replace later */
export function DeleteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
    </svg>
  );
}

/** icon: flag/report placeholder — replace later */
export function ReportIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 21V4a1 1 0 011-1h9l-1 4h6a1 1 0 011 1v9a1 1 0 01-1 1h-9l1-4H5" />
    </svg>
  );
}

/** icon: pin placeholder — replace later */
export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a5 5 0 00-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 00-5-5z" />
      <circle cx="12" cy="7" r="2" />
    </svg>
  );
}

// ---- PostActions icons ------------------------------------------------------

export interface ToggleIconProps extends IconProps {
  /** Switches between filled (active) and outline (inactive) rendering. */
  filled?: boolean;
}

/** icon: like/thumbs-up placeholder — replace later */
export function ThumbIcon({ filled, className }: ToggleIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3z" />
    </svg>
  );
}

/** icon: comment bubble placeholder — replace later */
export function CommentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 01-7.6 8.5 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6" />
    </svg>
  );
}

/** icon: share/nodes placeholder — replace later */
export function ShareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

/** icon: bookmark/ribbon placeholder — replace later */
export function BookmarkIcon({ filled, className }: ToggleIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

// ---- PostMedia icon ----------------------------------------------------------

/** icon: video play button overlay placeholder — replace later */
export function PlayCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.35)" stroke="currentColor" strokeWidth={1.5} />
      <path d="M10 8.3l6 3.7-6 3.7V8.3z" fill="currentColor" />
    </svg>
  );
}
