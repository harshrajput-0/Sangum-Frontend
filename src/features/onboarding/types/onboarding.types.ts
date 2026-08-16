export type OnboardingScreen = 'wizard' | 'verify-nudge' | 'done';

export type WizardStep = 1 | 2 | 3;

// 'form' = steps 1-2, user editing. 'submitting' = step 3, request in
// flight. 'success' = step 3, request resolved — held briefly before
// handing off to the routing hook.
export type WizardSubmitPhase = 'form' | 'submitting' | 'success';

export interface WizardDraft {
  fullName: string;
  username: string;
  avatarFile: File | null;
  avatarPreviewUrl: string | null;
}

export interface FieldValidationState {
  status: 'neutral' | 'valid' | 'invalid';
  message: string;
}

export interface OnboardingSubmitResult {
  username: string;
  displayName: string;
  avatar: string | null;
  isProfileComplete: true;
}
