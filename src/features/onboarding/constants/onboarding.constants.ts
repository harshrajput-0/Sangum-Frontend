// Mirrors backend/src/modules/users/user.validation.ts exactly.
export const FULL_NAME_MIN = 2;
export const FULL_NAME_MAX = 50;
export const USERNAME_MIN = 5;
export const USERNAME_MAX = 20;
export const USERNAME_REGEX = /^(?![.-])(?!.*[.-]{2,})[a-z0-9_.-]+(?<![.-])$/;

// Mirrors backend/src/config/multer.ts ALLOWED_MIME_TYPES + 5MB limit.
export const AVATAR_MAX_SIZE_BYTES = 5 * 1024 * 1024;
export const AVATAR_ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
export const AVATAR_ACCEPT_ATTR = 'image/png, image/jpeg, image/webp, image/gif';

export const RESEND_COOLDOWN_SECONDS = 30;

export const AVATAR_FALLBACK_COLORS = [
  'var(--primary)',
  'var(--success)',
  'var(--info)',
  'var(--warning)',
  'var(--danger)',
];

// Deliberately a local literal, not an import of AUTH_ROUTES.completeEmail
// from the auth feature — keeps onboarding self-contained per the
// feature-isolation rule. Only used as a defensive redirect target if
// someone lands on /onboarding directly without hasEmail (see
// useOnboardingRouting.ts). If /complete-email's path ever changes,
// this needs a manual update too.
export const COMPLETE_EMAIL_FALLBACK_ROUTE = '/complete-email';
