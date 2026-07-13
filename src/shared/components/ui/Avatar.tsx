/**
 * Avatar.tsx
 * xs · sm · md · lg · xl · 2xl, circle (user) or rounded (community) shape.
 * Falls back to initials on a colored background if no image / on load error.
 */

import { useState } from "react";
import { cn } from "@/shared/utils/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: string;  // Background color behind initials. Defaults to the brand purple
  status?: AvatarStatus;
  className?: string;
}

// Size 
const sizes: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-[length:var(--fs-xs)]",
  md: "h-10 w-10 text-[length:var(--fs-sm)]",
  lg: "h-12 w-12 text-[length:var(--fs-md)]",
  xl: "h-16 w-16 text-[length:var(--fs-xl)]",
  "2xl": "h-20 w-20 text-[length:var(--fs-2xl)]",
};

// Status Size 
const statusSize: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
  "2xl": "h-4 w-4",
};

// Status Color 
const statusColor: Record<AvatarStatus, string> = {
  online: "var(--success)",
  away: "var(--warning)",
  busy: "var(--danger)",
  offline: "var(--neutral)",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  shape = "circle",
  color = "var(--brand-purple)",
  status,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(src) && !imgError;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-[var(--radius-md)]";

  return (
    <span className={cn("relative inline-flex shrink-0", sizes[size], className)}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className={cn("h-full w-full object-cover", shapeClass)}
        />
      ) : (
        <span
          style={{ background: color }}
          className={cn("flex h-full w-full items-center justify-center font-semibold uppercase text-white", shapeClass)}
        >
          {initials}
        </span>
      )}
      {status && (
        <span
          aria-hidden="true"
          style={{ background: statusColor[status] }}
          className={cn(
            "absolute bottom-0 right-0 rounded-full [box-shadow:0_0_0_2px_var(--surface)]",
            statusSize[size],
          )}
        />
      )}
    </span>
  );
}
