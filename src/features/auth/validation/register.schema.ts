import { z } from "zod";
import { passwordRule } from "./passwordRule";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, and underscores only"),
  email: z.string().email("Enter a valid email address"),
  password: passwordRule,
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms and Privacy Policy",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;