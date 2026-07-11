import { Outlet } from "react-router-dom";
import { PublicHeader } from '@/shared/components/navigation/PublicHeader'
import { PublicFooter } from "@/shared/components/navigation/PublicFooter";

export const PublicLayout = () => {
    return (
  <div className="min-h-screen flex flex-col">
            <PublicHeader />
            <main className="flex-1 mt-16">
                <Outlet />
            </main>
            
            <PublicFooter />
        </div>
    )
}