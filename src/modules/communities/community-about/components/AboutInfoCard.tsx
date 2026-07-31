import { Card } from "@/shared/components/ui";
import { CommunityAboutInfo } from "../types";

interface AboutInfoCardProps {
  info: CommunityAboutInfo;
}

export function AboutInfoCard({ info }: AboutInfoCardProps) {
  return (
    <Card>
      <p className="mb-2.5 text-sm font-semibold text-text">About this community</p>
      <p className="mb-5 text-sm leading-relaxed text-text-secondary">{info.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {info.stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
              <stat.icon size={15} />
            </span>
            <div>
              <p className="text-[11px] text-text-muted">{stat.label}</p>
              <p className="text-xs font-medium text-text">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}