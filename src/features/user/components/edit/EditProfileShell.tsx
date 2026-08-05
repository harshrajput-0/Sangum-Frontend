"use client";

import { useEditProfileForm } from "../../hooks/edit/useEditProfileForm";
// Reuses the overview view's data hook — same feature, different view, so
// this isn't a cross-feature dependency.
import { useProfileData } from "../../hooks/overview/useProfileData";
import { BasicInformationSection } from "./BasicInformationSection";
import { EditProfileHeader } from "./EditProfileHeader";
import { LinksSocialsSection } from "./LinksSocialsSection";
import { ProfessionalSection } from "./ProfessionalSection";
import { StickySaveBar } from "./StickySaveBar";
import type { ProfileData } from "../../types/profile.types";

export interface EditProfileShellProps {
  username: string;
}

export function EditProfileShell({ username }: EditProfileShellProps) {
  const { profile, isLoading, error } = useProfileData(username);

  if (isLoading || !profile) {
    return <p className="text-sm text-text-muted">Loading profile…</p>;
  }
  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  return <EditProfileFormBody profile={profile} />;
}

// Split out so useEditProfileForm is only ever called once `profile` is
// guaranteed non-null — keeps the hooks-of-hooks rules happy above.
function EditProfileFormBody({ profile }: { profile: ProfileData }) {
  const form = useEditProfileForm(profile);

  return (
    <div className="flex flex-col gap-4 pb-4">
      <EditProfileHeader
        fullName={profile.fullName}
        avatar={form.avatar}
        cover={form.cover}
      />
      <BasicInformationSection
        fields={form.fields}
        errors={form.errors}
        bioCounterLabel={form.bioCounterLabel}
        onFieldChange={form.handleFieldChange}
      />
      <ProfessionalSection
        fields={form.fields}
        errors={form.errors}
        onFieldChange={form.handleFieldChange}
      />
      <LinksSocialsSection
        links={form.fields.links}
        onLinkChange={form.handleLinkChange}
      />

      <StickySaveBar
        isVisible={form.isDirty}
        isSubmitting={form.isSubmitting}
        submitError={form.submitError}
        onSave={() => {
          void form.handleSubmit();
        }}
        onCancel={form.handleCancel}
      />
    </div>
  );
}
