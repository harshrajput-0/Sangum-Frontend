import { EditProfileShell } from "@/features/user/components/edit/EditProfileShell";
import { getCurrentUsername } from "@/features/user/lib/getCurrentUsername";

export default async function EditProfilePage() {
  const username = await getCurrentUsername();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <EditProfileShell username={username} />
    </div>
  );
}
