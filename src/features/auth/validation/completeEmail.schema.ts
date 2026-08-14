import { z } from "zod";

export const completeEmailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type CompleteEmailFormValues = z.infer<typeof completeEmailSchema>;