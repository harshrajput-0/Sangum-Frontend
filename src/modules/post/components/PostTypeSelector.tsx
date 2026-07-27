// modules/posts/components/PostTypeSelector.tsx

import React from "react";
import { TextTypeIcon, ImageTypeIcon, VideoTypeIcon, LinkTypeIcon, PollTypeIcon } from "@/modules/post/components/icons";
import { cn } from "@/shared/utils/cn";
import type { PostType } from "@/modules/post/types/types";

export interface PostTypeSelectorProps {
  value: PostType;
  onChange: (type: PostType) => void;
  className?: string;
}

const OPTIONS: { type: PostType; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { type: "text", label: "Text", Icon: TextTypeIcon },
  { type: "image", label: "Image", Icon: ImageTypeIcon },
  { type: "video", label: "Video", Icon: VideoTypeIcon },
  { type: "link", label: "Link", Icon: LinkTypeIcon },
  { type: "poll", label: "Poll", Icon: PollTypeIcon },
];

/** Tab switcher at the top of CreatePostPage — the chosen type decides which fields render below it. */
export function PostTypeSelector({ value, onChange, className }: PostTypeSelectorProps) {
  return (
    <div className={cn("flex gap-2", className)} role="tablist" aria-label="Post type">
      {OPTIONS.map(({ type, label, Icon }) => {
        const active = type === value;
        return (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(type)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 rounded-[var(--radius-lg)] border px-4 py-2.5 transition-colors duration-150",
              active
                ? "border-[var(--primary)] bg-[rgba(109,93,254,0.1)]"
                : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
            )}
          >
            <Icon className={cn("w-[18px] h-[18px]", active ? "text-[var(--primary-light)]" : "text-[var(--text-muted)]")} />
            <span className={cn("text-[length:var(--fs-xs)]", active ? "text-[var(--text)]" : "text-[var(--text-muted)]")}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
