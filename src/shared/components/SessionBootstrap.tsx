'use client';

import type { ReactNode } from 'react';
import { useSessionBootstrap } from '@/shared/hooks/useSessionBootstrap';
import { useSessionStore } from '@/shared/stores/session.store';
import { Spinner } from '@/shared/components/ui';

interface SessionBootstrapProps {
  children: ReactNode;
}

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

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
