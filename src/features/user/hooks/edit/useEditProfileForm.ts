import { useCallback, useMemo, useState } from "react";
import { BIO_MAX_LENGTH } from "../../constants/profile.constants";
import { updateProfile } from "../../services/profile.service";
import { editProfileSchema } from "../../validation/editProfile.schema";
import { useProfileImageUpload } from "./useProfileImageUpload";
import type {
  EditProfileFormData,
  FieldErrors,
  ProfileData,
} from "../../types/profile.types";

export interface UseEditProfileFormResult {
  fields: EditProfileFormData;
  errors: FieldErrors<EditProfileFormData>;
  isDirty: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  bioCounterLabel: string;
  avatar: ReturnType<typeof useProfileImageUpload>;
  cover: ReturnType<typeof useProfileImageUpload>;
  handleFieldChange: <K extends keyof EditProfileFormData>(
    field: K,
    value: EditProfileFormData[K],
  ) => void;
  handleLinkChange: (
    field: keyof EditProfileFormData["links"],
    value: string,
  ) => void;
  handleSubmit: () => Promise<boolean>;
  handleCancel: () => void;
}

function buildInitialFields(profile: ProfileData): EditProfileFormData {
  return {
    fullName: profile.fullName,
    // TODO: source from the authenticated user's account record (auth
    // session/store), not the public profile — email isn't part of ProfileData.
    email: "",
    username: profile.username,
    location: profile.location ?? "",
    headline: profile.headline ?? "",
    bio: profile.bio ?? "",
    jobTitle: profile.professionalTitle ?? "",
    company: profile.company ?? "",
    experienceLevel: profile.experienceLevel ?? "",
    availability: profile.availability ?? "",
    links: { ...profile.socialLinks },
  };
}

export function useEditProfileForm(profile: ProfileData): UseEditProfileFormResult {
  const initialFields = useMemo(() => buildInitialFields(profile), [profile]);
  const [fields, setFields] = useState<EditProfileFormData>(initialFields);
  const [errors, setErrors] = useState<FieldErrors<EditProfileFormData>>({});
  const [fieldsDirty, setFieldsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const avatar = useProfileImageUpload("avatar", profile.avatarUrl);
  const cover = useProfileImageUpload("cover", profile.coverUrl);

  const handleFieldChange = useCallback(
    <K extends keyof EditProfileFormData>(field: K, value: EditProfileFormData[K]) => {
      setFields((prev) => ({ ...prev, [field]: value }));
      setFieldsDirty(true);
    },
    [],
  );

  const handleLinkChange = useCallback(
    (field: keyof EditProfileFormData["links"], value: string) => {
      setFields((prev) => ({
        ...prev,
        links: { ...prev.links, [field]: value },
      }));
      setFieldsDirty(true);
    },
    [],
  );

  const isDirty = fieldsDirty || avatar.isDirty || cover.isDirty;
  const bioCounterLabel = `${fields.bio.length} / ${BIO_MAX_LENGTH}`;

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    const result = editProfileSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors<EditProfileFormData> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof EditProfileFormData;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await updateProfile(result.data);
      setFieldsDirty(false);
      avatar.markClean();
      cover.markClean();
      return true;
    } catch {
      setSubmitError("We couldn't save your changes. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, avatar, cover]);

  const handleCancel = useCallback(() => {
    setFields(initialFields);
    setErrors({});
    setFieldsDirty(false);
    avatar.reset();
    cover.reset();
  }, [initialFields, avatar, cover]);

  return {
    fields,
    errors,
    isDirty,
    isSubmitting,
    submitError,
    bioCounterLabel,
    avatar,
    cover,
    handleFieldChange,
    handleLinkChange,
    handleSubmit,
    handleCancel,
  };
}
