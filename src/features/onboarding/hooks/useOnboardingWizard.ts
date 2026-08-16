'use client';

import { useCallback, useMemo, useState } from 'react';
import { onboardingWizardSchema } from '../validation/onboardingWizard.schema';
import { submitOnboarding } from '../services/onboarding.service';
import { slugifyUsername } from '../lib/usernameSlugify';
import {
  FULL_NAME_MIN,
  FULL_NAME_MAX,
  USERNAME_MIN,
  USERNAME_MAX,
  USERNAME_REGEX,
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_ACCEPTED_MIME_TYPES,
} from '../constants/onboarding.constants';
import type { FieldValidationState, OnboardingSubmitResult } from '../types/onboarding.types';
import type { ApiError } from '@/shared/types/apiResponse.types';

interface UseOnboardingWizardArgs {
  onFinished: (result: OnboardingSubmitResult) => void;
}

function validateFullName(value: string): FieldValidationState {
  const hint = `${FULL_NAME_MIN}–${FULL_NAME_MAX} characters`;
  if (value.length === 0) return { status: 'neutral', message: hint };
  const valid = value.length >= FULL_NAME_MIN && value.length <= FULL_NAME_MAX;
  return { status: valid ? 'valid' : 'invalid', message: hint };
}

function validateUsername(value: string): FieldValidationState {
  const hint = '5–20 characters — lowercase letters, numbers, . _ -';
  if (value.length === 0) return { status: 'neutral', message: hint };
  const valid =
    value.length >= USERNAME_MIN && value.length <= USERNAME_MAX && USERNAME_REGEX.test(value);
  return { status: valid ? 'valid' : 'invalid', message: hint };
}

export function useOnboardingWizard({ onFinished }: UseOnboardingWizardArgs) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [usernameTakenError, setUsernameTakenError] = useState<string | null>(null);

  const fullNameState = useMemo(() => validateFullName(fullName), [fullName]);
  const usernameState = useMemo(() => validateUsername(username), [username]);

  // Fields are optional server-side (backend fills defaults on blank) —
  // Next is only blocked by an active format violation, never emptiness.
  const isStep1Valid = fullNameState.status !== 'invalid' && usernameState.status !== 'invalid';

  const onFullNameChange = useCallback((value: string) => {
    setFullName(value);
  }, []);

  const onUsernameChange = useCallback(
    (value: string) => {
      setUsername(slugifyUsername(value));
      if (usernameTakenError) setUsernameTakenError(null);
    },
    [usernameTakenError],
  );

  const goToStep2 = useCallback(() => {
    if (!isStep1Valid) return;
    setStep(2);
  }, [isStep1Valid]);

  const backToStep1 = useCallback(() => setStep(1), []);

  const onAvatarSelected = useCallback((file: File | null) => {
    setSubmitError(null);
    if (!file) {
      setAvatarFile(null);
      setAvatarPreviewUrl(null);
      return;
    }
    if (!AVATAR_ACCEPTED_MIME_TYPES.includes(file.type)) {
      setSubmitError('Only JPEG, PNG, WEBP, or GIF images are allowed.');
      return;
    }
    if (file.size > AVATAR_MAX_SIZE_BYTES) {
      setSubmitError('Image must be 5MB or smaller.');
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setAvatarPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  // Skip and Finish both land here — matches the mockup, where both
  // buttons call the same finishWizard(). The backend, not this hook,
  // decides the avatar fallback (OAuth picture → identicon), so there's
  // no local "assign a color if nothing uploaded" step here.
  const finish = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setUsernameTakenError(null);

    const parsed = onboardingWizardSchema.safeParse({ fullName, username });
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? 'Please check your details and try again.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    if (parsed.data.fullName) formData.append('fullName', parsed.data.fullName);
    if (parsed.data.username) formData.append('username', parsed.data.username);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      const result = await submitOnboarding(formData);
      onFinished(result);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.statusCode === 409) {
        setUsernameTakenError('That username is already taken — try another.');
        setStep(1);
      } else {
        setSubmitError(apiError.message ?? 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [avatarFile, fullName, username, onFinished]);

  return {
    step,
    fullName,
    username,
    fullNameState,
    usernameState,
    isStep1Valid,
    onFullNameChange,
    onUsernameChange,
    goToStep2,
    backToStep1,
    avatarPreviewUrl,
    onAvatarSelected,
    finish,
    isSubmitting,
    submitError,
    usernameTakenError,
  };
}
