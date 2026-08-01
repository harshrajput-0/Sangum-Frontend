"use client";

import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import { validateComposerDraft } from "../validation/messageComposer.schema";

interface UseMessageComposerOptions {
  onSend: (text: string) => void | Promise<void>;
}

/**
 * Local composer form state: draft text, emoji insertion, file selection,
 * and submit validation. Nothing here touches the store or the network —
 * it hands a validated string to `onSend` (wired to useMessageThread's
 * `sendMessage` by the consuming component) and resets itself.
 */
export function useMessageComposer({ onSend }: UseMessageComposerOptions) {
  const [value, setValue] = useState("");
  const [attachedFileNames, setAttachedFileNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(null);
  }, []);

  const handleEmojiSelect = useCallback((emoji: string) => {
    setValue((prev) => prev + emoji);
  }, []);

  const handleFilesSelected = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setAttachedFileNames(Array.from(files).map((f) => f.name));
    // No attachment-preview UI exists in the approved design yet, so
    // selected files are tracked but not surfaced further.
    event.target.value = "";
  }, []);

  const isSendDisabled = value.trim().length === 0;

  const handleSend = useCallback(async () => {
    const result = validateComposerDraft(value);
    if (!result.success) {
      setError(result.error);
      return;
    }
    await onSend(result.value);
    setValue("");
    setError(null);
  }, [value, onSend]);

  return {
    value,
    attachedFileNames,
    error,
    isSendDisabled,
    handleChange,
    handleEmojiSelect,
    handleFilesSelected,
    handleSend,
  };
}