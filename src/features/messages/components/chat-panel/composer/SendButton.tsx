import { Send } from "lucide-react";
import { cn } from "../../../utils/cn";

interface SendButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function SendButton({ disabled, onClick }: SendButtonProps) {
  return (
    <button
      type="button"
      aria-label="Send message"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors",
        disabled
          ? "cursor-not-allowed bg-surface text-text-disabled"
          : "bg-primary text-text-on-primary hover:bg-primary-hover",
      )}
    >
      <Send className="h-[16px] w-[16px]" />
    </button>
  );
}