import type { ResourceType } from '../../types';

const TONE_CLASSES = ['bg-success/10 text-success', 'bg-warning/10 text-warning', 'bg-danger/10 text-danger'];

interface CategoryTagRowProps {
  type: ResourceType;
  categoryTags: string[];
}

export function CategoryTagRow({ type, categoryTags }: CategoryTagRowProps) {
  return (
    <div className="mb-2.5 flex flex-wrap gap-2">
      <span className="rounded-full bg-info/10 px-2.5 py-1 text-xs font-medium text-info">{type}</span>
      {categoryTags.map((tag, index) => (
        <span key={tag} className={`rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[index % TONE_CLASSES.length]}`}>
          {tag}
        </span>
      ))}
    </div>
  );
}