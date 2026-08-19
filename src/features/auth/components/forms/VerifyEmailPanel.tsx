import Link from "next/link";
import { Mail, Check, X } from "lucide-react";
import { Button, Card } from "@/shared/components/ui";
import { AUTH_ROUTES } from "../../constants/auth.constants";

interface VerifyEmailPanelProps {
  email: string | undefined;
  isPendingConflict?: boolean;
  hasSent: boolean;
  secondsRemaining: number;
  canResend: boolean;
  isSending: boolean;
  sendError: string | null;
  onSend: () => void;
  /** Omit to hide the skip action entirely (e.g. no live session to skip into). */
  onSkip?: () => void;
}

export function VerifyEmailPanel({
  email,
  isPendingConflict,
  hasSent,
  secondsRemaining,
  canResend,
  isSending,
  sendError,
  onSend,
  onSkip,
}: VerifyEmailPanelProps) {
  return (
    <Card className="relative text-center">
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          aria-label="Skip for now"
          className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:bg-surface-hover hover:text-text"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      )}

      <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full bg-primary/20" />
        <span className="absolute inset-0 rounded-full border-2 border-primary/40 bg-primary/10" />
        <Mail size={28} strokeWidth={1.75} className="relative z-10 text-primary-light" />
        {hasSent && (
          <span className="absolute -bottom-0.5 -right-0.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-success ring-4 ring-bg">
            <Check size={10} strokeWidth={3} className="text-white" />
          </span>
        )}
      </div>

      {hasSent ? (
        <>
          <h1 className="mb-2 font-heading text-2xl font-extrabold text-text">
            Check your <span className="text-primary-light">inbox</span>
          </h1>
          <p className="mb-2 text-sm text-text">
            {isPendingConflict
              ? "That email already has an account waiting to be verified. We just sent a fresh link to"
              : "We sent a verification link to"}
          </p>
          <p className="mb-3 inline-block rounded-full border border-border bg-bg-elevated px-4 py-1.5 font-mono text-sm text-text">
            {email ?? "your email address"}
          </p>
          <p className="mb-4 text-sm leading-relaxed text-text-muted">
            Open the email we sent and click the verification link to activate your account.
          </p>

          {isPendingConflict ? (
            <p className="mb-2 text-sm text-text-muted">We already sent it — just now.</p>
          ) : (
            <div className="mb-2 flex items-center justify-center gap-1.5 text-sm">
              <span className="text-text-muted">Didn&apos;t receive it?</span>
              <button
                type="button"
                onClick={onSend}
                disabled={!canResend}
                className={
                  canResend
                    ? "font-medium text-primary-light hover:underline"
                    : "font-medium text-text-disabled"
                }
              >
                {canResend
                  ? isSending
                    ? "Resending..."
                    : "Resend email"
                  : `Resend available in ${secondsRemaining}s`}
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="mb-2 font-heading text-2xl font-extrabold text-text">
            Verify your <span className="text-primary-light">email</span>
          </h1>
          <p className="mb-2 text-sm text-text">
            We&apos;ll send a verification link to
          </p>
          <p className="mb-5 inline-block rounded-full border border-border bg-bg-elevated px-4 py-1.5 font-mono text-sm text-text">
            {email ?? "your email address"}
          </p>
        </>
      )}

      {!hasSent && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mb-4"
          onClick={onSend}
          disabled={isSending}
        >
          {isSending ? "Sending…" : "Send verification email"}
        </Button>
      )}

      {sendError && <p className="mb-2 text-[13px] text-danger">{sendError}</p>}

      {hasSent && (
        <p className="mb-5 text-[13px] text-text-muted">
          Wrong email?{" "}
          <Link
            href={AUTH_ROUTES.register}
            className="cursor-pointer font-medium text-primary-light hover:underline"
          >
            Change it
          </Link>
        </p>
      )}

      {hasSent && (
        <p className="mb-3 text-xs text-text-disabled">
          Can&apos;t find the email? Check your spam or promotions folder.
        </p>
      )}

      <p className="rounded-md bg-warning-bg px-3 py-2 text-xs leading-relaxed text-warning">
        Unverified accounts are only held for 24 hours — after that, anyone
        can register with this email again.
      </p>
    </Card>
  );
}