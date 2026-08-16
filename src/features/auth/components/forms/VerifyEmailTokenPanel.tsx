import Link from "next/link";
import { ShieldCheck, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { AUTH_ROUTES } from "../../constants/auth.constants";
import type { VerifyEmailTokenStatus } from "../../hooks/useVerifyEmailToken";

interface VerifyEmailTokenPanelProps {
  status: VerifyEmailTokenStatus;
  error: string | null;
  onVerify: () => void;
}

export function VerifyEmailTokenPanel({
  status,
  error,
  onVerify,
}: VerifyEmailTokenPanelProps) {
  if (status === "success") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
          <CheckCircle2 size={30} strokeWidth={1.75} className="text-success" />
        </div>
        <h1 className="mb-2 font-heading text-2xl font-extrabold text-text">
          Email <span className="text-primary-light">verified</span>
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          Your account is confirmed. You&apos;re all set to log in.
        </p>
        <Link
          href={AUTH_ROUTES.login}
          className="inline-block w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
        >
          Continue to log in
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-danger-bg">
          <XCircle size={30} strokeWidth={1.75} className="text-danger" />
        </div>
        <h1 className="mb-2 font-heading text-2xl font-extrabold text-text">
          Link <span className="text-danger">didn&apos;t work</span>
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          {error}
        </p>
        <Link
          href={AUTH_ROUTES.login}
          className="inline-block w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
        >
          Back to log in
        </Link>
        <p className="mt-4 text-[13px] text-text-muted">
          Need a new link? Log in and we&apos;ll offer to resend one.
        </p>
      </div>
    );
  }

  // idle | verifying
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-primary/40 bg-primary/10" />
        <ShieldCheck size={28} strokeWidth={1.75} className="relative z-10 text-primary-light" />
      </div>

      <h1 className="mb-2 font-heading text-2xl font-extrabold text-text">
        Verify your <span className="text-primary-light">email</span>
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-text-muted">
        Click below to confirm this email address and activate your account.
      </p>

      <button
        type="button"
        onClick={onVerify}
        disabled={status === "verifying"}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "verifying" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify email"
        )}
      </button>

      <p className="text-[13px] text-text-muted">
        Not you?{" "}
        <Link
          href={AUTH_ROUTES.register}
          className="font-medium text-primary-light hover:underline"
        >
          Go to registration
        </Link>
      </p>
    </div>
  );
}
