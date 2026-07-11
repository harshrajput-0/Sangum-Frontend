import { PublicHeader } from "@/shared/components/navigation/PublicHeader"
import { Outlet } from "react-router-dom"

const BareLayout = () => {
    return (
        <div>
            <PublicHeader />
            <Outlet />
        </div>
    )
}

export default BareLayout