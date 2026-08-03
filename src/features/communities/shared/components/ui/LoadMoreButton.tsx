"use client";

import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  label?: string;
}

export function LoadMoreButton({
  onClick,
  loading = false,
  label = "Load more",
}: LoadMoreButtonProps) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-xs font-medium text-text hover:bg-surface-hover disabled:opacity-60"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {label}
      </button>
    </div>
  );
}