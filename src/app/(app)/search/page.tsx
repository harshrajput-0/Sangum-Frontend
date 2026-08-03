import { SearchShell } from '@/features/three-features/search';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return <SearchShell initialQuery={q ?? ''} />;
}