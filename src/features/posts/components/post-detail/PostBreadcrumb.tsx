// src/features/posts/components/post-detail/PostBreadcrumb.tsx

interface PostBreadcrumbProps {
  groupName: string;
  postTitle: string;
  onNavigateGroup?: () => void;
  onNavigatePosts?: () => void;
}

/** Breadcrumb trail: Group › Posts › current post title. */
export function PostBreadcrumb({
  groupName,
  postTitle,
  onNavigateGroup,
  onNavigatePosts,
}: PostBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
      <button type="button" onClick={onNavigateGroup} className="hover:text-text">
        {groupName}
      </button>
      <span>›</span>
      <button type="button" onClick={onNavigatePosts} className="hover:text-text">
        Posts
      </button>
      <span>›</span>
      <span className="text-primary-light">{postTitle}</span>
    </div>
  );
}