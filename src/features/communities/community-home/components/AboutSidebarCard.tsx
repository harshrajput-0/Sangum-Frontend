import { Card } from "@/shared/components/ui";
import { AboutSummary } from "../types";

interface AboutSidebarCardProps {
  summary: AboutSummary;
}

export function AboutSidebarCard({ summary }: AboutSidebarCardProps) {
  return (
    <Card>
      <p className="mb-3 text-sm font-semibold text-text">About this community</p>
      <p className="mb-4 text-xs leading-relaxed text-text-muted">{summary.description}</p>
      <div className="mb-4 space-y-2 border-t border-border pt-4">
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Created</span>
          <span className="text-text">{summary.createdAt}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Type</span>
          <span className="text-text">{summary.type}</span>
        </div>
      </div>
      <p className="mb-2 text-sm font-semibold text-text">Community Rules</p>
      <div className="space-y-1.5 text-xs text-text-muted">
        {summary.rules.map((rule, index) => (
          <p key={index}>
            {index + 1}. {rule}
          </p>
        ))}
      </div>
    </Card>
  );
}