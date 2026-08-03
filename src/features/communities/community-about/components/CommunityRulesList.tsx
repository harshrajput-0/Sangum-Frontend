import { Card } from "@/shared/components/ui";
import { AboutRule } from "../types";

interface CommunityRulesListProps {
  rules: AboutRule[];
}

export function CommunityRulesList({ rules }: CommunityRulesListProps) {
  return (
    <Card>
      <p className="mb-4 text-sm font-semibold text-text">Community Rules</p>
      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div key={rule.title} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary-light">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-text">{rule.title}</p>
              <p className="text-xs text-text-muted">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}