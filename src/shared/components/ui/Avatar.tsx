import type { ImgHTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-10 w-10 text-sm",
};

export interface AvatarProps {
  initials: string;
  color: string; // tailwind bg-* token, e.g. 'bg-primary'
  size?: AvatarSize;
  imageSrc?: string;
  imageAlt?: ImgHTMLAttributes<HTMLImageElement>["alt"];
  className?: string;
}

/**
 * Promoted from features/posts/primitives — now consumed by both
 * features/posts (post cards, create post composer) and
 * shared/comments (comment nodes/composers).
 * ACTION NEEDED: update the existing imports in features/posts
 * (Post Detail / Create Post files) to point here, then delete the
 * old feature-local copy.
 */
export function Avatar({
  initials,
  color,
  size = "md",
  imageSrc,
  imageAlt,
  className = "",
}: AvatarProps) {
  const sizeClass = SIZE_CLASSES[size];

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={imageAlt ?? initials}
        className={["shrink-0 rounded-full object-cover", sizeClass, className].join(" ")}
      />
    );
  }

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-text-on-primary",
        color,
        sizeClass,
        className,
      ].join(" ")}
    >
      {initials}
    </div>
  );
}