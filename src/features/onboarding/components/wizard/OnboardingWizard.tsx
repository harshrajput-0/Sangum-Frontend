'use client';

import { useOnboardingWizard } from '../../hooks/useOnboardingWizard';
import type { OnboardingSubmitResult } from '../../types/onboarding.types';
import { WizardStepIndicator } from './WizardStepIndicator';
import { WizardStep1Identity } from './WizardStep1Identity';
import { WizardStep2Avatar } from './WizardStep2Avatar';
import { WizardStep3Finishing } from './WizardStep3Finishing';

interface OnboardingWizardProps {
  onFinished: (result: OnboardingSubmitResult) => void;
}

export function OnboardingWizard({ onFinished }: OnboardingWizardProps) {
  const wizard = useOnboardingWizard({ onFinished });

  return (
    <div>
      <WizardStepIndicator step={wizard.step} />

      {wizard.step === 1 && (
        <WizardStep1Identity
          fullName={wizard.fullName}
          username={wizard.username}
          fullNameState={wizard.fullNameState}
          usernameState={wizard.usernameState}
          fullNamePrefilled={wizard.fullNamePrefilled}
          usernamePrefilled={wizard.usernamePrefilled}
          isValid={wizard.isStep1Valid}
          usernameTakenError={wizard.usernameTakenError}
          onFullNameChange={wizard.onFullNameChange}
          onUsernameChange={wizard.onUsernameChange}
          onNext={wizard.goToStep2}
        />
      )}

      {wizard.step === 2 && (
        <WizardStep2Avatar
          avatarPreviewUrl={wizard.avatarPreviewUrl}
          submitError={wizard.submitError}
          onAvatarSelected={wizard.onAvatarSelected}
          onFinish={wizard.finish}
          onBack={wizard.backToStep1}
        />
      )}

      {wizard.step === 3 && <WizardStep3Finishing phase={wizard.phase} />}
    </div>
  );
}