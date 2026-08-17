"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { Avatar } from "@/shared/components/ui/Avatar";
import { ThemeToggle } from "../ui/ThemeToggle";
import DummySearch from "../ui/DummySearch";
import { CreateIcon, NotificationsIcon } from "../ui/icons/SangumIcons";
import { IconButton } from "../ui/IconButton";
import { useSessionStore } from "@/shared/stores/session.store";
import { useUserMenu } from "@/features/user/hooks/useUserMenu";
import { UserMenu } from "@/features/user/components/UserMenu";
import { authService } from "@/features/auth/services/auth.service";
import { AUTH_ROUTES } from "@/features/auth/constants/auth.constants";

export const AppHeader: React.FC = () => {
  const router = useRouter();
  const user = useSessionStore((s) => s.user);

  const {
    isOpen,
    menuRef,
    toggleMenu,
    handleProfileClick,
    handleSettingsClick,
    handleLogoutClick,
  } = useUserMenu({
    onProfileClick: () => {
      if (user) router.push(`/profile/${user.username}`);
    },
    onSettingsClick: () => router.push("/settings"),
    onLogout: async () => {
      try {
        await authService.logout();
      } catch {
        // Session is already cleared locally regardless (see
        // auth.service.ts's finally block) — a failed network call
        // here shouldn't block navigating away.
      }
      router.push(AUTH_ROUTES.login);
    },
  });

  return (
    <nav className="sticky top-0 w-full z-99 transition-all duration-300 border-border bg-bg text-text border-b flex items-center justify-between p-6 h-14">
      <DummySearch />

      <div className="hidden tablet:flex items-center gap-2 justify-end">
        <Button size="sm" iconLeft={<CreateIcon />}>
          Create
        </Button>
        <ThemeToggle />

        <IconButton label="Notification" icon={<NotificationsIcon />} />

        {user && (
          <div className="relative">
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Account menu"
              className="block rounded-full"
            >
              <Avatar fullName={user.displayName} imageSrc={user.avatar ?? undefined} size="sm" />
            </button>
            {isOpen && (
              <div className="absolute right-0 top-full z-50 mt-2">
                <UserMenu
                  ref={menuRef}
                  onProfileClick={handleProfileClick}
                  onSettingsClick={handleSettingsClick}
                  onLogoutClick={handleLogoutClick}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};