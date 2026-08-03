import type { ChangeEvent, KeyboardEvent } from "react";

interface ComposerInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ComposerInput({ value, onChange, onSubmit, disabled }: ComposerInputProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder={disabled ? "You can't message this contact" : "Type a message…"}
      aria-label="Message"
      className="w-full min-w-0 flex-1 bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed"
    />
  );
}