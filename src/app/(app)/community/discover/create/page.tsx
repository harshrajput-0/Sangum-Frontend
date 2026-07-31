"use client";

import { useRouter } from "next/navigation";
import {
  CommunityCreateShell,
  categoryOptions,
  whoCanJoinOptions,
  whoCanPostOptions,
} from "@/modules/communities/community-create";

export default function CreateCommunityPage() {
  const router = useRouter();

  const handleCreate = () => {
    // TODO: Replace with Express API integration — POST /api/communities
  };

  return (
    <CommunityCreateShell
      categories={categoryOptions}
      whoCanJoinOptions={whoCanJoinOptions}
      whoCanPostOptions={whoCanPostOptions}
      onBack={() => router.push("/discover")}
      onCancel={() => router.push("/discover")}
      onCreate={handleCreate}
    />
  );
}