import { useState } from 'react';
import { Textarea, Button } from '../../components/ui';

export interface CommentEditFormProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function CommentEditForm({ value, onChange, onSave, onCancel }: CommentEditFormProps) {
  return (
    <div className="mt-1.5">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        resize="y"
        rows={2}
        className="min-h-[60px] text-sm"
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}