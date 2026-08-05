import { Calendar, Link as LinkIcon, MapPin } from "lucide-react";
import { Card } from "@/shared/components/ui";
import { formatJoinedDate } from "../../../utils/formatJoinedDate";
import type { ProfileData } from "../../../types/profile.types";

export interface AboutCardProps {
  profile: ProfileData;
}

export function AboutCard({ profile }: AboutCardProps) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-text">About</h3>
      <div className="mt-3 flex flex-col gap-2 text-sm text-text-secondary">
        {profile.location && (
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-text-muted" />
            {profile.location}
          </span>
        )}
        {profile.socialLinks.website && (
          <a
            href={profile.socialLinks.website}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 hover:text-text"
          >
            <LinkIcon size={14} className="text-text-muted" />
            {profile.socialLinks.website.replace(/^https?:\/\//, "")}
          </a>
        )}
        <span className="inline-flex items-center gap-2">
          <Calendar size={14} className="text-text-muted" />
          {formatJoinedDate(profile.joinedAt)}
        </span>
      </div>
    </Card>
  );
}
