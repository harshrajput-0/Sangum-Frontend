"use client";

import { useState, type ReactNode } from "react";

/**
 * PostCompose
 * -------------------------------------------------------------------------
 * The avatar + "What's on your mind?" input row.
 *
 * Assumes an <Avatar /> component already exists in the project — pass it
 * in via the `avatar` prop. A minimal fallback circle is rendered if no
 * avatar is supplied, so the component still works standalone.
 *
 * Relies entirely on the semantic tokens defined in global.css
 * (--color-surface, --color-border, --color-text-muted, etc.) via Tailwind
 * utilities — no hard-coded colors.
 */

export interface PostComposeProps {
  /** Your existing Avatar component/element, e.g. <Avatar user={user} size="md" /> */
  avatar?: ReactNode;
  placeholder?: string;
  /** Called with the current draft text when the composer is submitted (Enter). */
  onSubmit?: (value: string) => void;
  /** Called on every keystroke. */
  onChange?: (value: string) => void;
  className?: string;
}

function FallbackAvatar() {
  return (
    <div
      className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
      style={{
        background: "var(--brand-gradient)",
        color: "var(--color-text-on-primary)",
      }}
    >
      AV
    </div>
  );
}

export default function PostCompose({
  avatar,
  placeholder = "What's on your mind?",
  onSubmit,
  onChange,
  className = "",
}: PostComposeProps) {
  const [value, setValue] = useState("");

  const handleChange = (next: string) => {
    setValue(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit?.(value.trim());
      setValue("");
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {avatar ?? <FallbackAvatar />}

      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Create a post"
        className="h-11 min-w-0 flex-1 rounded-sm border border-border bg-bg-elevated px-4 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-border-strong"
      />
    </div>
  );
}