import type { ReactNode } from 'react';
import { ErrorIllustration, type ErrorVariant } from './ErrorIllustration';

interface ErrorActionLink {
  label: string;
  /** Provide href for a link, or onClick for a button — you can provide both. */
  href?: string;
  onClick?: () => void;
}

interface ErrorStateProps {
  /**
   * Which illustration to show — picked by the *nature* of the problem, not
   * a specific status code. See ErrorVariant in ErrorIllustration.tsx for
   * what each one means and which codes it fits.
   */
  variant: ErrorVariant;
  /**
   * Optional status code or short label shown in the fixed brand gradient,
   * e.g. "403", "502", "Offline". Omit it entirely for messages that don't
   * map to a code (e.g. "No internet connection").
   */
  code?: string | number;
   // Code message — the short heading, e.g. "Access denied".
  title: string;
  //  Message content — the supporting description
  message: string;
  //  Where the "Go Home" button points. Defaults to "/". 
  homeHref?: string;
  //  Optional extra handler fired when "Go Home" is clicked (e.g. router navigate())
  onGoHome?: () => void;
  //  Optional second, context-specific action — e.g. "Request access" for lock, "Try again" for crash/service.
  secondaryAction?: ErrorActionLink;
  /** Overall scale of the illustration + text. Defaults to 'md'. */
  size?: ErrorSize;
  className?: string;
}

export type ErrorSize = 'sm' | 'md' | 'lg';

/**
 * Each size is a complete set of literal Tailwind classes (not built via
 * string interpolation) so Tailwind's content scanner can see and keep them.
 * Tweak the pixel/rem values here if you want something in between.
 */
const SIZE_STYLES: Record<ErrorSize, { icon: string; code: string; title: string; message: string }> = {
  sm: {
    icon: 'max-w-[200px] sm:max-w-[240px]',
    code: 'text-3xl sm:text-4xl',
    title: 'text-base sm:text-lg',
    message: 'text-xs',
  },
  md: {
    icon: 'max-w-[280px] sm:max-w-[320px]',
    code: 'text-4xl sm:text-5xl',
    title: 'text-lg sm:text-xl',
    message: 'text-xs sm:text-sm',
  },
  lg: {
    icon: 'max-w-[380px] sm:max-w-[440px]',
    code: 'text-5xl sm:text-6xl',
    title: 'text-xl sm:text-2xl',
    message: 'text-sm sm:text-base',
  },
};

// Fixed Brand Gradient 
const CODE_GRADIENT = 'linear-gradient(135deg, #5B2CFB 0%, #4C6EF8 55%, #06C4FA 100%)';

export function ErrorState({
  variant,
  code,
  title,
  message,
  homeHref = '/',
  onGoHome,
  secondaryAction,
  size = 'md',
  className = '',
}: ErrorStateProps) {
  const s = SIZE_STYLES[size];

  return (
    <div className={`flex flex-col items-center text-center px-6 py-10 ${className}`}>
      <ErrorIllustration variant={variant} className={`w-full h-auto ${s.icon}`} />

      {/* Status code — fixed gradient */}
      {code !== undefined && (
        <p
          aria-hidden="true"
          className={`font-bold leading-none tracking-tight mt-1 ${s.code}`}
          style={{
            backgroundImage: CODE_GRADIENT,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {code}
        </p>
      )}

      {/* Code message — theme-adaptive via text-text */}
      <h1 className={`text-text font-semibold ${s.title} ${code !== undefined ? 'mt-2' : 'mt-3'}`}>
        {title}
      </h1>

      {/* Message content — same theme variable at reduced opacity, no new token needed */}
      <p className={`text-text/70 mt-2 max-w-xs text-balance ${s.message}`}>
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <ActionButton href={homeHref} onClick={onGoHome} variant="primary">
          Go Home
        </ActionButton>

        {secondaryAction && (
          <ActionButton href={secondaryAction.href} onClick={secondaryAction.onClick} variant="secondary">
            {secondaryAction.label}
          </ActionButton>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  href,
  onClick,
  variant,
  children,
}: {
  href?: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary';
  children: ReactNode;
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-none px-5 py-2.5 text-sm font-medium transition-colors';

  const style =
    variant === 'primary'
      ? { backgroundImage: CODE_GRADIENT, color: '#fff' }
      : undefined;

  const secondaryClasses =
    variant === 'secondary' ? 'text-text border border-text/20 hover:bg-text/5' : 'hover:opacity-90';

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${baseClasses} ${secondaryClasses}`} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${secondaryClasses}`} style={style}>
      {children}
    </button>
  );
}

/* ============================= Usage =============================

  // permission / auth problems — reuse "lock" for 401 and 403 alike
  <ErrorState
    variant="lock"
    code={403}
    title="Access denied"
    message="You don't have permission to view this page."
    secondaryAction={{ label: 'Request access', onClick: handleRequestAccess }}
  />

  // can't reach / find the thing — reuse "connection" for 404, 502, 504...
  <ErrorState
    variant="connection"
    code={404}
    title="Page not found"
    message="Looks like you've taken a wrong turn. Let's get you back on track."
  />

  // ...or with no status code at all, for a client-side network error
  <ErrorState
    variant="connection"
    title="No internet connection"
    message="Check your network and try again."
    secondaryAction={{ label: 'Retry', onClick: () => window.location.reload() }}
  />

  // something broke on our end — 500, 502, unhandled errors...
  <ErrorState
    variant="crash"
    code={500}
    title="Something went wrong"
    message="We're having trouble loading this page right now. Please try again in a few minutes."
    secondaryAction={{ label: 'Try again', onClick: () => window.location.reload() }}
  />

  // planned downtime / maintenance — 503, "Under maintenance"...
  <ErrorState
    variant="service"
    code={503}
    title="Service unavailable"
    message="We're currently under maintenance. Please try again later."
  />

  If you're on react-router, swap onGoHome for navigate('/'), or leave homeHref
  as the default "/" for a plain link.

  // bigger, e.g. for a full dedicated error page rather than an inline empty state
  <ErrorState variant="crash" code={500} title="Something went wrong" message="..." size="lg" />
=====================================================================*/