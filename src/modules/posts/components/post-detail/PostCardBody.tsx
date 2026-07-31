// src/features/posts/components/post-detail/PostCardBody.tsx
import { TagPill } from '../primitives/TagPill';
import type { PostTagItem, PostExpandedContent } from '../../types';

interface PostCardBodyProps {
  title: string;
  tags: PostTagItem[];
  excerpt: string;
  expandedContent?: PostExpandedContent;
  isExpanded: boolean;
}

/**
 * Title, tags, excerpt, and the collapsible "read more" region.
 * `isExpanded` is controlled by the parent PostCard (via
 * `usePostCard()`) — purely presentational here.
 */
export function PostCardBody({ title, tags, excerpt, expandedContent, isExpanded }: PostCardBodyProps) {
  return (
    <>
      <h2 className="mb-3 text-lg font-semibold text-text sm:text-xl">{title}</h2>

      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag.id} label={tag.label} />
          ))}
        </div>
      )}

      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{excerpt}</p>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[var(--ease-brand)]"
        style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
      >
        <div className="min-h-0">
          {expandedContent?.coverImageUrl !== undefined && (
            <div className="mb-4 h-40 rounded-lg bg-gradient-to-br from-primary to-info sm:h-48" />
          )}
          {expandedContent?.keyTopics && expandedContent.keyTopics.length > 0 && (
            <>
              <p className="mb-2 text-sm font-semibold text-text">Key Topics Covered</p>
              <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-text-secondary">
                {expandedContent.keyTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}