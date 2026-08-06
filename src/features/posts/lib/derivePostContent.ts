import type { CreatePostFormValues } from '../types/createPost.types';
import type { PostType } from '../types/post.types';

export interface DerivedPostContent {
  excerpt: string;
  topics: string[];
  tags: string[];
  pollVotes?: number[];
}

const FALLBACK_EXCERPT: Record<Exclude<PostType, 'poll'>, string> = {
  text: 'No additional content provided.',
  image: 'Shared an image.',
  video: 'Shared a video.',
  doc: 'Shared a document.',
};

/**
 * Pure transform mirroring the mock's cpPublish() derivation exactly:
 * each type's free-text field becomes `excerpt` (falling back to a
 * type-specific default when empty). Poll posts additionally derive
 * `topics` from non-empty options (defaulting to two blank options)
 * and append a "Poll · <duration>" tag, matching the mock 1:1.
 */
export function derivePostContent(values: CreatePostFormValues): DerivedPostContent {
  const tags = [...values.tags];

  if (values.type === 'poll') {
    const options = values.pollOptions.map((o) => o.trim()).filter(Boolean);
    const topics = options.length ? options : ['Option 1', 'Option 2'];
    tags.push(`Poll · ${values.pollDuration}`);
    return {
      excerpt: values.pollQuestion.trim() || 'Poll — cast your vote.',
      topics,
      tags: tags.length ? tags : ['General'],
      pollVotes: topics.map(() => 0),
    };
  }

  return {
    excerpt: values.content.trim() || FALLBACK_EXCERPT[values.type],
    topics: [],
    tags: tags.length ? tags : ['General'],
  };
}