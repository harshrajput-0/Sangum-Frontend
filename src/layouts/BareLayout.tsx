import { PublicHeader } from "@/shared/components/navigation/PublicHeader"
import { ReactNode } from "react"

interface BareLayoutProps {
    children: ReactNode;
}

export function BareLayout({children}: BareLayoutProps) {
    return (
        <div className="h-screen flex flex-col">
            <PublicHeader />
            <main className="flex flex-1 justify-center items-center bg-bg" >
                {children}
            </main>
        </div>
    )
}
