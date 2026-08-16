'use client';

import { Button, Input } from '@/shared/components/ui';
import type { FieldValidationState } from '../../types/onboarding.types';

interface WizardStep1IdentityProps {
  fullName: string;
  username: string;
  fullNameState: FieldValidationState;
  usernameState: FieldValidationState;
  isValid: boolean;
  usernameTakenError: string | null;
  onFullNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onNext: () => void;
}

export function WizardStep1Identity({
  fullName,
  username,
  fullNameState,
  usernameState,
  isValid,
  usernameTakenError,
  onFullNameChange,
  onUsernameChange,
  onNext,
}: WizardStep1IdentityProps) {
  return (
    <section>
      <h1 className="mb-1.5 text-2xl font-bold text-text">Welcome to Sangum 👋</h1>
      <p className="mb-7 text-sm text-text-secondary">
        Let&apos;s set up your profile. This only takes a minute.
      </p>

      <Input
        id="wizard-full-name"
        label="Full Name"
        value={fullName}
        onChange={(e) => onFullNameChange(e.target.value)}
        placeholder="Enter your full name"
        error={fullNameState.status === 'invalid' ? fullNameState.message : undefined}
        helperText={fullNameState.status !== 'invalid' ? fullNameState.message : undefined}
        containerClassName="mb-4"
      />

      {/* No shared primitive supports a leading affix (the "@"), so this
          is a local composition matching Input's exact classes rather
          than an override of Input itself. */}
      <div>
        <label htmlFor="wizard-username" className="mb-1.5 block text-xs font-medium text-text-secondary">
          Username
        </label>
        <div
          className={`flex items-center gap-1.5 rounded-md border bg-bg-elevated px-3 py-2 transition-colors duration-150 focus-within:border-primary ${
            usernameState.status === 'invalid' || usernameTakenError ? 'border-danger' : 'border-border'
          }`}
        >
          <span className="text-sm text-text-muted">@</span>
          <input
            id="wizard-username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="choose-a-username"
            className="w-full bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
          />
        </div>
        <p className={`mt-1 text-xs ${usernameState.status === 'invalid' ? 'text-danger' : 'text-text-muted'}`}>
          {usernameState.message}
        </p>
        {usernameTakenError && <p className="mt-1 text-xs text-danger">{usernameTakenError}</p>}
      </div>

      <Button variant="primary" size="lg" fullWidth onClick={onNext} disabled={!isValid} className="mt-6">
        Next
      </Button>
    </section>
  );
}
