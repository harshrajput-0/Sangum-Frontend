"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { AttachmentButton } from "./AttachmentButton";
import { ComposerInput } from "./ComposerInput";
import { EmojiButton } from "./EmojiButton";
import { EmojiPickerPopover } from "./EmojiPickerPopover";
import { SendButton } from "./SendButton";

interface MessageComposerProps {
  value: string;
  error: string | null;
  isSendDisabled: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEmojiSelect: (emoji: string) => void;
  onFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export function MessageComposer({
  value,
  error,
  isSendDisabled,
  disabled = false,
  onChange,
  onEmojiSelect,
  onFilesSelected,
  onSend,
}: MessageComposerProps) {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useClickOutside(emojiRef, () => setIsEmojiOpen(false), isEmojiOpen);

  function handleEmojiSelect(emoji: string) {
    onEmojiSelect(emoji);
    setIsEmojiOpen(false);
  }

  if (disabled) {
    return (
      <div className="flex flex-shrink-0 items-center justify-center border-t border-border bg-bg-elevated px-4 py-4 lg:px-8">
        <p className="text-sm text-text-muted">You can&apos;t send messages to this contact.</p>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 border-t border-border bg-bg-elevated px-4 py-3 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center gap-1.5">
        <AttachmentButton onFilesSelected={onFilesSelected} />

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-[var(--input-bg)] px-4 py-2">
          <ComposerInput value={value} onChange={onChange} onSubmit={onSend} />

          <div className="relative flex-shrink-0">
            <EmojiButton isOpen={isEmojiOpen} onClick={() => setIsEmojiOpen((prev) => !prev)} />
            {isEmojiOpen && <EmojiPickerPopover ref={emojiRef} onSelect={handleEmojiSelect} />}
          </div>
        </div>

        <SendButton disabled={isSendDisabled} onClick={onSend} />
      </div>

      {error && <p className="mx-auto mt-1.5 max-w-[1600px] text-xs text-danger">{error}</p>}
    </div>
  );
}