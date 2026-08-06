import { Check } from 'lucide-react';

export interface PostPollMediaProps {
  options: string[];
  votes: number[];
  votedIndex: number | null;
  onVote: (index: number) => void;
}

export function PostPollMedia({ options, votes, votedIndex, onVote }: PostPollMediaProps) {
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  const hasVoted = votedIndex !== null;

  return (
    <div className="mb-4">
      <div className="space-y-2">
        {options.map((option, i) => {
          if (!hasVoted) {
            return (
              <button
                key={option}
                type="button"
                onClick={() => onVote(i)}
                className="flex w-full items-center gap-2.5 rounded-md border border-border px-3 py-2 text-left text-sm text-text-secondary hover:border-border-strong hover:bg-surface-hover"
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-border-strong" />
                {option}
              </button>
            );
          }

          const count = votes[i] ?? 0;
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isSelected = votedIndex === i;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onVote(i)}
              className={`relative flex w-full items-center justify-between overflow-hidden rounded-md border px-3 py-2 text-left text-sm hover:border-border-strong ${
                isSelected ? 'border-primary text-text' : 'border-border text-text-secondary'
              }`}
            >
              <span className="absolute inset-y-0 left-0 bg-primary/15" style={{ width: `${pct}%` }} />
              <span className="relative flex min-w-0 items-center gap-2.5">
                <span
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-primary bg-primary' : 'border-border-strong'
                  }`}
                >
                  {isSelected && <Check size={8} className="text-white" strokeWidth={3} />}
                </span>
                {option}
              </span>
              <span className="relative shrink-0 pl-2 text-xs font-medium text-text-muted">{pct}%</span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-text-muted">
        {totalVotes} vote{totalVotes === 1 ? '' : 's'}
        {hasVoted ? ' · You voted' : ''}
      </p>
    </div>
  );
}