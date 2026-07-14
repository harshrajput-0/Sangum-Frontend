import { PublicHeader } from "@/shared/components/navigation/PublicHeader"
import { Outlet } from "react-router-dom"

const BareLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <PublicHeader />
            <main className="flex flex-1 justify-center items-center bg-bg" >
                <Outlet />
            </main>
        </div>
    )
}

export default BareLayout