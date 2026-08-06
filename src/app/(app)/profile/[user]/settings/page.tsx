import { AccountSettingsShell } from "@/features/user/components/settings/AccountSettingsShell";
import { getCurrentUsername } from "@/features/user/lib/getCurrentUsername";

export default async function AccountSettingsPage() {
  const username = await getCurrentUsername();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <AccountSettingsShell username={username} />
    </div>
  );
}
