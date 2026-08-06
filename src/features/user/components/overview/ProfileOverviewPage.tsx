"use client";

import { useRouter } from "next/navigation";
import { ProfileOverviewShell } from "./ProfileOverviewShell";

export interface ProfileOverviewPageProps {
  username: string;
}

export function ProfileOverviewPage({ username }: ProfileOverviewPageProps) {
  const router = useRouter();

  return (
    <ProfileOverviewShell
      username={username}
      onEditProfile={() => router.push("/profile/edit")}
    />
  );
}
