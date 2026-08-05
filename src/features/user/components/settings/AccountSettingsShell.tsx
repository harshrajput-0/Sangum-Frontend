import { Card, Input, Textarea } from "@/shared/components/ui";
import type { EditProfileFormData, FieldErrors } from "../../types/profile.types";

export interface BasicInformationSectionProps {
  fields: EditProfileFormData;
  errors: FieldErrors<EditProfileFormData>;
  bioCounterLabel: string;
  onFieldChange: <K extends keyof EditProfileFormData>(
    field: K,
    value: EditProfileFormData[K],
  ) => void;
}

export function BasicInformationSection({
  fields,
  errors,
  bioCounterLabel,
  onFieldChange,
}: BasicInformationSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Basic Information</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="edit-full-name"
          label="Full Name"
          value={fields.fullName}
          error={errors.fullName}
          onChange={(e) => onFieldChange("fullName", e.target.value)}
        />
        <Input
          id="edit-email"
          label="Email"
          type="email"
          value={fields.email}
          error={errors.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
        />
        <Input
          id="edit-username"
          label="Username"
          value={fields.username}
          error={errors.username}
          onChange={(e) => onFieldChange("username", e.target.value)}
        />
        <Input
          id="edit-location"
          label="Location"
          value={fields.location}
          error={errors.location}
          onChange={(e) => onFieldChange("location", e.target.value)}
        />
        <Input
          id="edit-headline"
          label="Headline"
          value={fields.headline}
          error={errors.headline}
          containerClassName="sm:col-span-2"
          onChange={(e) => onFieldChange("headline", e.target.value)}
        />
        <Textarea
          id="edit-bio"
          label="Bio"
          value={fields.bio}
          error={errors.bio}
          counterLabel={bioCounterLabel}
          containerClassName="sm:col-span-2"
          onChange={(e) => onFieldChange("bio", e.target.value)}
        />
      </div>
    </Card>
  );
}
