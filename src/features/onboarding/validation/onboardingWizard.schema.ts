import { z } from 'zod';
import { USERNAME_REGEX } from '../constants/onboarding.constants';

// Mirrors backend/src/modules/users/user.validation.ts onboardingSchema
// exactly, including the empty-string-to-undefined preprocess (multipart
// forms send blank fields as "" rather than omitting the key).
const emptyToUndefined = (val: unknown) => (val === '' ? undefined : val);

export const onboardingWizardSchema = z.object({
  username: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .toLowerCase()
      .min(5, 'Username require at least 5 characters')
      .max(20, 'Username cannot exceed 20 characters')
      .regex(
        USERNAME_REGEX,
        "Username can contain lowercase letters, numbers, underscores, hyphens, and dots, but can't start or end with a hyphen/dot, or contain them consecutively",
      )
      .optional(),
  ),
  fullName: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .min(2, 'Display name must be at least 2 characters')
      .max(50, 'Display name cannot exceed 50 characters')
      .optional(),
  ),
});

export type OnboardingWizardInput = z.infer<typeof onboardingWizardSchema>;
