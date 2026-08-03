import Link from 'next/link';
import type { ResourceType } from '../../types';

interface BreadcrumbProps {
  type: ResourceType;
  title: string;
}

export function Breadcrumb({ type, title }: BreadcrumbProps) {
  return (
    <div className="mb-3.5 flex flex-wrap items-center gap-2 text-xs text-text-muted">
      <Link href="/resources" className="hover:text-text">
        Resources
      </Link>
      <span>›</span>
      <span>{type}</span>
      <span>›</span>
      <span className="text-primary-light">{title}</span>
    </div>
  );
}