// modules/posts/components/LinkPreviewCard.tsx

import { cn } from "@/shared/utils/cn";
import type { PostLinkData } from "@/modules/post/types/types";

export interface LinkPreviewCardProps {
  link: PostLinkData;
  className?: string;
}

/** URL preview card shown for `type: "link"` posts — thumbnail, title, description, source domain. */
export function LinkPreviewCard({ link, className }: LinkPreviewCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface-hover)] transition-colors duration-150",
        className
      )}
    >
      <div className="w-[90px] h-[90px] flex-shrink-0" style={{ background: link.imageUrl ? undefined : "var(--brand-gradient)" }}>
        {link.imageUrl && (
          <img src={link.imageUrl} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="min-w-0 px-3 py-2.5 flex flex-col justify-center">
        <p className="text-[length:var(--fs-sm)] font-semibold text-[var(--text)] leading-snug line-clamp-2 mb-1">{link.title}</p>
        {link.description && (
          <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)] line-clamp-1 mb-1">{link.description}</p>
        )}
        <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)]">{link.domain}</p>
      </div>
    </a>
  );
}
