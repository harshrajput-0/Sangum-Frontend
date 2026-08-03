interface SearchResultsHeadingProps {
  query: string;
  className?: string;
}

export function SearchResultsHeading({ query, className = '' }: SearchResultsHeadingProps) {
  return (
    <h1 className={`mb-3.5 text-xl font-semibold text-text ${className}`}>
      Search results for &quot;<span className="text-primary">{query}</span>&quot;
    </h1>
  );
}