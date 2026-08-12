import type { CommunitySummary } from "../../../types/profile.types";
import type { BadgeTone } from "@/shared/components/ui";

export interface CommunityCardProps {
  community: CommunitySummary;
}

// The color token on CommunitySummary is a loose string (mock/API-friendly).
// This maps it onto a real tone, falling back to neutral if it doesn't match.
const KNOWN_TONES: BadgeTone[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
];

const TONE_CLASSES: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
  neutral: "bg-neutral-bg text-neutral",
  outline: "border-1 border-border"
};

export function CommunityCard({ community }: CommunityCardProps) {
  const tone = (KNOWN_TONES as string[]).includes(community.avatarColorToken)
    ? (community.avatarColorToken as BadgeTone)
    : "neutral";

  return (
    <div className="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
      <div
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          TONE_CLASSES[tone],
        ].join(" ")}
      >
        {community.avatarInitials}
      </div>
      <div>
        <p className="text-sm font-medium text-text">{community.name}</p>
        <p className="text-xs text-text-muted">{community.memberCountLabel}</p>
      </div>
    </div>
  );
}
