import { Card, Input, Select } from "@/shared/components/ui";
import { SegmentedControl } from "../primitives/SegmentedControl";
import {
  AVAILABILITY_OPTIONS,
  EXPERIENCE_LEVELS,
} from "../../constants/profile.constants";
import type { EditProfileFormData, FieldErrors } from "../../types/profile.types";

export interface ProfessionalSectionProps {
  fields: EditProfileFormData;
  errors: FieldErrors<EditProfileFormData>;
  onFieldChange: <K extends keyof EditProfileFormData>(
    field: K,
    value: EditProfileFormData[K],
  ) => void;
}

export function ProfessionalSection({
  fields,
  errors,
  onFieldChange,
}: ProfessionalSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Professional</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="edit-job-title"
          label="Job Title"
          value={fields.jobTitle}
          error={errors.jobTitle}
          onChange={(e) => onFieldChange("jobTitle", e.target.value)}
        />
        <Input
          id="edit-company"
          label="Company"
          value={fields.company}
          error={errors.company}
          onChange={(e) => onFieldChange("company", e.target.value)}
        />
        <Select
          id="edit-experience-level"
          label="Experience Level"
          options={EXPERIENCE_LEVELS}
          value={fields.experienceLevel}
          error={errors.experienceLevel}
          onChange={(e) => onFieldChange("experienceLevel", e.target.value)}
        />
        <div>
          <span className="mb-1.5 block text-xs font-medium text-text-secondary">
            Availability
          </span>
          <SegmentedControl
            options={AVAILABILITY_OPTIONS}
            value={fields.availability}
            onChange={(value) => onFieldChange("availability", value)}
          />
        </div>
      </div>
    </Card>
  );
}
