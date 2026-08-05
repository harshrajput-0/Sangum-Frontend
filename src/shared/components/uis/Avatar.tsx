// usauage <Avatar size="md" name="Harst Rajput" color={avatarColor} />
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type PresenceStatus = "online" | "away" | "busy" | "offline";

export interface AvatarProps {
  /** Full display name. Used to derive initials and a fallback color. */
  name: string;
  /** Optional image URL. Falls back to initials when omitted. */
  src?: string;
  size?: AvatarSize;
  /** Override the deterministic background color (any valid CSS color). */
  color?: string;
  /** Rounded-square shape instead of a circle (used for group avatars). */
  square?: boolean;
  status?: PresenceStatus;
  className?: string;
}

export const AVATAR_SIZE_CLASSES: Record<AvatarSize, { box: string; text: string }> = {
  xs: { box: "w-5 h-5", text: "text-[8px]" },
  sm: { box: "w-7 h-7", text: "text-[10px]" },
  md: { box: "w-9 h-9", text: "text-xs" },
  lg: { box: "w-12 h-12", text: "text-md" },
  xl: { box: "w-16 h-16", text: "text-xl" },
  "2xl": { box: "w-[88px] h-[88px]", text: "text-2xl" },
};

const STATUS_COLOR_CLASSES: Record<PresenceStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-danger",
  offline: "bg-neutral",
};

// A small, fixed palette pulled from the theme so avatars without an
// explicit color are still on-brand and consistent across renders.
const FALLBACK_PALETTE = [
  "var(--primary)",
  "var(--accent)",
  "var(--success)",
  "var(--info)",
  "var(--warning)",
  "var(--danger)",
];

function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % FALLBACK_PALETTE.length;
  return FALLBACK_PALETTE[index];
}

export  function Avatar({
  name,
  src,
  size = "md",
  color,
  square = false,
  status,
  className = "",
}: AvatarProps) {
  const { box, text } = AVATAR_SIZE_CLASSES[size];
  const background = color ?? colorFromName(name);

  return (
    <span className={`relative inline-flex shrink-0 ${className}`}>
      <span
        className={`${box} ${square ? "rounded-md" : "rounded-full"} inline-flex items-center justify-center overflow-hidden font-semibold text-text-on-primary shrink-0`}
        style={{ backgroundColor: src ? undefined : background }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className={text}>{getInitials(name)}</span>
        )}
      </span>
      {status && (
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-surface ${STATUS_COLOR_CLASSES[status]}`}
        />
      )}
    </span>
  );
}