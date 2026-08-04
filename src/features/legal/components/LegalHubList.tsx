import { ChevronRight } from "lucide-react";
import type { LegalHubGroup } from "../legal.types";

interface LegalHubListProps {
  groups: LegalHubGroup[];
  onSelectItem: (id: string) => void;
}

export function LegalHubList({ groups, onSelectItem }: LegalHubListProps) {
  return (
    <>
      {groups.map((group, index) => (
        <div key={group.id} className={index < groups.length - 1 ? "mb-10" : ""}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {group.label}
          </h2>
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(item.id)}
                  className="group flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-surface-hover"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold text-text-muted transition-colors group-hover:border-text-muted">
                    {Icon ? <Icon size={17} strokeWidth={1.75} /> : item.iconGlyph}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-sm font-semibold text-text">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-text-muted">{item.description}</p>
                  </div>
                  <ChevronRight
                    size={15}
                    className="mt-1 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary-light"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}