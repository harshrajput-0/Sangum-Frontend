import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "../constants/auth.constants";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, and underscores only"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    ),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms and Privacy Policy",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;