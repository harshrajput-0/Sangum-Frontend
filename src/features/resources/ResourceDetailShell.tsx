'use client';

import { useState } from 'react';
import { Breadcrumb } from './components/detail/Breadcrumb';
import { ResourceHero } from './components/detail/ResourceHero';
import { CategoryTagRow } from './components/detail/CategoryTagRow';
import { AuthorMetaRow } from './components/detail/AuthorMetaRow';
import { ResourceTabs } from './components/detail/ResourceTabs';
import { OverviewPanel } from './components/detail/OverviewPanel';
import { RelatedPanel } from './components/detail/RelatedPanel';
import { ResourceInfoCard } from './components/detail/ResourceInfoCard';
import { MoreFromAuthorCard } from './components/detail/MoreFromAuthorCard';
import { CommentsPanel } from '@/shared/comments';
import { mockResourceDetail, mockResourceComments, mockMoreResourceComments } from './mock';

type DetailTab = 'overview' | 'comments' | 'related';

interface ResourceDetailShellProps {
  resourceId: string;
}

export function ResourceDetailShell({ resourceId }: ResourceDetailShellProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  // TODO: Replace with Express API integration — GET /api/resources/:id (using resourceId)
  const resource = mockResourceDetail;

  return (
    <div>
      <Breadcrumb type={resource.type} title={resource.title} />
      <ResourceHero resource={resource} />
      <CategoryTagRow type={resource.type} categoryTags={resource.categoryTags} />
      <h1 className="mb-3.5 font-[family-name:var(--font-heading)] text-xl font-bold text-text sm:text-2xl">{resource.title}</h1>
      <AuthorMetaRow resource={resource} />
      <ResourceTabs activeTab={activeTab} onChange={setActiveTab} commentCount={resource.commentCount} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && <OverviewPanel description={resource.description} learnPoints={resource.learnPoints} />}
          {activeTab === 'comments' && (
            <div className="rounded-sm border border-border/60 bg-bg-elevated p-4 sm:p-5">
              <CommentsPanel entityType="resource" entityId={resource.id} initialComments={mockResourceComments} initialMoreComments={mockMoreResourceComments} />
            </div>
          )}
          {activeTab === 'related' && <RelatedPanel resources={resource.relatedResources} />}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <ResourceInfoCard resource={resource} />
          <MoreFromAuthorCard resources={resource.moreFromAuthor} />
        </aside>
      </div>
    </div>
  );
}