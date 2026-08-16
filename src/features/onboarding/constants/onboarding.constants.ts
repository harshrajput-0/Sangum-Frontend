// Mirrors backend/src/utils/username.ts exactly (single source of truth
// on that side; duplicated here per this app's feature-isolation
// convention — see COMPLETE_EMAIL_FALLBACK_ROUTE below for the same
// reasoning). Also duplicated in features/auth/validation/register.schema.ts
// — if this changes, that needs the same update.
export const FULL_NAME_MIN = 2;
export const FULL_NAME_MAX = 50;
export const USERNAME_MIN = 5;
export const USERNAME_MAX = 20;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*$/;

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

// How long the step-3 success message holds before handing off to
// useOnboardingRouting (which then re-derives the screen off the
// updated session user). Purely a UX beat, not a network wait.
export const SUCCESS_DISPLAY_MS = 1800;

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

// Same reasoning — local literal, not imported from elsewhere. This is
// where the Done screen's "Go to Feed" button and the wizard's own
// forward-progression both land, since the (app)/feed route already
// exists in the app router.
export const FEED_ROUTE = '/feed';
