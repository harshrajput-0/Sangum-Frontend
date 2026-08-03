import { forwardRef } from "react";
import { EMOJI_LIST } from "../../../constants/emojiList";

interface EmojiPickerPopoverProps {
  onSelect: (emoji: string) => void;
}

export const EmojiPickerPopover = forwardRef<HTMLDivElement, EmojiPickerPopoverProps>(
  function EmojiPickerPopover({ onSelect }, ref) {
    return (
      <div
        ref={ref}
        role="dialog"
        aria-label="Emoji picker"
        className="absolute bottom-[calc(100%+8px)] left-0 z-20 grid grid-cols-5 gap-1 rounded-xl border border-border bg-surface p-2 shadow-lg"
      >
        {EMOJI_LIST.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelect(emoji)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-lg transition-colors hover:bg-surface-hover"
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  },
);