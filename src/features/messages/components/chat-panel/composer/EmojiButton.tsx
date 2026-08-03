import { Smile } from "lucide-react";
import { cn } from "../../../utils/cn";

interface EmojiButtonProps {
  isOpen: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function EmojiButton({ isOpen, onClick, disabled }: EmojiButtonProps) {
  return (
    <button
      type="button"
      aria-label="Insert emoji"
      aria-expanded={isOpen}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-40",
        isOpen ? "bg-surface-hover text-text" : "text-text-secondary hover:bg-surface-hover hover:text-text",
      )}
    >
      <Smile className="h-[18px] w-[18px]" />
    </button>
  );
}