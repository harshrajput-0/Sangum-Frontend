// src/features/posts/components/create-post/PostToCard.tsx
import { Avatar } from '../primitives/Avatar';
import type { PostGroup } from '../../types';

interface PostToCardProps {
  group: PostGroup;
  onChangeGroup?: () => void;
}

/**
 * Shows which group/community a post will be published to.
 * `onChangeGroup` should open a group picker (modal/drawer) —
 * wire it via a hook, e.g.:
 *   const { activeGroup, openGroupPicker } = usePostForm();
 *   <PostToCard group={activeGroup} onChangeGroup={openGroupPicker} />
 */
export function PostToCard({ group, onChangeGroup }: PostToCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <label className="mb-2 block text-xs font-medium text-text-muted">Post to</label>
      <div className="flex items-center justify-between gap-3 rounded-lg bg-bg-elevated px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar label={group.avatarLabel} variant={group.avatarVariant ?? 'success'} />
          <div className="min-w-0">
            <p className="truncate text-sm text-text">{group.name}</p>
            <p className="truncate text-xs text-text-muted">
              {group.visibility ?? 'Public'}
              {group.memberCount ? ` · ${group.memberCount} members` : ''}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onChangeGroup}
          className="shrink-0 rounded-md border border-border-strong px-3 py-1.5 text-xs font-medium text-text hover:bg-surface-hover"
        >
          Change
        </button>
      </div>
    </div>
  );
}