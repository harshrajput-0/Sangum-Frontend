"use client";

import { useVerifyEmailToken } from "../hooks/useVerifyEmailToken";
import { VerifyEmailTokenPanel } from "../components/forms/VerifyEmailTokenPanel";
import { AuthCard } from "../components/cards/AuthCard";

interface VerifyEmailTokenShellProps {
  /** Read server-side from the dynamic route segment in
   * app/(auth)/verify-email/[token]/page.tsx — always a string. */
  token: string;
}

export function VerifyEmailTokenShell({ token }: VerifyEmailTokenShellProps) {
  const { status, error, verify } = useVerifyEmailToken(token);

  return (
    <AuthCard maxWidthClassName="max-w-[420px]">
      <VerifyEmailTokenPanel status={status} error={error} onVerify={verify} />
    </AuthCard>
  );
}
