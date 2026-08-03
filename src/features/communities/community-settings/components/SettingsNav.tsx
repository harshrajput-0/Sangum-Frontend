"use client";

import { SettingsSection } from "../types";

interface SettingsNavProps {
  sections: SettingsSection[];
  activeSectionId: string;
  onSectionChange: (id: string) => void;
}

export function SettingsNav({ sections, activeSectionId, onSectionChange }: SettingsNavProps) {
  return (
    <>
      <select
        value={activeSectionId}
        onChange={(e) => onSectionChange(e.target.value)}
        className="mb-1 w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none lg:hidden"
      >
        {sections.map((section) => (
          <option key={section.id} value={section.id}>
            {section.label}
          </option>
        ))}
      </select>
      <nav className="hidden space-y-1 lg:sticky lg:top-20 lg:block lg:self-start">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={[
              "block w-full rounded-lg border-l-2 px-3 py-2 text-left text-sm transition-colors",
              section.id === activeSectionId
                ? "border-primary bg-primary/10 font-medium text-primary-light"
                : "border-transparent text-text-muted hover:bg-surface-hover hover:text-text",
            ].join(" ")}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </>
  );
}