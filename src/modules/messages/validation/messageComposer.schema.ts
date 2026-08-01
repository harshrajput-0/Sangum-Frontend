import { z } from "zod";

/**
 * Validates a composer draft before it's handed to the send handler.
 * Trims whitespace-only input and caps length at a sane bound.
 */
export const messageComposerSchema = z
  .string()
  .trim()
  .min(1, "Message can't be empty")
  .max(4000, "Message is too long");

export type MessageComposerInput = z.infer<typeof messageComposerSchema>;

export function validateComposerDraft(
  draft: string,
): { success: true; value: string } | { success: false; error: string } {
  const result = messageComposerSchema.safeParse(draft);
  if (result.success) {
    return { success: true, value: result.data };
  }
  return { success: false, error: result.error.issues[0]?.message ?? "Invalid message" };
}