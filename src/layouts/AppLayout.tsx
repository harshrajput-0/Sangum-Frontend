import { AppHeader } from '@/shared/components/navigation/AppHeader'
import { MobileNav } from '@/shared/components/navigation/MobileNav'
import { Sidebar } from '@/shared/components/navigation/Sidebar'
import { ReactNode } from 'react'
import { CreatePostModalShell } from '@/features/posts/components/CreatePost/CreatePostModalShell'

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar className="hidden sm:flex" />

        <div className="flex flex-1 flex-col">
          <AppHeader />

          <main className="flex-1 overflow-y-auto pb-16 phone:pb-0 no-scrollbar p-6">
            {children}
          </main>

          <MobileNav className="phone:hidden text-text" />
        </div>
      </div>

      {/* Global overlay — reachable from any trigger button anywhere
          in the app (AppHeader, MobileNav, or a page's own composer
          bar) via useCreatePostTrigger(). Mounted once here, not per-page. */}
      <CreatePostModalShell />
    </>
  );
}