'use client';

import { useOnboardingWizard } from '../../hooks/useOnboardingWizard';
import type { OnboardingSubmitResult } from '../../types/onboarding.types';
import { WizardStepIndicator } from './WizardStepIndicator';
import { WizardStep1Identity } from './WizardStep1Identity';
import { WizardStep2Avatar } from './WizardStep2Avatar';

interface OnboardingWizardProps {
  onFinished: (result: OnboardingSubmitResult) => void;
}

export function OnboardingWizard({ onFinished }: OnboardingWizardProps) {
  const wizard = useOnboardingWizard({ onFinished });

  return (
    <div>
      <WizardStepIndicator step={wizard.step} />

      {wizard.step === 1 ? (
        <WizardStep1Identity
          fullName={wizard.fullName}
          username={wizard.username}
          fullNameState={wizard.fullNameState}
          usernameState={wizard.usernameState}
          isValid={wizard.isStep1Valid}
          usernameTakenError={wizard.usernameTakenError}
          onFullNameChange={wizard.onFullNameChange}
          onUsernameChange={wizard.onUsernameChange}
          onNext={wizard.goToStep2}
        />
      ) : (
        <WizardStep2Avatar
          avatarPreviewUrl={wizard.avatarPreviewUrl}
          isSubmitting={wizard.isSubmitting}
          submitError={wizard.submitError}
          onAvatarSelected={wizard.onAvatarSelected}
          onFinish={wizard.finish}
        />
      )}
    </div>
  );
}
