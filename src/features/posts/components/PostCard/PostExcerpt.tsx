import { ChevronDown } from 'lucide-react';
import { Badge } from '../../../../shared/components/ui';
import { useExcerptOverflow } from '../../hooks/useExcerptOverflow';

export interface PostExcerptProps {
  title: string;
  tags: string[];
  excerpt: string;
  topics: string[]; // pass [] for poll posts — their topics render as poll options instead, via PostPollMedia
}

export function PostExcerpt({ title, tags, excerpt, topics }: PostExcerptProps) {
  const hasTopics = topics.length > 0;
  const { ref, needsToggle, isExpanded, toggle } = useExcerptOverflow<HTMLParagraphElement>(excerpt, hasTopics);

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold text-text sm:text-xl">{title}</h2>

      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} tone="neutral">{tag}</Badge>
          ))}
        </div>
      )}

      <div className="mb-4">
        <p ref={ref} className={`text-sm leading-relaxed text-text-secondary ${isExpanded ? '' : 'line-clamp-3'}`}>
          {excerpt}
        </p>
        {needsToggle && (
          <span
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); }}
            className="mt-1 flex cursor-pointer items-center gap-1 text-xs font-semibold text-primary-light"
          >
            {isExpanded ? 'less' : 'more'}
            <ChevronDown size={12} className={`transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} />
          </span>
        )}
      </div>

      {hasTopics && (
        <div
          className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-brand"
          style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
        >
          <div className="min-h-0 pt-0.5">
            <p className="mb-2 text-sm font-semibold text-text">Key Topics Covered</p>
            <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-text-secondary">
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}