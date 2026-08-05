import { z } from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().trim().email("Enter a valid email"),
});

export type ChangeEmailSchemaInput = z.infer<typeof changeEmailSchema>;

/**
 * Adds a "must differ from current email" check once the current email is
 * known at runtime. Kept as a factory rather than baked into the base schema
 * so the base schema stays usable without requiring that context.
 */
export function createChangeEmailSchema(currentEmail: string) {
  return changeEmailSchema.refine((data) => data.newEmail !== currentEmail, {
    message: "New email must be different from your current email",
    path: ["newEmail"],
  });
}
