'use client';

import { useRouter } from 'next/navigation';
import './onboarding.styles.css';
import { useOnboardingRouting } from './hooks/useOnboardingRouting';
import { useVerifyNudge } from './hooks/useVerifyNudge';
import { OnboardingWizard } from './components/wizard/OnboardingWizard';
import { VerifyNudgeScreen } from './components/verify/VerifyNudgeScreen';
import { CheckInboxScreen } from './components/verify/CheckInboxScreen';
import { DoneScreen } from './components/DoneScreen';
import { FEED_ROUTE } from './constants/onboarding.constants';

export function OnboardingShell() {
  const router = useRouter();
  const { currentScreen, user, markProfileComplete, skipVerifyForNow } = useOnboardingRouting();

  const verifyNudge = useVerifyNudge({ onSkip: skipVerifyForNow });

  return (
    <main className="bg-glow flex min-h-screen items-center justify-center px-5 py-14">
      <div className="w-full max-w-[420px]">
        {currentScreen === 'wizard' && <OnboardingWizard onFinished={markProfileComplete} />}

        {currentScreen === 'verify-nudge' && verifyNudge.view === 'nudge' && (
          <VerifyNudgeScreen
            isSending={verifyNudge.isSending}
            error={verifyNudge.error}
            onVerifyClick={verifyNudge.onVerifyClick}
            onSkipClick={verifyNudge.onSkipClick}
          />
        )}

        {currentScreen === 'verify-nudge' && verifyNudge.view === 'check-inbox' && (
          <CheckInboxScreen
            secondsLeft={verifyNudge.secondsLeft}
            isResendActive={verifyNudge.isResendActive}
            onResendClick={verifyNudge.onResendClick}
            onSkipClick={verifyNudge.onSkipClick}
          />
        )}

        {currentScreen === 'done' && (
          <DoneScreen
            fullName={user?.displayName}
            username={user?.username}
            avatarUrl={user?.avatar}
            isVerified={user?.isVerified ?? false}
            // FEED_ROUTE = '/feed', not '/' — '/' is the public landing
            // page ((public)/page.tsx), and sending an authenticated
            // user there was the source of the reported Next.js error.
            onGoToFeed={() => router.push(FEED_ROUTE)}
          />
        )}
      </div>
    </main>
  );
}
