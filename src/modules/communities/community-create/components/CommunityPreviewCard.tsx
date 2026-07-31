import { Users, ClipboardList } from "lucide-react";
import { Card, GradientBanner } from "@/modules/communities/shared/components/ui";

interface CommunityPreviewCardProps {
  name: string;
  slug: string;
  guidelines?: string[];
}

export function CommunityPreviewCard({
  name,
  slug,
  guidelines = ["Be respectful and inclusive", "No spam or self-promotion", "Stay on topic"],
}: CommunityPreviewCardProps) {
  return (
    <Card>
      <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-text-muted">
        Community preview
      </span>
      <GradientBanner height="lg" gradientClassName="from-primary to-info" />
      <div className="-mt-8 mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-active ring-4 ring-surface">
        <Users size={18} className="text-text-muted" />
      </div>
      <p className="text-sm font-semibold text-text">{name || "Community Name"}</p>
      <p className="mb-4 font-[family-name:var(--font-mono)] text-xs text-text-muted">
        @{slug || "your-community"}
      </p>
      <hr className="mb-4 border-border" />
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-text">
        <ClipboardList size={14} /> Guidelines
      </p>
      <p className="text-xs leading-relaxed text-text-muted">{guidelines.join(" · ")}</p>
    </Card>
  );
}