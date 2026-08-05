import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_SIZE_ERROR_MESSAGE,
  IMAGE_TYPE_ERROR_MESSAGE,
  MAX_IMAGE_SIZE_BYTES,
} from "../constants/profile.constants";

/**
 * Pure helpers for validating avatar/cover uploads.
 * No React, no side effects — safe to unit test in isolation.
 */

export function isAllowedImageType(file: File): boolean {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type);
}

export function isWithinSizeLimit(
  file: File,
  maxBytes: number = MAX_IMAGE_SIZE_BYTES,
): boolean {
  return file.size <= maxBytes;
}

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a picked image file (type + size).
 * Mirrors the mockup's sgValidateImageFile, but returns a message
 * for the caller to surface however it likes, instead of calling alert().
 */
export function validateImageFile(
  file: File | null | undefined,
): ImageValidationResult {
  if (!file) {
    return { valid: false };
  }
  if (!isAllowedImageType(file)) {
    return { valid: false, error: IMAGE_TYPE_ERROR_MESSAGE };
  }
  if (!isWithinSizeLimit(file)) {
    return { valid: false, error: IMAGE_SIZE_ERROR_MESSAGE };
  }
  return { valid: true };
}
