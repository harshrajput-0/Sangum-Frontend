import type { Post } from '../../../types/post.types';
import { PostImageMedia } from './PostImageMedia';
import { PostVideoMedia } from './PostVideoMedia';
import { PostDocMedia } from './PostDocMedia';
import { PostPollMedia } from './PostPollMedia';

export interface PostMediaProps {
  post: Post;
  onVote: (optionIndex: number) => void;
}

/** Media is the post's primary content when present — always renders, never hidden behind "show more" (unlike the excerpt/Key Topics). */
export function PostMedia({ post, onVote }: PostMediaProps) {
  switch (post.type) {
    case 'image':
      return post.image ? <PostImageMedia image={post.image} alt={post.title ?? ''} aspect={post.imageAspect} /> : null;
    case 'video':
      return <PostVideoMedia />;
    case 'doc':
      return <PostDocMedia />;
    case 'poll':
      return (
        <PostPollMedia
          options={post.topics ?? []}
          votes={post.pollVotes ?? []}
          votedIndex={post.pollVotedIndex ?? null}
          onVote={onVote}
        />
      );
    default:
      return null;
  }
}