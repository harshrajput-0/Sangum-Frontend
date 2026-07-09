import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/navigation/PublicNavbar";
import { Footer } from "@/shared/components/navigation/PublicFooter";

const AuthLayout = () => {
    return (
        <>
            <Navbar />
            <main className="flex-1 mt-(var:(--topbar-height))">
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default AuthLayout