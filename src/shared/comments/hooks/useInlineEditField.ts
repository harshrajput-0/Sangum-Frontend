import { useCallback, useState } from 'react';

/** Tiny local-form hook for the inline "edit this comment" textarea. */
export function useInlineEditField(initialValue: string, onSave: (value: string) => void) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = useCallback(() => {
    setValue(initialValue);
    setIsEditing(true);
  }, [initialValue]);

  const cancel = useCallback(() => setIsEditing(false), []);

  const save = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed) onSave(trimmed);
    setIsEditing(false);
  }, [value, onSave]);

  return { value, setValue, isEditing, startEditing, cancel, save } as const;
}