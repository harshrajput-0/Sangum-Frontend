"use client";

import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";

export type AvatarSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-10 w-10 text-sm",
};

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 28,
  md: 36,
  lg: 40,
};

const ICON_SIZE: Record<AvatarSize, number> = {
  sm: 14,
  md: 18,
  lg: 20,
};

// Written as a literal array (not built dynamically) so Tailwind's
// content scanner actually sees each class name as text and generates
// the CSS for it — these are picked programmatically by index below,
// which on its own wouldn't be enough for Tailwind to detect them.
const COLOR_PALETTE = [
  "bg-primary",
  "bg-accent",
  "bg-success",
  "bg-info",
  "bg-warning",
  "bg-danger",
] as const;

/**
 * Deterministic, not random-per-render: the same name always hashes to
 * the same color. A real "random every render" avatar would visibly
 * flicker color on every re-render/page reload, which reads as broken,
 * not playful — this gives the same "looks random across different
 * people" effect while staying stable for any one person.
 */
function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length];
}

function initialFromName(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "";
}

export interface AvatarProps {
  /** Explicit initials — takes priority over `fullName` when both are given. Existing call sites that already compute initials themselves keep working unchanged. */
  initials?: string;
  /** Full display name — derives a single-letter initial and a deterministic background color when `initials`/`color` aren't explicitly provided. */
  fullName?: string;
  /** Explicit background token (e.g. 'bg-primary') — takes priority over the color derived from `fullName`. */
  color?: string;
  size?: AvatarSize;
  imageSrc?: string;
  imageAlt?: ImgHTMLAttributes<HTMLImageElement>["alt"];
  className?: string;
}

export function Avatar({
  initials,
  fullName,
  color,
  size = "md",
  imageSrc,
  imageAlt,
  className = "",
}: AvatarProps) {
  const sizeClass = SIZE_CLASSES[size];
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const imageFailed = imageSrc !== undefined && imageSrc === erroredSrc;

  if (imageSrc && !imageFailed) {
    return (
      <Image
        src={imageSrc}
        alt={imageAlt ?? fullName ?? initials ?? "Avatar"}
        width={SIZE_PX[size]}
        height={SIZE_PX[size]}
        onError={() => setErroredSrc(imageSrc)}
        className={["shrink-0 rounded-full object-cover", sizeClass, className].join(" ")}
      />
    );
  }

  const resolvedInitial = initials || (fullName ? initialFromName(fullName) : "");

  // No name and no explicit initials → a generic user icon on a
  // neutral background, instead of an empty (or, previously, black) circle.
  if (!resolvedInitial) {
    return (
      <div
        className={[
          "flex shrink-0 items-center justify-center rounded-full bg-surface-active text-text-muted",
          sizeClass,
          className,
        ].join(" ")}
      >
        <UserRound size={ICON_SIZE[size]} strokeWidth={2} />
      </div>
    );
  }

  // `color` always resolves to a real token now — never undefined,
  // which is what caused the black-circle bug in the original.
  const resolvedColor = color || (fullName ? colorFromName(fullName) : "bg-neutral");

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-text-on-primary",
        resolvedColor,
        sizeClass,
        className,
      ].join(" ")}
    >
      {resolvedInitial}
    </div>
  );
}