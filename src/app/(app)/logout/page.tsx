"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { AUTH_ROUTES } from "@/features/auth/constants/auth.constants";
import { Spinner } from "@/shared/components/ui";

/**
 * Fallback for anyone landing on /logout directly (bookmark, typed
 * URL, old habit from another app) rather than through the header's
 * account menu — this used to 404 since no route existed here at all.
 * Fires logout on mount and redirects; no UI decision to make, so no
 * confirmation step.
 */
export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        await authService.logout();
      } catch {
        // Session is already cleared locally regardless (see
        // auth.service.ts's finally block) — a failed network call
        // here shouldn't block navigating away.
      }
      if (!cancelled) {
        router.replace(AUTH_ROUTES.login);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <Spinner size="lg" />
    </div>
  );
}