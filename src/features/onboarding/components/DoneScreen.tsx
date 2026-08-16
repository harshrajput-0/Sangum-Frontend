'use client';

import { Button } from '@/shared/components/ui';
import { AvatarDisplay } from './AvatarDisplay';

interface DoneScreenProps {
  fullName: string | null | undefined;
  username: string | null | undefined;
  avatarUrl: string | null | undefined;
  isVerified: boolean;
  onGoToFeed: () => void;
}

export function DoneScreen({ fullName, username, avatarUrl, isVerified, onGoToFeed }: DoneScreenProps) {
  const firstName = fullName ? fullName.split(' ')[0] : '';

  return (
    <section className="animate-welcome-in text-center">
      <AvatarDisplay avatarUrl={avatarUrl} fullName={fullName ?? ''} />

      <h1 className="mb-1.5 mt-3 text-2xl font-bold text-text">
        You&apos;re all set{firstName ? `, ${firstName}` : ''}!
      </h1>
      {username && <p className="mb-3 font-mono text-sm text-text-muted">@{username}</p>}
      <p className="mb-7 text-sm text-text-secondary">
        {isVerified
          ? '✓ Your email is verified.'
          : "You haven't verified your email yet — we'll remind you again next time you sign in."}
      </p>

      <Button variant="primary" size="lg" fullWidth onClick={onGoToFeed}>
        Go to Feed
      </Button>
    </section>
  );
}
