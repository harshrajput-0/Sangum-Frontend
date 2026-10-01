import { Sidebar } from '@/shared/components/navigation/Sidebar'
import { ReactNode } from 'react'
import { CreatePostModalShell } from '@/features/posts/components/CreatePost/CreatePostModalShell'

interface ChatLayoutProps {
    children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {

    return (
        <>
            <div className="flex h-screen">
                <Sidebar className="hidden sm:flex"/>


                <main className="flex-1 overflow-y-auto  phone:pb-0 no-scrollbar ">
                    {children}
                </main>

            </div>

            <CreatePostModalShell />
        </>
    );
}