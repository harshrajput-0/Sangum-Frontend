import type { ReactNode } from 'react';

interface SearchResultsSectionProps {
  label: string;
  visible: boolean;
  children: ReactNode;
}

export function SearchResultsSection({ label, visible, children }: SearchResultsSectionProps) {
  if (!visible) return null;

  return (
    <div className="mb-6">
      <span className="mb-2.5 block text-xs text-text-muted">{label}</span>
      {children}
    </div>
  );
}