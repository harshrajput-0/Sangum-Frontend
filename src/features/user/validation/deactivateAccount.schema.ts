import { z } from "zod";

export const deactivateAccountSchema = z.object({
  option: z.enum(["temporary", "permanent"]),
  reason: z.string().trim().optional(),
  confirmChecked: z.boolean().refine((val) => val === true, {
    message: "Please confirm before continuing",
  }),
});

export type DeactivateAccountSchemaInput = z.infer<
  typeof deactivateAccountSchema
>;
