import { Outlet } from "react-router-dom";
import { PublicHeader } from '@/shared/components/navigation/PublicHeader'
import { PublicFooter } from "@/shared/components/navigation/PublicFooter";

export const PublicLayout = () => {
    return (
  <div>
            <PublicHeader />
            
            <main>
                <Outlet />
            </main>
            
            <PublicFooter />
        </div>
    )
}