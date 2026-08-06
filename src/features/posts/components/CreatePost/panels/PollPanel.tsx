import { Plus, X } from 'lucide-react';
import { Input, Select } from '../../../../../shared/components/ui';

export interface PollPanelProps {
  question: string;
  options: string[];
  duration: '1 day' | '3 days' | '1 week';
  onQuestionChange: (value: string) => void;
  onOptionChange: (index: number, value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onDurationChange: (value: '1 day' | '3 days' | '1 week') => void;
}

export function PollPanel({
  question,
  options,
  duration,
  onQuestionChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onDurationChange,
}: PollPanelProps) {
  return (
    <div className="space-y-3">
      <Input label="Question" value={question} onChange={(e) => onQuestionChange(e.target.value)} placeholder="Ask the community a question…" />

      <div>
        <label className="mb-2 block text-xs font-medium text-text-muted">Options</label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={option}
                onChange={(e) => onOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="w-full rounded-md border border-border bg-bg-elevated px-3.5 py-2 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
              {/* Options 1–2 are the fixed baseline; only options added via "Add option" (3rd onward) can be removed — matches the mock. */}
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => onRemoveOption(index)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted hover:bg-surface-hover hover:text-danger"
                  aria-label={`Remove option ${index + 1}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        {options.length < 6 && (
          <button type="button" onClick={onAddOption} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary-light hover:text-primary">
            <Plus size={14} />
            Add option
          </button>
        )}
      </div>

      <Select
        label="Poll duration"
        value={duration}
        onChange={(e) => onDurationChange(e.target.value as '1 day' | '3 days' | '1 week')}
        options={[
          { value: '1 day', label: '1 day' },
          { value: '3 days', label: '3 days' },
          { value: '1 week', label: '1 week' },
        ]}
      />
    </div>
  );
}