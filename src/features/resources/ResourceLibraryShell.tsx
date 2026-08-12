'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LibraryToolbar } from './components/library/LibraryToolbar';
import { TypeFilterChips } from './components/library/TypeFilterChips';
import { ResourceGrid } from './components/library/ResourceGrid';
import { mockResources } from './mock';
import type { ResourceTypeFilter, SortOption } from './types';

export function ResourceLibraryShell() {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState<SortOption>('newest');
  const [activeType, setActiveType] = useState<ResourceTypeFilter>('All');

  // TODO: Replace with Express API integration — GET /api/resources?query=&type=&sort=
  const filteredResources = mockResources.filter((resource) => {
    const matchesType = activeType === 'All' || resource.type === activeType;
    const matchesSearch = resource.title.toLowerCase().includes(searchValue.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold text-text">Resource Library</h1>
        <Link
          href="/resources/submit"
          className="self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover sm:self-auto"
        >
          + Submit Resource
        </Link>
      </div>

      <LibraryToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <TypeFilterChips active={activeType} onChange={setActiveType} />

      <ResourceGrid resources={filteredResources} />

      {filteredResources.length > 0 && (
        <div className="mt-6 flex justify-center">
          {/* TODO: Replace with Express API integration — GET /api/resources?page=next (pagination) */}
          <button className="rounded-md border border-border-strong px-4 py-2 text-xs font-medium text-text hover:bg-surface-hover">
            Load more
          </button>
        </div>
      )}
    </div>
  );
}