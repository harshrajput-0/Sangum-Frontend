'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { TabNav, EmptyState } from '../shared/components/ui';
import { BookmarksHeader } from './components/BookmarksHeader';
import { PostBookmarkCard } from './components/PostBookmarkCard';
import { ResourceBookmarkCard } from './components/ResourceBookmarkCard';
import { mockPostBookmarks, mockResourceBookmarks } from './mock';
import type { BookmarkTab } from './types';

const REMOVE_ANIMATION_MS = 200;

export function BookmarksShell() {
  // TODO: Replace with useBookmarks() hook — GET /api/bookmarks?type=, DELETE /api/bookmarks/:id
  const [posts, setPosts] = useState(mockPostBookmarks);
  const [resources, setResources] = useState(mockResourceBookmarks);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<BookmarkTab>('posts');

  const removePost = (id: string) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, REMOVE_ANIMATION_MS);
  };

  const removeResource = (id: string) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setResources((prev) => prev.filter((r) => r.id !== id));
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, REMOVE_ANIMATION_MS);
  };

  const tabs = [
    { key: 'posts', label: 'Posts', count: posts.length },
    { key: 'resources', label: 'Resources', count: resources.length },
  ];

  return (
    <div>
      <BookmarksHeader />
      <TabNav
        tabs={tabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as BookmarkTab)}
        className="mb-5"
      />

      {activeTab === 'posts' ? (
        posts.length === 0 ? (
          <EmptyState icon={Bookmark} title="No saved posts" description="Posts you bookmark will show up here." />
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostBookmarkCard
                key={post.id}
                {...post}
                isRemoving={removingIds.has(post.id)}
                onRemove={() => removePost(post.id)}
              />
            ))}
          </div>
        )
      ) : resources.length === 0 ? (
        <EmptyState icon={Bookmark} title="No saved resources" description="Resources you bookmark will show up here." />
      ) : (
        <div className="flex flex-col gap-4">
          {resources.map((resource) => (
            <ResourceBookmarkCard
              key={resource.id}
              {...resource}
              isRemoving={removingIds.has(resource.id)}
              onRemove={() => removeResource(resource.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}