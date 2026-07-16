import { ReactNode } from "react";
import { PublicHeader } from "@/shared/components/navigation/PublicHeader";
import { PublicFooter } from "@/shared/components/navigation/PublicFooter";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <PublicHeader />

      <main>{children}</main>

      <PublicFooter />
    </div>
  );
}