'use client';

import { Button, Input } from '@/shared/components/ui';
import type { FieldValidationState } from '../../types/onboarding.types';

interface WizardStep1IdentityProps {
  fullName: string;
  username: string;
  fullNameState: FieldValidationState;
  usernameState: FieldValidationState;
  fullNamePrefilled: boolean;
  usernamePrefilled: boolean;
  isValid: boolean;
  usernameTakenError: string | null;
  onFullNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onNext: () => void;
}

function PrefilledTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-light">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      Found from your account
    </span>
  );
}

export function WizardStep1Identity({
  fullName,
  username,
  fullNameState,
  usernameState,
  fullNamePrefilled,
  usernamePrefilled,
  isValid,
  usernameTakenError,
  onFullNameChange,
  onUsernameChange,
  onNext,
}: WizardStep1IdentityProps) {
  return (
    <section className="animate-welcome-in">
      <h1 className="mb-1.5 text-2xl font-bold text-text">Welcome to Sangum 👋</h1>
      <p className="mb-7 text-sm text-text-secondary">
        Let&apos;s set up your profile. This only takes a minute.
      </p>

      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="wizard-full-name" className="text-xs font-medium text-text-muted">
            Full Name
          </label>
          {fullNamePrefilled && <PrefilledTag />}
        </div>
        <Input
          id="wizard-full-name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder="Enter your full name"
          error={fullNameState.status === 'invalid' ? fullNameState.message : undefined}
          helperText={fullNameState.status !== 'invalid' ? fullNameState.message : undefined}
        />
      </div>

      {/* No shared primitive supports a leading affix (the "@"), so this
          is a local composition matching Input's classes rather than an
          override of Input itself. Border-color is the only focus/error
          treatment — no box-shadow ring — so there's no doubled outline
          from the inner <input> beneath it. */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="wizard-username" className="text-xs font-medium text-text-muted">
            Username
          </label>
          {usernamePrefilled && <PrefilledTag />}
        </div>
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
