import { ReactNode } from 'react';
import { PublicHeader } from '@/shared/components/navigation/PublicHeader'
import { MinFooter } from "@/shared/components/navigation/MinFooter";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>

      <MinFooter />
    </div>
  );
};
