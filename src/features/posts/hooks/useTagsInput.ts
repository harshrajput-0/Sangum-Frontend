import { useCallback, useState, type KeyboardEvent } from 'react';

const MAX_TAGS = 10;

/**
 * Mirrors the mock's tag-chip behavior exactly: commas (including
 * pasted text containing commas) commit chips as you type, Enter
 * commits the current draft, Backspace on an empty draft pops the
 * last chip, duplicates are rejected case-insensitively, and the
 * draft locks once the 10-tag limit is hit.
 */
export function useTagsInput(tags: string[], onTagsChange: (tags: string[]) => void) {
  const [draft, setDraft] = useState('');

  // Returns the resulting array so callers that need the committed
  // value immediately (see commitPending, used right before submit)
  // aren't stuck reading stale state from before the re-render.
  const addTag = useCallback(
    (raw: string): string[] => {
      const value = raw.trim().replace(/,+$/, '');
      if (!value || tags.length >= MAX_TAGS) return tags;
      if (tags.some((t) => t.toLowerCase() === value.toLowerCase())) return tags;
      const next = [...tags, value];
      onTagsChange(next);
      return next;
    },
    [tags, onTagsChange]
  );

  const removeTag = useCallback(
    (index: number) => {
      onTagsChange(tags.filter((_, i) => i !== index));
    },
    [tags, onTagsChange]
  );

  const onDraftChange = useCallback(
    (value: string) => {
      if (!value.includes(',')) {
        setDraft(value);
        return;
      }
      const parts = value.split(',');
      const remainder = parts.pop() ?? '';
      let current = tags;
      parts.forEach((p) => { current = addTag(p); });
      setDraft(remainder);
    },
    [tags, addTag]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag(draft);
        setDraft('');
      } else if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    },
    [draft, addTag, removeTag, tags.length]
  );

  // Commits whatever's still typed (no trailing comma yet) and
  // returns the resulting array synchronously — called right before
  // submit so a half-typed tag isn't lost, and so validation can use
  // the up-to-date list without waiting on a re-render.
  const commitPending = useCallback((): string[] => {
    if (!draft.trim()) return tags;
    const next = addTag(draft);
    setDraft('');
    return next;
  }, [draft, addTag, tags]);

  return {
    tags,
    draft,
    onDraftChange,
    onKeyDown,
    addTag,
    removeTag,
    commitPending,
    isAtLimit: tags.length >= MAX_TAGS,
  } as const;
}