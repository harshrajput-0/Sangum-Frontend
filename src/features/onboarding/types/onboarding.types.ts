export type OnboardingScreen = 'wizard' | 'verify-nudge' | 'done';

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
