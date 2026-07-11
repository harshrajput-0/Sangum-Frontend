import { Outlet } from "react-router-dom";
import { PublicHeader } from '@/shared/components/navigation/PublicHeader'
import MinFooter from "@/shared/components/navigation/MinFooter";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1 mt-16 flex items-center justify-center">
        <Outlet />
      </main>

      <MinFooter />
    </div>
  );
};

export default AuthLayout;