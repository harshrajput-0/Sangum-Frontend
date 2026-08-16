import { authedRequest } from '@/shared/lib/apiClient';
import type { OnboardingSubmitResult } from '../types/onboarding.types';

export async function submitOnboarding(
  formData: FormData,
): Promise<OnboardingSubmitResult> {
  // No Content-Type set here on purpose — authedRequest always supplies
  // its own headers object, which overrides publicRequest's forced
  // application/json default, so fetch sets the multipart boundary itself.
  return authedRequest<OnboardingSubmitResult>('/users/onboarding', {
    method: 'POST',
    body: formData,
  });
}

export async function resendVerification(): Promise<void> {
  await authedRequest<null>('/auth/resend-verification', { method: 'POST' });
}
