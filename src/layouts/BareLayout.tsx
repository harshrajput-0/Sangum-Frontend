import { PublicHeader } from "@/shared/components/navigation/PublicHeader"
import { Outlet } from "react-router-dom"

const BareLayout = () => {
    return (
        <div className="h-full">
            <PublicHeader />
            <main className="w-full max-w-screen max-h-full items-center h-full flex flex-1" >
                <Outlet />
            </main>
        </div>
    )
}

export default BareLayout