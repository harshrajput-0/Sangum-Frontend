// modules/profile/pages/ProfilePage.tsx

import { ProfileHeader, ProfileCommentCard, type ProfileCommentData, ProfileCommunityRow, type ProfileCommunityData } from "./components";

import { EmptyBoxIcon } from "./components/icon";
import { PostSkeleton } from "@/modules/post/components";
import { PostCard } from "@/modules/post/components/PostCard";
import type { PostData } from "@/modules/post/types/types";

import { ResourceList, type ResourceData } from "@/modules/resources/components";
import type { ProfileData, ProfileTab } from "../profile/types";

export interface ProfilePageProps {
  profile: ProfileData;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  /** Passed through to PostCard so it can derive edit/delete/report permissions. */
  currentUsername?: string;
  onEditProfile?: () => void;
  onFollowToggle?: (next: boolean) => void;
  onMessage?: () => void;

  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;

  posts?: PostData[];
  postsLoading?: boolean;
  onPostLikeToggle?: (postId: string, next: boolean) => void;
  onPostBookmarkToggle?: (postId: string, next: boolean) => void;
  onPostComment?: (postId: string) => void;
  onPostShare?: (postId: string) => void;
  onPostTagClick?: (tag: string) => void;

  comments?: ProfileCommentData[];
  commentsLoading?: boolean;

  resources?: ResourceData[];
  resourcesLoading?: boolean;
  onResourceBookmarkToggle?: (resourceId: string, next: boolean) => void;

  communities?: ProfileCommunityData[];
  communitiesLoading?: boolean;
  onCommunityClick?: (community: ProfileCommunityData) => void;

  className?: string;
}

function EmptyTab({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <EmptyBoxIcon className="w-10 h-10 text-[var(--text-muted)]" />
      <p className="text-[length:var(--fs-sm)] text-[var(--text-muted)]">{message}</p>
    </div>
  );
}

/**
 * /u/:username — profile view. Render inside your AppLayout:
 *   <AppLayout><ProfilePage profile={profile} activeTab={tab} onTabChange={setTab} posts={posts} /></AppLayout>
 */
export function ProfilePage({
  profile,
  isOwnProfile = false,
  isFollowing = false,
  currentUsername,
  onEditProfile,
  onFollowToggle,
  onMessage,
  activeTab,
  onTabChange,
  posts,
  postsLoading = false,
  // onPostLikeToggle,
  // onPostBookmarkToggle,
  onPostComment,
  onPostShare,
  onPostTagClick,
  comments,
  commentsLoading = false,
  resources,
  resourcesLoading = false,
  onResourceBookmarkToggle,
  communities,
  communitiesLoading = false,
  onCommunityClick,
  className,
}: ProfilePageProps) {
  return (
    <div className={className}>
      <ProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onEditProfile={onEditProfile}
        onFollowToggle={onFollowToggle}
        onMessage={onMessage}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <div className="flex flex-col gap-4 mt-5">
        {activeTab === "posts" &&
          (postsLoading ? (
            Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} withMedia={false} />)
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUsername={currentUsername}
                // onLikeToggle={(next) => onPostLikeToggle?.(post.id, next)} 
                // onBookmarkToggle={(next) => onPostBookmarkToggle?.(post.id, next)}
                onComment={() => onPostComment?.(post.id)}
                onShare={() => onPostShare?.(post.id)}
                onTagClick={onPostTagClick}
              />
            ))
          ) : (
            <EmptyTab message="No posts yet." />
          ))}

        {activeTab === "comments" &&
          (commentsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 animate-pulse">
                <div className="h-2.5 w-1/3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] mb-2" />
                <div className="h-3 w-4/5 rounded-[var(--radius-sm)] bg-[var(--surface-2)]" />
              </div>
            ))
          ) : comments && comments.length > 0 ? (
            comments.map((comment) => <ProfileCommentCard key={comment.id} comment={comment} />)
          ) : (
            <EmptyTab message="No comments yet." />
          ))}

        {activeTab === "resources" && (
          <ResourceList
            resources={resources ?? []}
            layout="grid"
            loading={resourcesLoading}
            emptyMessage="No saved or shared resources yet."
            onBookmarkToggle={(resource, next) => onResourceBookmarkToggle?.(resource.id, next)}
          />
        )}

        {activeTab === "communities" &&
          (communitiesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3.5 animate-pulse flex items-center gap-3">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--surface-2)] flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-2.5 w-1/3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] mb-1.5" />
                  <div className="h-2 w-1/4 rounded-[var(--radius-sm)] bg-[var(--surface-2)]" />
                </div>
              </div>
            ))
          ) : communities && communities.length > 0 ? (
            communities.map((community) => <ProfileCommunityRow key={community.id} community={community} onClick={onCommunityClick} />)
          ) : (
            <EmptyTab message="Not a member of any communities yet." />
          ))}
      </div>
    </div>
  );
}
