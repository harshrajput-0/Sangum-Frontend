import { ProfileOverviewPage } from "@/features/user/components/overview/ProfileOverviewPage";

interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <ProfileOverviewPage username={params.username} />
    </div>
  );
}
