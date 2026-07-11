import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/navigation/PublicNavbar";
import MinFooter from "@/shared/components/navigation/MinFooter";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16 flex items-center justify-center">
        <Outlet />
      </main>

      <MinFooter />
    </div>
  );
};

export default AuthLayout;