import { Navbar } from '@/shared/components/navigation/PublicNavbar'
import { Outlet } from 'react-router-dom'

const BareLayout = () => {
  return (
  <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 mt-16">
                <Outlet />
            </main>
            
        </div>
  )
}

export default BareLayout