import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/navigation/PublicNavbar";
import { Footer } from "@/shared/components/navigation/PublicFooter";

export const PublicLayout = () => {
    return (
  <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 mt-16">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    )
}