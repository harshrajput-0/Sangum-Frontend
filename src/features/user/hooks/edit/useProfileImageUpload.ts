import { useCallback, useState } from "react";
import { validateImageFile } from "../../lib/imageValidation";
import { uploadAvatar, uploadCover } from "../../services/profile.service";

export type ImageUploadKind = "avatar" | "cover";

export interface UseProfileImageUploadResult {
  previewUrl: string | null;
  error: string | null;
  isUploading: boolean;
  isDirty: boolean;
  handleFileChange: (file: File | null | undefined) => void;
  /** Reverts the preview back to the original value — used on Cancel/Discard. */
  reset: () => void;
  /** Keeps the current (new) preview but clears the dirty flag — used after a successful save. */
  markClean: () => void;
}

export function useProfileImageUpload(
  kind: ImageUploadKind,
  initialUrl?: string,
): UseProfileImageUploadResult {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const uploadFn = kind === "avatar" ? uploadAvatar : uploadCover;

  const handleFileChange = useCallback(
    (file: File | null | undefined) => {
      const result = validateImageFile(file);
      if (!result.valid) {
        setError(result.error ?? null);
        return;
      }
      setError(null);

      // Optimistic local preview while the (mocked) upload resolves.
      const localPreview = URL.createObjectURL(file as File);
      setPreviewUrl(localPreview);
      setIsDirty(true);
      setIsUploading(true);

      uploadFn(file as File)
        .then((uploaded) => {
          setPreviewUrl(uploaded.url);
        })
        .catch(() => {
          setError("Upload failed. Please try again.");
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [uploadFn],
  );

  const reset = useCallback(() => {
    setPreviewUrl(initialUrl ?? null);
    setError(null);
    setIsDirty(false);
  }, [initialUrl]);

  const markClean = useCallback(() => setIsDirty(false), []);

  return { previewUrl, error, isUploading, isDirty, handleFileChange, reset, markClean };
}
