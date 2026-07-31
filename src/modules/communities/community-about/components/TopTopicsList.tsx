import { Card, Tag } from "@/modules/communities/shared/components/ui";
import { TopTopic } from "../types";

interface TopTopicsListProps {
  topics: TopTopic[];
}

export function TopTopicsList({ topics }: TopTopicsListProps) {
  return (
    <Card>
      <p className="mb-3 text-sm font-semibold text-text">Top Topics</p>
      <div className="space-y-2.5">
        {topics.map((topic) => (
          <div key={topic.label} className="flex items-center justify-between">
            <Tag label={topic.label} />
            <span className="text-xs text-text-muted">{topic.postCountLabel}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}