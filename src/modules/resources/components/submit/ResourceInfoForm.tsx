import { RESOURCE_TYPES } from '../../types';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';
import { ThumbnailDropzone } from './ThumbnailDropzone';
import { GuidelinesCheckbox } from './GuidelinesCheckbox';
import type { ResourceDraft } from './formTypes';

interface ResourceInfoFormProps {
  draft: ResourceDraft;
  onChange: <K extends keyof ResourceDraft>(field: K, value: ResourceDraft[K]) => void;
  communityOptions: string[];
}

export function ResourceInfoForm({ draft, onChange, communityOptions }: ResourceInfoFormProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <p className="mb-4 text-sm font-semibold text-text">Resource Information</p>
      <div className="space-y-3.5">
        <TextField
          id="submitTitle"
          label="Title"
          value={draft.title}
          onChange={(value) => onChange('title', value)}
          placeholder="Enter a clear and descriptive title"
        />
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <SelectField
            id="submitType"
            label="Type"
            value={draft.type}
            onChange={(value) => onChange('type', value as ResourceDraft['type'])}
            options={RESOURCE_TYPES}
          />
          <SelectField
            id="submitCommunity"
            label="Community (optional)"
            value={draft.community}
            onChange={(value) => onChange('community', value)}
            options={['None', ...communityOptions]}
          />
        </div>
        <TextareaField
          id="submitDesc"
          label="Description"
          value={draft.description}
          onChange={(value) => onChange('description', value)}
          placeholder="Describe the resource, what makes it useful, and who can benefit from it."
          maxLength={280}
        />
        <TextField
          id="submitLink"
          label="Link"
          value={draft.link}
          onChange={(value) => onChange('link', value)}
          placeholder="https://example.com/resource"
          helperText="The URL should be publicly accessible."
        />
        <TextField
          id="submitTags"
          label="Tags (optional)"
          value={draft.tags}
          onChange={(value) => onChange('tags', value)}
          placeholder="Add tags to help others find this resource"
        />
      </div>

      <div className="mt-5 border-t border-border pt-5">
        <p className="mb-3 text-sm font-semibold text-text">Thumbnail (optional)</p>
        <ThumbnailDropzone onFileSelect={(file) => onChange('thumbnailFile', file)} />
        <GuidelinesCheckbox
          checked={draft.agreedToGuidelines}
          onChange={(checked) => onChange('agreedToGuidelines', checked)}
        />
      </div>
    </div>
  );
}