import { z } from 'zod';

/**
 * Mirrors the mockup exactly: a comment (or reply) just needs
 * non-empty trimmed text — no length cap in the reference UI, so
 * none is enforced here. Isolated to this one file so it can be
 * tightened later without touching any component or hook.
 */
export const commentTextSchema = z.string().trim().min(1, 'Comment cannot be empty');

export type CommentTextInput = z.infer<typeof commentTextSchema>;