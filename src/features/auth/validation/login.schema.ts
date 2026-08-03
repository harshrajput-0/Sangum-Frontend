import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Enter your email or username"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;