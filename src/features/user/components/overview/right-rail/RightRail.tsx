import { StatsGrid } from "../StatsGrid";
import { AboutCard } from "./AboutCard";
import { YourCommunitiesCard } from "./YourCommunitiesCard";
import type { CommunitySummary, ProfileData } from "../../../types/profile.types";

export interface RightRailProps {
  profile: ProfileData;
  communities: CommunitySummary[];
}

export function RightRail({ profile, communities }: RightRailProps) {
  return (
    <aside className="hidden w-full flex-col gap-4 lg:flex lg:w-80 lg:shrink-0">
      <StatsGrid stats={profile.stats} />
      <AboutCard profile={profile} />
      <YourCommunitiesCard communities={communities} />
    </aside>
  );
}
