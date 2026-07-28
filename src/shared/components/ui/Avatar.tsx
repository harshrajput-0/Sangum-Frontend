export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

interface AvatarProps {
  /** Full name — used for the fallback initials and alt text. */
  name: string;
  /** Optional image URL. Falls back to initials when omitted. */
  src?: string;
  size?: AvatarSize;
  shape?: "circle" | "rounded";
  /** Tailwind background class for the initials fallback, e.g. "bg-primary". */
  color?: string;
  status?: AvatarStatus;
  className?: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: "w-5 h-5 text-[8px]",
  sm: "w-7 h-7 text-[10px]",
  md: "w-9 h-9 text-xs",
  lg: "w-12 h-12 text-md",
  xl: "w-16 h-16 text-xl",
  "2xl": "w-[88px] h-[88px] text-2xl",
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-danger",
  offline: "bg-neutral",
};

function getInitials(name: string) {
  if (!name) return "";
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function Avatar({
  name,
  src,
  size = "md",
  shape = "circle",
  color = "bg-primary",
  status,
  className = "",
}: AvatarProps) {
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-md";

  return (
    <span className={`relative inline-flex shrink-0 ${className} border border-border ${shapeClass} bg-primary`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className={`${SIZE_CLASSES[size]} ${shapeClass} object-cover`}
        />
      ) : (
        <span
          className={`${SIZE_CLASSES[size]}  ${color} flex items-center justify-center font-semibold text-text-on-primary`}
        >
          {getInitials(name)}
        </span>
      )}
      {status && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface ${STATUS_CLASSES[status]}`}
        />
      )}
    </span>
  );
}