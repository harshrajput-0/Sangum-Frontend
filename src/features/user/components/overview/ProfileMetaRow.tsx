import type { ReactNode } from "react";
import { Calendar, Link as LinkIcon, MapPin } from "lucide-react";
import { formatJoinedDate } from "../../utils/formatJoinedDate";
import type { ProfileData } from "../../types/profile.types";

export interface ProfileMetaRowProps {
  profile: ProfileData;
  className?: string;
}

interface MetaItem {
  icon: ReactNode;
  label: string;
  href?: string;
}

export function ProfileMetaRow({ profile, className = "" }: ProfileMetaRowProps) {
  const items: MetaItem[] = [];

  if (profile.location) {
    items.push({ icon: <MapPin size={14} />, label: profile.location });
  }
  if (profile.socialLinks.website) {
    items.push({
      icon: <LinkIcon size={14} />,
      label: profile.socialLinks.website.replace(/^https?:\/\//, ""),
      href: profile.socialLinks.website,
    });
  }
  items.push({
    icon: <Calendar size={14} />,
    label: formatJoinedDate(profile.joinedAt),
  });

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted",
        className,
      ].join(" ")}
    >
      {items.map((item, index) =>
        item.href ? (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 hover:text-text-secondary"
          >
            {item.icon}
            {item.label}
          </a>
        ) : (
          <span key={index} className="inline-flex items-center gap-1">
            {item.icon}
            {item.label}
          </span>
        ),
      )}
    </div>
  );
}
