import type {
  AvailabilityOption,
  ContentTab,
  ExperienceLevel,
  MessagingOption,
  VisibilityOption,
} from "../types/profile.types";

/* ---------------- Image upload ---------------- */

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const IMAGE_TYPE_ERROR_MESSAGE =
  "Please choose a JPG, PNG, or WEBP image. GIFs and video files are not supported.";

export const IMAGE_SIZE_ERROR_MESSAGE = "Image must be smaller than 5MB.";

/* ---------------- Bio ---------------- */

export const BIO_MAX_LENGTH = 160;

/* ---------------- Navigation ---------------- */

export const CONTENT_TABS: { value: ContentTab; label: string }[] = [
  { value: "posts", label: "Posts" },
  { value: "resources", label: "Resources" },
  { value: "communities", label: "Communities" },
];

/* ---------------- Professional ---------------- */

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "junior", label: "Junior (0–2 yrs)" },
  { value: "mid", label: "Mid-level (2–5 yrs)" },
  { value: "senior", label: "Senior (5–10 yrs)" },
  { value: "lead", label: "Lead / Principal (10+ yrs)" },
];

export const AVAILABILITY_OPTIONS: { value: AvailabilityOption; label: string }[] = [
  { value: "open_to_work", label: "Open to work" },
  { value: "open_to_freelance", label: "Open to freelance" },
  { value: "not_looking", label: "Not looking" },
];

/* ---------------- Privacy ---------------- */

export const VISIBILITY_OPTIONS: { value: VisibilityOption; label: string }[] = [
  { value: "public", label: "Public" },
  { value: "community_only", label: "Community only" },
  { value: "private", label: "Private" },
];

export const MESSAGING_OPTIONS: { value: MessagingOption; label: string }[] = [
  { value: "everyone", label: "Everyone" },
  { value: "followers", label: "People you follow" },
  { value: "no_one", label: "No one" },
];

/* ---------------- Deactivate account ---------------- */

export const DEACTIVATE_REASONS: string[] = [
  "Not using it enough",
  "Privacy concerns",
  "Found another platform",
  "Other",
];

export const DEACTIVATE_GRACE_PERIOD_DAYS = 30;
