import { ReactNode } from "react";
import { PublicHeader } from "@/shared/components/navigation/PublicHeader";
import { PublicFooter } from "@/shared/components/navigation/PublicFooter";
import { GlowDriftBackground } from "@/shared/animations/GlowDriftBackground";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
<GlowDriftBackground>

      <PublicHeader />

      <main>{children}</main>

      <PublicFooter />
</GlowDriftBackground>

  );
}