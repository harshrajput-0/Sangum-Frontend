"use client";

import { Check } from "lucide-react";
import { Card, FormField } from "@/modules/communities/shared/components/ui";
import { BasicInfoValue } from "../types";

interface BasicInfoSectionProps {
  value: BasicInfoValue;
  onChange: (value: BasicInfoValue) => void;
  slugAvailable?: boolean;
}

export function BasicInfoSection({
  value,
  onChange,
  slugAvailable = true,
}: BasicInfoSectionProps) {
  const update = (field: keyof BasicInfoValue, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary-light">
          1
        </span>
        <span className="text-sm font-semibold text-text">Basic Information</span>
      </div>
      <div className="space-y-3.5">
        <FormField label="Community Name" htmlFor="create-name">
          <input
            id="create-name"
            placeholder="Enter community name"
            value={value.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </FormField>

        <FormField
          label="Community Slug"
          htmlFor="create-slug"
          hint={`sangum.com/c/${value.slug || "your-community"}`}
        >
          <div className="flex items-center gap-2 rounded-md border border-border bg-input-bg px-3.5 py-2.5">
            <input
              id="create-slug"
              value={value.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="w-full bg-transparent text-sm text-text outline-none"
            />
            {slugAvailable && <Check size={16} className="shrink-0 text-success" />}
          </div>
        </FormField>

        <FormField label="Tagline" htmlFor="create-tagline">
          <input
            id="create-tagline"
            placeholder="A short tagline describing your community"
            value={value.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </FormField>

        <FormField label="Description" htmlFor="create-description">
          <textarea
            id="create-description"
            placeholder="Describe your community, its purpose, and what members can expect."
            value={value.description}
            onChange={(e) => update("description", e.target.value)}
            className="min-h-[90px] w-full resize-y rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
        </FormField>
      </div>
    </Card>
  );
}