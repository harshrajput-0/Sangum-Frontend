import { useRef } from "react";
import type { ChangeEvent } from "react";
import { Paperclip } from "lucide-react";

interface AttachmentButtonProps {
  onFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function AttachmentButton({ onFilesSelected, disabled }: AttachmentButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label="Attach a file"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-hover hover:text-text disabled:pointer-events-none disabled:opacity-40"
      >
        <Paperclip className="h-[18px] w-[18px]" />
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={onFilesSelected}
      />
    </>
  );
}