'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useSessionBootstrap } from '@/shared/hooks/useSessionBootstrap';
import { useSessionStore } from '@/shared/stores/session.store';
import { Spinner } from '@/shared/components/ui';

interface SessionBootstrapProps {
  children: ReactNode;
}

// Thresholds (ms) for the staged messaging below. The backend runs on
// Render's free tier, which spins down after ~15 min idle — the first
// request after that can take 20-30s to wake it back up. These stages
// exist purely so that wait doesn't read as a frozen/broken page; they
// don't affect how long the actual bootstrap takes.
const SLOW_HINT_MS = 4000;
const COLD_START_HINT_MS = 10000;

/**
 * Gate around the whole app: nothing renders until the once-on-mount
 * session check ('idle'/'loading') resolves to 'authenticated' or
 * 'unauthenticated'. Route guards (useRequireAuth/useRequireGuest)
 * rely on that resolved status existing before they make a redirect
 * decision — without this gate they'd either flash the wrong screen
 * or redirect based on a still-null user.
 */
export function SessionBootstrap({ children }: SessionBootstrapProps) {
  useSessionBootstrap();
  const status = useSessionStore((s) => s.status);
  const isLoading = status === 'idle' || status === 'loading';

  const [stage, setStage] = useState<'initial' | 'slow' | 'cold-start'>('initial');

  useEffect(() => {
    if (!isLoading) return;

    const slowTimer = setTimeout(() => setStage('slow'), SLOW_HINT_MS);
    const coldStartTimer = setTimeout(() => setStage('cold-start'), COLD_START_HINT_MS);

    return () => {
      clearTimeout(slowTimer);
      clearTimeout(coldStartTimer);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
        <Spinner size="lg" />
        {stage !== 'initial' && (
          <p className="max-w-sm text-sm text-text-muted">
            {stage === 'slow'
              ? 'Still connecting…'
              : 'Waking up the server — this can take up to 30s on the first load after a period of inactivity.'}
          </p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}