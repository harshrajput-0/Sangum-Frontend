"use client";

import Link from "next/link";
import { useOAuthCallback } from "../hooks/useOAuthCallback";
import { AuthCard } from "../components/cards/AuthCard";
import { AUTH_ROUTES } from "../constants/auth.constants";

export function OAuthCallbackShell() {
  const { error } = useOAuthCallback();

  return (
    <AuthCard maxWidthClassName="max-w-[360px]">
      <div className="text-center">
        {error ? (
          <>
            <p className="mb-4 text-sm font-medium text-danger">{error}</p>
            <Link
              href={AUTH_ROUTES.login}
              className="text-xs font-medium text-primary-light hover:underline"
            >
              Back to log in
            </Link>
          </>
        ) : (
          <p className="text-sm text-text-secondary">Completing sign-in…</p>
        )}
      </div>
    </AuthCard>
  );
}