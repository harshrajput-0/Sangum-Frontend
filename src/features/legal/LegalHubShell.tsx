"use client";

import { legalHubGroups } from "./constants/legal-hub.data";
import { LegalHubList } from "./components/LegalHubList";

interface LegalHubShellProps {
  /** Called with an item's id (e.g. "terms-of-service") when the person selects it */
  onSelectItem: (id: string) => void;
}

export function LegalHubShell({ onSelectItem }: LegalHubShellProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-10">
        <span className="mb-3 block text-xs font-medium uppercase tracking-wide text-text-muted">
          Legal
        </span>
        <h1 className="mb-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-text sm:text-4xl">
          Legal documents
        </h1>
        <p className="max-w-lg text-[15px] leading-relaxed text-text-secondary">
          Important information about your rights, our policies, and how we operate.
        </p>
      </div>
      <hr className="mb-12 border-border" />
      <LegalHubList groups={legalHubGroups} onSelectItem={onSelectItem} />
    </div>
  );
}