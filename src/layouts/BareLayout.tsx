import { PublicHeader } from "@/shared/components/navigation/PublicHeader"
import { Outlet } from "react-router-dom"

const BareLayout = () => {
    return (
        <div>
            <PublicHeader />
            <main className="w-full max-w-screen min-h-screen items-center h-full flex justify-center pb-30" >
                <Outlet />
            </main>
        </div>
    )
}

export default BareLayout