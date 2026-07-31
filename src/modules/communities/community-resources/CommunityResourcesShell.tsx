"use client";

import { useState } from "react";
import { SearchInput, ChipGroup } from "@/modules/communities/shared/components/ui";
import { ResourceListItem } from "./components/ResourceListItem";
import { ResourceTypeOption, Resource } from "./types";

interface CommunityResourcesShellProps {
  resourceTypes: ResourceTypeOption[];
  resources: Resource[];
  onBookmarkToggle?: (id: string) => void;
  onResourceClick?: (id: string) => void;
}

export function CommunityResourcesShell({
  resourceTypes,
  resources,
  onBookmarkToggle,
  onResourceClick,
}: CommunityResourcesShellProps) {
  // Visual-only for now — real search/filtering will query the API.
  const [searchValue, setSearchValue] = useState("");
  const [activeTypeId, setActiveTypeId] = useState(resourceTypes[0]?.id ?? "all");

  return (
    <div>
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search resources…"
        className="mb-3.5"
      />
      <ChipGroup
        options={resourceTypes}
        activeId={activeTypeId}
        onChange={setActiveTypeId}
        className="mb-4"
      />
      <div className="space-y-3">
        {resources.map((resource) => (
          <ResourceListItem
            key={resource.id}
            resource={resource}
            onBookmarkToggle={onBookmarkToggle}
            onClick={onResourceClick}
          />
        ))}
      </div>
    </div>
  );
}