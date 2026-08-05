import { z } from "zod";

/**
 * Validates the small "Profile Information" card at the top of Account Settings.
 * Separate from editProfile.schema.ts since it's a different form with its
 * own independent submit action in the mockup.
 */
export const accountInfoSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  username: z.string().trim().min(1, "Username is required"),
});

export type AccountInfoSchemaInput = z.infer<typeof accountInfoSchema>;
