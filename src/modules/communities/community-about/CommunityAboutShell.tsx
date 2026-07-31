import { AboutInfoCard } from "./components/AboutInfoCard";
import { CommunityRulesList } from "./components/CommunityRulesList";
import { TopTopicsList } from "./components/TopTopicsList";
import { AdminsList } from "./components/AdminsList";
import { CommunityAboutInfo, AboutRule, TopTopic, AdminMember } from "./types";

interface CommunityAboutShellProps {
  aboutInfo: CommunityAboutInfo;
  rules: AboutRule[];
  topTopics: TopTopic[];
  admins: AdminMember[];
}

export function CommunityAboutShell({
  aboutInfo,
  rules,
  topTopics,
  admins,
}: CommunityAboutShellProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AboutInfoCard info={aboutInfo} />
        <CommunityRulesList rules={rules} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TopTopicsList topics={topTopics} />
        <AdminsList admins={admins} />
      </div>
    </div>
  );
}