import { z } from "zod";
import { BIO_MAX_LENGTH } from "../constants/profile.constants";

/**
 * Validates the Edit Profile form (Basic Information + Professional + Links & Socials).
 *
 * Intentionally loose on format (usernames, URLs, etc.) — this only catches
 * obvious client-side mistakes before a submit round-trip. The Express backend
 * remains the source of truth for exact format/uniqueness rules; don't tighten
 * this to match backend-specific constraints, or the two will drift out of sync.
 */
export const editProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Enter a valid email"),
  username: z.string().trim().min(1, "Username is required"),
  location: z.string().trim().optional().default(""),
  headline: z.string().trim().optional().default(""),
  bio: z
    .string()
    .trim()
    .max(BIO_MAX_LENGTH, `Bio must be ${BIO_MAX_LENGTH} characters or fewer`)
    .optional()
    .default(""),
  jobTitle: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  // Loose strings, not z.enum — keeps this schema decoupled from the exact
  // value set the backend ends up using for these two fields.
  experienceLevel: z.string().optional().default(""),
  availability: z.string().optional().default(""),
  links: z
    .object({
      website: z.string().trim().optional().default(""),
      github: z.string().trim().optional().default(""),
      twitter: z.string().trim().optional().default(""),
      linkedin: z.string().trim().optional().default(""),
      youtube: z.string().trim().optional().default(""),
    })
    .optional()
    // .default({}),                                 // TODO: FIX THIS
});

export type EditProfileSchemaInput = z.infer<typeof editProfileSchema>;
