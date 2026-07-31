"use client";

import { useRouter } from "next/navigation";
import {
  DiscoverShell,
  categoryOptions,
  mockFeaturedCommunities,
  mockAllCommunities,
} from "@/modules/communities/discover";

export default function DiscoverPage() {
  const router = useRouter();

  const handleToggleJoin = (id: string) => {
    // TODO: Replace with Express API integration — POST /api/communities/:id/join
  };

  const handleCommunityClick = (id: string) => {
    router.push(`/c/${id}`);
  };

  return (
    <DiscoverShell
      categories={categoryOptions}
      featuredCommunities={mockFeaturedCommunities}
      allCommunities={mockAllCommunities}
      hasMore
      onCreateClick={() => router.push("/discover/create")}
      onToggleJoin={handleToggleJoin}
      onCommunityClick={handleCommunityClick}
    />
  );
}