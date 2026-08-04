import Link from "next/link";
import { Mail, Check } from "lucide-react";
import { AUTH_ROUTES } from "../../constants/auth.constants";

interface VerifyEmailPanelProps {
  email: string | undefined;
  secondsRemaining: number;
  canResend: boolean;
  isResending: boolean;
  resendError: string | null;
  onResend: () => void;
}

export function VerifyEmailPanel({
  email,
  secondsRemaining,
  canResend,
  isResending,
  resendError,
  onResend,
}: VerifyEmailPanelProps) {
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full bg-primary/20" />
        <span className="absolute inset-0 rounded-full border-2 border-primary/40 bg-primary/10" />
        <Mail size={28} strokeWidth={1.75} className="relative z-10 text-primary-light" />
        <span className="absolute -bottom-0.5 -right-0.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-success ring-4 ring-bg">
          <Check size={10} strokeWidth={3} className="text-white" />
        </span>
      </div>

      <h1 className="mb-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text">
        Check your <span className="text-primary-light">inbox</span>
      </h1>
      <p className="mb-2 text-sm text-text">We sent a verification link to</p>
      <p className="mb-3 inline-block rounded-full border border-border bg-surface px-4 py-1.5 font-[family-name:var(--font-mono)] text-xs text-text">
        {email ?? "your email address"}
      </p>
      <p className="mb-4 text-xs leading-relaxed text-text-muted">
        Open the email we sent and click the verification link to activate your account.
      </p>

      <div className="mb-2 flex items-center justify-center gap-1.5 text-xs">
        <span className="text-text-muted">Didn&apos;t receive it?</span>
        <button
          type="button"
          onClick={onResend}
          disabled={!canResend}
          className={
            canResend
              ? "font-medium text-primary-light hover:underline"
              : "font-medium text-text-disabled"
          }
        >
          {canResend
            ? isResending
              ? "Resending..."
              : "Resend email"
            : `Resend available in ${secondsRemaining}s`}
        </button>
      </div>

      {resendError && <p className="mb-2 text-[11px] text-danger">{resendError}</p>}

      <p className="mb-5 text-[11px] text-text-muted">
        Wrong email?{" "}
        <Link
          href={AUTH_ROUTES.register}
          className="cursor-pointer font-medium text-primary-light hover:underline"
        >
          Change it
        </Link>
      </p>

      <p className="text-[11px] text-text-disabled">
        Can&apos;t find the email? Check your spam or promotions folder.
      </p>
    </div>
  );
}