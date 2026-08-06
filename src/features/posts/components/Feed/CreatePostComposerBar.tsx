import { useCreatePostTrigger } from '../../hooks/useCreatePostTrigger';
import { useCurrentUser } from '../../../../shared/hooks/useCurrentUser';
import { Avatar } from '../../../../shared/components/ui';

/**
 * The one in-page Create Post trigger this feature owns — literally
 * the first element on the Feed page. Every other trigger (header,
 * mobile nav, FAB) lives outside this feature and calls
 * useCreatePostTrigger() directly, per your earlier instruction.
 */
export function CreatePostComposerBar() {
  const currentUser = useCurrentUser();
  const { openCreatePost } = useCreatePostTrigger();

  return (
    <button
      type="button"
      onClick={openCreatePost}
      className="mb-4 flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3.5 text-left transition-shadow duration-200 hover:shadow-md"
    >
      <Avatar initials={currentUser.initials} color={currentUser.avatarColor} size="lg" />
      <span className="flex-1 rounded-full border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text-muted">
        Share something with the community…
      </span>
    </button>
  );
}