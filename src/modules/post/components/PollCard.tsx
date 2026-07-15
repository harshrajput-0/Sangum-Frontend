// modules/posts/components/PollCard.tsx
"use client"; // manages local "which option did I pick" state — remove if not on Next.js App Router

import React, { useState } from "react";
import { formatCompactNumber } from "@/shared/utils/formatCompactNumber";
import { cn } from "@/shared/utils/cn";
import type { PostPollData } from "../types/types";

export interface PollCardProps {
  poll: PostPollData;
  onVote?: (optionId: string) => void;
  className?: string;
}

function timeLeftLabel(closesAt?: string | Date): string | null {
  if (!closesAt) return null;
  const end = typeof closesAt === "string" ? new Date(closesAt) : closesAt;
  const ms = end.getTime() - Date.now();
  if (ms <= 0) return "Poll closed";
  const hours = Math.ceil(ms / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h left`;
  return `${Math.ceil(hours / 24)}d left`;
}

/** Vote bars + percentages, and handles casting a vote. Shows live results once the viewer has voted (or the poll has closed); shows clickable options otherwise. */
export function PollCard({ poll, onVote, className }: PollCardProps) {
  const [localVote, setLocalVote] = useState<string | null | undefined>(poll.votedOptionId);
  const closed = !!poll.closesAt && new Date(poll.closesAt).getTime() <= Date.now();
  const showResults = !!localVote || closed;
  const left = timeLeftLabel(poll.closesAt);

  const handleVote = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    if (showResults) return;
    setLocalVote(optionId);
    onVote?.(optionId);
  };

  return (
    <div className={className}>
      <p className="text-[length:var(--fs-sm)] font-semibold text-[var(--text)] mb-2.5">{poll.question}</p>

      <div className="flex flex-col gap-2">
        {poll.options.map((option) => {
          const pct = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
          const isVoted = localVote === option.id;

          if (!showResults) {
            return (
              <button
                key={option.id}
                type="button"
                onClick={(e) => handleVote(e, option.id)}
                className="text-left h-[38px] px-3.5 rounded-[var(--radius-md)] border border-[var(--border-strong)] text-[length:var(--fs-sm)] text-[var(--text)] hover:border-[var(--brand-purple)] hover:bg-[rgba(109,93,254,0.08)] transition-colors duration-150"
              >
                {option.label}
              </button>
            );
          }

          return (
            <div key={option.id} className="relative h-[38px] rounded-[var(--radius-md)] overflow-hidden bg-[var(--surface-2)]">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 bg-[rgba(109,93,254,0.25)]",
                  isVoted && "border-r-2 border-[var(--brand-purple)]"
                )}
                style={{ width: `${pct}%` }}
              />
              <div className="relative h-full flex items-center justify-between px-3.5 text-[length:var(--fs-xs)]">
                <span className={cn("truncate", isVoted ? "font-semibold text-[var(--text)]" : "text-[var(--text-secondary)]")}>
                  {option.label}
                </span>
                <span className="text-[var(--text-secondary)] flex-shrink-0 ml-2">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)] mt-2">
        {formatCompactNumber(poll.totalVotes)} votes{left ? ` · ${left}` : ""}
      </p>
    </div>
  );
}
