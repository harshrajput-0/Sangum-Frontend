"use client";

import { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { IconButton } from "@/shared/components/ui";
import { BasicInfoSection } from "./components/BasicInfoSection";
import { CategoryTopicsSection } from "./components/CategoryTopicsSection";
import { CreateSettingsSection } from "./components/CreateSettingsSection";
import { CommunityPreviewCard } from "./components/CommunityPreviewCard";
import {
  CategoryOption,
  SelectOption,
  BasicInfoValue,
  CategoryTopicsValue,
  CreateSettingsValue,
} from "./types";

interface CommunityCreateShellProps {
  categories: CategoryOption[];
  whoCanJoinOptions: SelectOption[];
  whoCanPostOptions: SelectOption[];
  onBack?: () => void;
  onCancel?: () => void;
  onCreate?: (payload: {
    basicInfo: BasicInfoValue;
    categoryTopics: CategoryTopicsValue;
    settings: CreateSettingsValue;
  }) => void;
}

const emptyBasicInfo: BasicInfoValue = { name: "", slug: "", tagline: "", description: "" };
const emptyCategoryTopics: CategoryTopicsValue = { categoryId: "", topics: [] };
const defaultSettings: CreateSettingsValue = {
  whoCanJoin: "anyone",
  whoCanPost: "members",
  requireApproval: false,
};

export function CommunityCreateShell({
  categories,
  whoCanJoinOptions,
  whoCanPostOptions,
//   onBack,
  onCancel,
  onCreate,
}: CommunityCreateShellProps) {
  // Local form state only — submission wiring happens at integration time.
  const [basicInfo, setBasicInfo] = useState(emptyBasicInfo);
  const [categoryTopics, setCategoryTopics] = useState(emptyCategoryTopics);
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        {/* <IconButton icon={ArrowLeft} ariaLabel="Back to Discover" onClick={onBack} > </IconButton> */}       
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
          Create a Community
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <BasicInfoSection value={basicInfo} onChange={setBasicInfo} />
          <CategoryTopicsSection
            categories={categories}
            value={categoryTopics}
            onChange={setCategoryTopics}
          />
          <CreateSettingsSection
            whoCanJoinOptions={whoCanJoinOptions}
            whoCanPostOptions={whoCanPostOptions}
            value={settings}
            onChange={setSettings}
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onCreate?.({ basicInfo, categoryTopics, settings })}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
            >
              Create Community
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <CommunityPreviewCard name={basicInfo.name} slug={basicInfo.slug} />
        </aside>
      </div>
    </div>
  );
}