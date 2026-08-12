'use client';

import { useMemo, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { TabNav, EmptyState } from '@/shared/components/ui';
import { SearchInput } from './components/SearchInput';
import { SearchResultsHeading } from './components/SearchResultsHeading';
import { SearchResultsSection } from './components/SearchResultsSection';
import { PostResultRow } from './components/PostResultRow';
import { PersonResultCard } from './components/PersonResultCard';
import { CommunityResultRow } from './components/CommunityResultRow';
import { ResourceResultRow } from './components/ResourceResultRow';
import { TagChip } from './components/TagChip';
import { mockSearchResults } from './mock';
import type { SearchTab } from './types/types';

interface SearchShellProps {
  initialQuery?: string;
}

export function SearchShell({ initialQuery = '' }: SearchShellProps) {
  // TODO: Replace with useSearch() hook — GET /api/search?q=&type= once backend integration begins
  const results = mockSearchResults;

  const [inputValue, setInputValue] = useState(initialQuery || results.query);
  const [activeQuery, setActiveQuery] = useState(initialQuery || results.query);
  const [activeTab, setActiveTab] = useState<SearchTab>('all');

  const tabs = useMemo(
    () => [
      { key: 'all', label: 'All' },
      { key: 'posts', label: 'Posts', count: results.counts.posts },
      { key: 'people', label: 'People', count: results.counts.people },
      { key: 'communities', label: 'Communities', count: results.counts.communities },
      { key: 'resources', label: 'Resources', count: results.counts.resources },
      { key: 'tags', label: 'Tags', count: results.counts.tags },
    ],
    [results.counts]
  );

  const isActiveTabEmpty = activeTab === 'all' ? Object.values(results.counts).every((c) => c === 0) : results[activeTab].length === 0;

  return (
    <div>
      <SearchInput value={inputValue} onChange={setInputValue} onSubmit={setActiveQuery} />
      <SearchResultsHeading query={activeQuery} />
      <TabNav
        tabs={tabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as SearchTab)}
        className="mb-5"
      />

      {isActiveTabEmpty ? (
        <EmptyState
          icon={SearchIcon}
          title="No results found"
          description={`We couldn't find anything for "${activeQuery}".`}
        />
      ) : (
        <>
          <SearchResultsSection
            label="Top Posts"
            visible={activeTab === 'posts' || (activeTab === 'all' && results.posts.length > 0)}
          >
            <div className="flex flex-col gap-3">
              {results.posts.map((post) => (
                <PostResultRow key={post.id} {...post} />
              ))}
            </div>
          </SearchResultsSection>

          <SearchResultsSection
            label="People"
            visible={activeTab === 'people' || (activeTab === 'all' && results.people.length > 0)}
          >
            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
              {results.people.map((person) => (
                <PersonResultCard key={person.id} {...person} />
              ))}
            </div>
          </SearchResultsSection>

          <SearchResultsSection
            label="Communities"
            visible={activeTab === 'communities' || (activeTab === 'all' && results.communities.length > 0)}
          >
            <div className="flex flex-col gap-3">
              {results.communities.map((community) => (
                <CommunityResultRow key={community.id} {...community} />
              ))}
            </div>
          </SearchResultsSection>

          <SearchResultsSection
            label="Resources"
            visible={activeTab === 'resources' || (activeTab === 'all' && results.resources.length > 0)}
          >
            <div className="flex flex-col gap-3">
              {results.resources.map((resource) => (
                <ResourceResultRow key={resource.id} {...resource} />
              ))}
            </div>
          </SearchResultsSection>

          <SearchResultsSection
            label="Tags"
            visible={activeTab === 'tags' || (activeTab === 'all' && results.tags.length > 0)}
          >
            <div className="flex flex-wrap gap-2">
              {results.tags.map((tag) => (
                <TagChip key={tag.id} name={tag.name} count={tag.count} />
              ))}
            </div>
          </SearchResultsSection>
        </>
      )}
    </div>
  );
}