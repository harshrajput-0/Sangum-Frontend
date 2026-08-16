'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onboardingWizardSchema } from '../validation/onboardingWizard.schema';
import { submitOnboarding } from '../services/onboarding.service';
import { slugifyUsername } from '../lib/usernameSlugify';
import { useSessionStore } from '@/shared/stores/session.store';
import {
  FULL_NAME_MIN,
  FULL_NAME_MAX,
  USERNAME_MIN,
  USERNAME_MAX,
  USERNAME_REGEX,
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_ACCEPTED_MIME_TYPES,
  SUCCESS_DISPLAY_MS,
} from '../constants/onboarding.constants';
import type {
  FieldValidationState,
  OnboardingSubmitResult,
  WizardStep,
  WizardSubmitPhase,
} from '../types/onboarding.types';
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
  const user = useSessionStore((s) => s.user);

  const [step, setStep] = useState<WizardStep>(1);
  const [phase, setPhase] = useState<WizardSubmitPhase>('form');

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [fullNamePrefilled, setFullNamePrefilled] = useState(false);
  const [usernamePrefilled, setUsernamePrefilled] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [usernameTakenError, setUsernameTakenError] = useState<string | null>(null);

  // Synchronous guard against double-submission (e.g. a fast double
  // click on Finish before the button visually disables, or a re-mount
  // firing finish() again). A ref is used deliberately — React state
  // updates aren't synchronous, so a `isSubmitting` state check at the
  // top of submit() can't reliably block a second call that starts
  // before the first re-render lands. This is checked *before* any
  // await, so it can't race.
  const submitLockRef = useRef(false);

  // Pre-fills from whatever the session already carries — AuthUser's
  // username/displayName are non-optional, so a fresh account may
  // already have something here (e.g. from OAuth, or a previous
  // interrupted onboarding attempt). Runs once on mount only.
  useEffect(() => {
    if (user?.displayName) {
      setFullName(user.displayName);
      setFullNamePrefilled(true);
    }
    if (user?.username) {
      setUsername(user.username);
      setUsernamePrefilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fullNameState = useMemo(() => validateFullName(fullName), [fullName]);
  const usernameState = useMemo(() => validateUsername(username), [username]);

  // Fields are optional server-side (backend fills defaults on blank) —
  // Next is only blocked by an active format violation, never emptiness.
  const isStep1Valid = fullNameState.status !== 'invalid' && usernameState.status !== 'invalid';

  const onFullNameChange = useCallback((value: string) => {
    setFullName(value);
    setFullNamePrefilled(false); // once edited, it's no longer "found from your account"
  }, []);

  const onUsernameChange = useCallback(
    (value: string) => {
      setUsername(slugifyUsername(value));
      setUsernamePrefilled(false);
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

  // Skip and Finish both call this — matches the mockup, where both
  // buttons trigger the same completion path. Step advances to 3
  // immediately (loading state) rather than waiting for the response,
  // since step 3 IS the loading state.
  const finish = useCallback(async () => {
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    setStep(3);
    setPhase('submitting');
    setSubmitError(null);
    setUsernameTakenError(null);

    const parsed = onboardingWizardSchema.safeParse({ fullName, username });
    if (!parsed.success) {
      // Shouldn't happen — step 1 already blocks Next on invalid data —
      // but guarding here means a stale/bypassed state can't silently
      // submit malformed data.
      submitLockRef.current = false;
      setStep(1);
      setPhase('form');
      setSubmitError(parsed.error.issues[0]?.message ?? 'Please check your details and try again.');
      return;
    }

    const formData = new FormData();
    if (parsed.data.fullName) formData.append('fullName', parsed.data.fullName);
    if (parsed.data.username) formData.append('username', parsed.data.username);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      const result = await submitOnboarding(formData);
      setPhase('success');
      // Hold the success message on screen for a beat before handing
      // off — onFinished() patches the session, which makes
      // useOnboardingRouting re-derive the screen away from 'wizard'.
      setTimeout(() => {
        onFinished(result);
      }, SUCCESS_DISPLAY_MS);
    } catch (err) {
      submitLockRef.current = false;
      setPhase('form');
      const apiError = err as ApiError;
      if (apiError.statusCode === 409) {
        setStep(1);
        setUsernameTakenError('That username is already taken — try another.');
      } else {
        // Includes the "onboarding has already been completed" 400 —
        // that specific case means the session's isProfileComplete is
        // stale relative to the backend. This surfaces the message but
        // doesn't attempt to auto-resync the session; onboarding
        // doesn't own that responsibility (see useOnboardingRouting).
        setStep(2);
        setSubmitError(apiError.message ?? 'Something went wrong. Please try again.');
      }
    }
  }, [avatarFile, fullName, username, onFinished]);

  return {
    step,
    phase,
    fullName,
    username,
    fullNameState,
    usernameState,
    fullNamePrefilled,
    usernamePrefilled,
    isStep1Valid,
    onFullNameChange,
    onUsernameChange,
    goToStep2,
    backToStep1,
    avatarPreviewUrl,
    onAvatarSelected,
    finish,
    submitError,
    usernameTakenError,
  };
}
