import { z } from "zod";

/**
 * Only enforces the two things that are purely a client-UX concern: a
 * sensible minimum length and that the confirmation matches. Deliberately
 * does NOT enforce a complexity regex (uppercase/symbol/etc.) — that policy
 * belongs to the Express backend and shouldn't be duplicated/drift here.
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchemaInput = z.infer<typeof changePasswordSchema>;
