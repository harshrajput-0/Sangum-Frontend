"use client";

import { Card, FormField } from "@/modules/communities/shared/components/ui";
import { GeneralInfo } from "../types";

interface GeneralInfoFormProps {
  value: GeneralInfo;
  onChange: (value: GeneralInfo) => void;
}

export function GeneralInfoForm({ value, onChange }: GeneralInfoFormProps) {
  const update = (field: keyof GeneralInfo, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Card>
      <p className="mb-4 text-sm font-semibold text-text">General Information</p>
      <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="Community Name" htmlFor="community-name">
          <input
            id="community-name"
            value={value.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </FormField>
        <FormField label="Community Slug" htmlFor="community-slug">
          <input
            id="community-slug"
            value={value.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </FormField>
      </div>
      <div className="mb-3.5">
        <FormField label="Tagline" htmlFor="community-tagline">
          <input
            id="community-tagline"
            value={value.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </FormField>
      </div>
      <FormField label="Description" htmlFor="community-description">
        <textarea
          id="community-description"
          value={value.description}
          onChange={(e) => update("description", e.target.value)}
          className="min-h-20 w-full resize-y rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
      </FormField>
    </Card>
  );
}