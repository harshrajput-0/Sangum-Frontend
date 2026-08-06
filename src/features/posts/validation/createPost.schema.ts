import { z } from 'zod';

/**
 * Mirrors the mock's cpPublish() validation exactly: only `title` is
 * required. Every other field — content, poll question/options,
 * community, tags — is optional, with fallbacks applied in
 * lib/derivePostContent.ts at submit time. Isolated here so stricter
 * per-type rules (e.g. requiring 2+ poll options) can be layered in
 * later without touching any component or hook.
 */
export const createPostSchema = z.object({
  communityId: z.string().nullable(),
  type: z.enum(['text', 'image', 'video', 'doc', 'poll']),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().optional(),
  pollQuestion: z.string().optional(),
  pollOptions: z.array(z.string()).optional(),
  pollDuration: z.enum(['1 day', '3 days', '1 week']).optional(),
  tags: z.array(z.string()).max(10, 'Up to 10 tags allowed'),
});

export type CreatePostSchemaInput = z.infer<typeof createPostSchema>;