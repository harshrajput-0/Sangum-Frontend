import type { ReactNode } from "react";
import { AuthFooter } from "./AuthFooter";
import { PublicHeader } from "@/shared/components/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex bg-glow min-h-screen flex-col bg-bg text-text">
      <PublicHeader />
      <main className=" flex flex-1 items-center justify-center px-5 py-16">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}