import { z } from "zod";
import { passwordRule } from "./passwordRule";

// Mirrors backend/src/utils/username.ts exactly — see that file for why
// this is a single canonical rule shared across register, onboarding,
// and the DB model.
const USERNAME_REGEX = /^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*$/;

export const registerSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  username: z
    .string()
    .trim()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      USERNAME_REGEX,
      "Username can contain letters, numbers, dots, hyphens, and underscores, but can't start or end with one or use two in a row",
    ),
  email: z.string().email("Enter a valid email address"),
  password: passwordRule,
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms and Privacy Policy",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;