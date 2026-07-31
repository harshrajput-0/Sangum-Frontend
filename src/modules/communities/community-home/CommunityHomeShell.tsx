"use client";

import { useState } from "react";
import { PostComposerBar } from "./components/PostComposerBar";
import { FeedTabs, FeedSort } from "./components/FeedTabs";
import { PostCard } from "./components/PostCard";
import { AboutSidebarCard } from "./components/AboutSidebarCard";
import { Post, AboutSummary } from "./types";

interface CommunityHomeShellProps {
  posts: Post[];
  aboutSummary: AboutSummary;
  currentUserAvatarLabel: string;
  onComposerClick?: () => void;
  onPostClick?: (id: string) => void;
}

export function CommunityHomeShell({
  posts,
  aboutSummary,
  currentUserAvatarLabel,
  onComposerClick,
  onPostClick,
}: CommunityHomeShellProps) {
  // Simple visual tab state — not business logic, just which sort is highlighted.
  const [activeSort, setActiveSort] = useState<FeedSort>("latest");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PostComposerBar authorLabel={currentUserAvatarLabel} onClick={onComposerClick} />
        <FeedTabs activeSort={activeSort} onSortChange={setActiveSort} />
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onClick={onPostClick} />
          ))}
        </div>
      </div>
      <aside>
        <AboutSidebarCard summary={aboutSummary} />
      </aside>
    </div>
  );
}