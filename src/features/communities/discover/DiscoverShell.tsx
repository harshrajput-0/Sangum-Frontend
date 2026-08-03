"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SearchInput, ChipGroup, LoadMoreButton } from "@/features/communities/shared/components/ui";
import { FeaturedCommunityCard } from "./components/FeaturedCommunityCard";
import { CommunityListItem } from "./components/CommunityListItem";
import { CategoryOption, CommunitySummaryCard } from "./types";

interface DiscoverShellProps {
  categories: CategoryOption[];
  featuredCommunities: CommunitySummaryCard[];
  allCommunities: CommunitySummaryCard[];
  hasMore?: boolean;
  onCreateClick?: () => void;
  onToggleJoin?: (id: string) => void;
  onCommunityClick?: (id: string) => void;
  onLoadMore?: () => void;
}

export function DiscoverShell({
  categories,
  featuredCommunities,
  allCommunities,
  hasMore = false,
  onCreateClick,
  onToggleJoin,
  onCommunityClick,
  onLoadMore,
}: DiscoverShellProps) {
  // Visual-only for now — real search/filtering will query the API.
  const [searchValue, setSearchValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "all");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            Discover Communities
          </h1>
          <p className="text-sm text-text-muted">
            Find your people. Join communities built around what you love.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateClick}
          className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
        >
          <Plus size={16} /> Create Community
        </button>
      </div>

      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search communities…"
        className="mb-3.5"
      />
      <ChipGroup
        options={categories}
        activeId={activeCategoryId}
        onChange={setActiveCategoryId}
        className="mb-8"
      />

      <section className="mb-8">
        <h2 className="mb-3.5 text-base font-semibold text-text">Featured Communities</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCommunities.map((community) => (
            <FeaturedCommunityCard
              key={community.id}
              community={community}
              onToggleJoin={(id) => onToggleJoin?.(id)}
              onClick={onCommunityClick}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3.5 text-base font-semibold text-text">All Communities</h2>
        <div className="space-y-2.5">
          {allCommunities.map((community) => (
            <CommunityListItem
              key={community.id}
              community={community}
              onToggleJoin={(id) => onToggleJoin?.(id)}
              onClick={onCommunityClick}
            />
          ))}
        </div>
        {hasMore && <LoadMoreButton onClick={() => onLoadMore?.()} />}
      </section>
    </div>
  );
}