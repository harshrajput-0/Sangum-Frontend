/**
 * FeedPage.tsx
 * renders inside <AppLayout>. Sort select, feed tabs, a composer prompt,
 * and the post list.
 *
 * Path (as documented): modules/feed/pages/
 */
"use client"

import { useState } from "react";
import { Avatar, Button, Select, Spinner } from "@/shared/components/ui";
import { FeedPostCard, type FeedPostCardProps } from "./FeedPostCard";

const photoIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);
const pollIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 21H4a1 1 0 01-1-1V3M7 14l4-4 4 4 5-5" />
  </svg>
);
const linkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M10 13a5 5 0 007.07 0l1.93-1.93a5 5 0 00-7.07-7.07L10 5" />
  </svg>
);

export type FeedTab = "for-you" | "following" | "communities" | "latest";

const feedTabs: { id: FeedTab; label: string }[] = [
  { id: "for-you", label: "For You" },
  { id: "following", label: "Following" },
  { id: "communities", label: "Communities" },
  { id: "latest", label: "Latest" },
];

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "top", label: "Top" },
  { value: "trending", label: "Trending" },
];

type SeedPost = Omit<FeedPostCardProps, "onToggleLike" | "onToggleSave" | "onCommentClick" | "onShareClick" | "onMenuClick" | "liked" | "saved">;

const seedPosts: SeedPost[] = [
  {
    href: "/c/mern-developers/posts/1",
    authorName: "Aaryan Verma",
    avatarInitials: "AV",
    avatarColor: "var(--primary)",
    roleBadgeLabel: "Admin",
    subtitle: "in MERN Developers · 2h ago",
    body: "Just shipped a new feature for resource collections. Would love your feedback! 🚀",
    imageGradient: "var(--brand-gradient-cover)",
    likeCount: 128,
    commentCount: 24,
  },
  {
    href: "/u/priya.codes/posts/2",
    authorName: "Priya Patel",
    avatarInitials: "PS",
    avatarColor: "var(--info)",
    subtitle: "@priya.codes · 5h ago",
    body: "Best practices for organizing large React codebases — a thread 🧵",
    tags: ["#react", "#architecture"],
    likeCount: 96,
    commentCount: 18,
  },
];

export interface FeedPageProps {
  currentUserInitials?: string;
  currentUserAvatarColor?: string;
  onComposeClick?: () => void;
  onAttachPhoto?: () => void;
  onCreatePoll?: () => void;
  onAttachLink?: () => void;
  posts?: SeedPost[];
  /** Shows the "Loading more posts…" row — this page uses an infinite-scroll pattern rather than a Load More button. Default true to match the source design. */
  loadingMore?: boolean;
}

export function FeedPage({
  // currentUserInitials,
  currentUserAvatarColor = "var(--primary)",
  onComposeClick,
  onAttachPhoto,
  onCreatePoll,
  onAttachLink,
  posts = seedPosts,
  loadingMore = true,
}: FeedPageProps) {
  const [activeTab, setActiveTab] = useState<FeedTab>("for-you");
  const [sort, setSort] = useState("latest");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  const toggleInSet = (set: Set<number>, id: number, setter: (s: Set<number>) => void) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-(length:--fs-2xl) font-bold text-text">Home Feed</h1>
          <p className="mt-1 text-(length:--fs-xs) text-text-muted">
            Posts from people and communities you follow
          </p>
        </div>
        <Select options={sortOptions} value={sort} onChange={(e) => setSort(e.target.value)} className="w-auto" />
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {feedTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? "rounded-md bg-[rgba(109,93,254,0.14)] px-3.5 py-2 text-(length:--fs-sm) font-medium text-primary-light"
                : "rounded-md px-3.5 py-2 text-(length:--fs-sm) font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-4 rounded-lg border border-border bg-surface p-5">
        <button type="button" onClick={onComposeClick} className="flex w-full items-center gap-3 text-left">
          <Avatar size="md" name="User" color={currentUserAvatarColor} />
          <span className="flex-1 rounded-md border border-border bg-(--input-bg) px-3.5 py-2.5 text-(length:--fs-sm) text-text-muted">
            {"What's on your mind?"}
          </span>
        </button>
        <div className="mt-3 flex gap-2 border-t border-border pt-3">
          <Button variant="ghost" size="sm" iconLeft={photoIcon} onClick={onAttachPhoto}>
            Photo
          </Button>
          <Button variant="ghost" size="sm" iconLeft={pollIcon} onClick={onCreatePoll}>
            Poll
          </Button>
          <Button variant="ghost" size="sm" iconLeft={linkIcon} onClick={onAttachLink}>
            Link
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <FeedPostCard
            key={post.href}
            {...post}
            liked={likedIds.has(i)}
            onToggleLike={() => toggleInSet(likedIds, i, setLikedIds)}
            saved={savedIds.has(i)}
            onToggleSave={() => toggleInSet(savedIds, i, setSavedIds)}
          />
        ))}
      </div>

      {loadingMore && (
        <div className="flex items-center justify-center gap-2.5 p-5">
          <Spinner size="sm" />
          <span className="text-(length:--fs-sm) text-text-secondary">Loading more posts…</span>
        </div>
      )}
    </div>
  );
}
