// modules/profile/components/EditProfilePreviewPanel.tsx

import { VerifiedIcon } from "../components/icon";
import Image from "next/image";

export interface ProfileTip {
  title: string;
  description: string;
}

export interface EditProfilePreviewPanelProps {
  displayName: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  verified?: boolean;
  tips?: ProfileTip[];
  className?: string;
}

const DEFAULT_TIPS: ProfileTip[] = [
  { title: "Add your skills.", description: "Showcase your expertise to the community." },
  { title: "Add your interests.", description: "Get better community recommendations." },
];

/** The AppLayout right-panel content for the Edit Profile page — a live-ish mini preview card plus a short tips list. */
export function EditProfilePreviewPanel({
  displayName,
  username,
  avatarUrl,
  coverUrl,
  verified,
  tips = DEFAULT_TIPS,
  className,
}: EditProfilePreviewPanelProps) {
  return (
    <div className={className}>
      <span className="block text-(length:--fs-xs) font-semibold tracking-widest uppercase text-(--primary-light) mb-2.5">
        Profile Preview
      </span>

      <div className="rounded-lg border border-border bg-surface overflow-hidden mb-[18px]">
        <div className="h-[70px]" style={{ background: coverUrl ? undefined : "var(--brand-gradient-cover)" }}>
          {coverUrl && (
            <Image src={coverUrl} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-3.5">
          <div
            className="w-12 h-12 rounded-full border-[3px] border-surface -mt-8 mb-2 flex items-center justify-center text-[15px] font-semibold text-(--text-on-brand) overflow-hidden"
            style={{ backgroundColor: avatarUrl ? undefined : "var(--primary)" }}
          >
            {avatarUrl ? (
              <Image src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              displayName
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((p) => p[0])
                .join("")
                .toUpperCase()
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-(length:--fs-sm) font-semibold text-text">{displayName}</span>
            {verified && <VerifiedIcon className="w-[13px] h-[13px] text-(--info)" />}
          </div>
          <p className="text-(length:--fs-xs) text-text-muted">@{username}</p>
        </div>
      </div>

      <span className="block text-(length:--fs-sm) font-semibold text-text mb-2.5">💡 Profile Tips</span>
      <div className="flex flex-col gap-3">
        {tips.map((tip) => (
          <p key={tip.title} className="text-(length:--fs-xs) text-text-muted leading-relaxed">
            <b className="text-text">{tip.title}</b> {tip.description}
          </p>
        ))}
      </div>
    </div>
  );
}
