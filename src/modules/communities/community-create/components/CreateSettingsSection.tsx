"use client";

import { Check } from "lucide-react";
import { Card, FormField } from "@/modules/communities/shared/components/ui";
import { SelectOption, CreateSettingsValue } from "../types";

interface CreateSettingsSectionProps {
  whoCanJoinOptions: SelectOption[];
  whoCanPostOptions: SelectOption[];
  value: CreateSettingsValue;
  onChange: (value: CreateSettingsValue) => void;
}

export function CreateSettingsSection({
  whoCanJoinOptions,
  whoCanPostOptions,
  value,
  onChange,
}: CreateSettingsSectionProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary-light">
          3
        </span>
        <span className="text-sm font-semibold text-text">Community Settings</span>
      </div>
      <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="Who can join?" htmlFor="create-who-join">
          <select
            id="create-who-join"
            value={value.whoCanJoin}
            onChange={(e) => onChange({ ...value, whoCanJoin: e.target.value })}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary"
          >
            {whoCanJoinOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Who can post?" htmlFor="create-who-post">
          <select
            id="create-who-post"
            value={value.whoCanPost}
            onChange={(e) => onChange({ ...value, whoCanPost: e.target.value })}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary"
          >
            {whoCanPostOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-bg-elevated p-3">
        <input
          type="checkbox"
          checked={value.requireApproval}
          onChange={(e) => onChange({ ...value, requireApproval: e.target.checked })}
          className="sr-only"
        />
        <span
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
            value.requireApproval
              ? "bg-primary text-text-on-primary"
              : "border border-border-strong",
          ].join(" ")}
        >
          {value.requireApproval && <Check size={13} strokeWidth={3} />}
        </span>
        <span className="text-sm text-text-secondary">
          Require admin approval for new members
        </span>
      </label>
    </Card>
  );
}