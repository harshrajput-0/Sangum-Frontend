import type { ReactNode } from "react";
import { PublicNav } from "./PublicNav";
import { AuthFooter } from "./AuthFooter";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <PublicNav />
      <main className="bg-glow flex flex-1 items-center justify-center px-5 py-16">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}