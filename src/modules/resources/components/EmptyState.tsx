interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return <p className="py-10 text-center text-sm text-text-muted">{message}</p>;
}