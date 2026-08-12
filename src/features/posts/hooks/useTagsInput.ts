import { useCallback, useState, type KeyboardEvent } from 'react';

const MAX_TAGS = 10;

function computeNextTags(current: string[], raw: string): string[] {
  const value = raw.trim().replace(/,+$/, '');
  if (!value || current.length >= MAX_TAGS) return current;
  if (current.some((t) => t.toLowerCase() === value.toLowerCase())) return current;
  return [...current, value];
}

/**
 * Mirrors the mock's tag-chip behavior: commas (including pasted text
 * containing several) commit chips as you type, Enter commits the
 * current draft, Backspace on an empty draft pops the last chip,
 * duplicates are rejected case-insensitively, and the draft locks
 * once the 10-tag limit is hit.
 */
export function useTagsInput(tags: string[], onTagsChange: (tags: string[]) => void) {
  const [draft, setDraft] = useState('');

  const addTag = useCallback(
    (raw: string): string[] => {
      const next = computeNextTags(tags, raw);
      if (next !== tags) onTagsChange(next);
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

  // Reduces over the CURRENT tags array to build the full result of
  // adding every comma-separated part in one pass, then commits once
  // — fixes a bug where pasting "foo,bar,baz," only kept the last tag,
  // since each addTag() call previously read the same stale `tags`.
  const onDraftChange = useCallback(
    (value: string) => {
      if (!value.includes(',')) {
        setDraft(value);
        return;
      }
      const parts = value.split(',');
      const remainder = parts.pop() ?? '';
      const next = parts.reduce((acc, part) => computeNextTags(acc, part), tags);
      if (next !== tags) onTagsChange(next);
      setDraft(remainder);
    },
    [tags, onTagsChange]
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