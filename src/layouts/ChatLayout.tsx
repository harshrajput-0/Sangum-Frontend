import { Sidebar } from '@/shared/components/navigation/Sidebar'
import { ReactNode, useState } from 'react'
import { CreatePostModalShell } from '@/features/posts/components/CreatePost/CreatePostModalShell'

interface ChatLayoutProps {
    children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    return (
        <>
            <div className="flex h-screen">
                <Sidebar className="hidden sm:flex"
                    collapsed={sidebarCollapsed}
                    onCollapsedChange={setSidebarCollapsed} />


                <main className="flex-1 overflow-y-auto  phone:pb-0 no-scrollbar ">
                    {children}
                </main>

            </div>

            <CreatePostModalShell />
        </>
    );
}