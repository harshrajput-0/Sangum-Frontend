// modules/posts/components/PostMedia.tsx

import { PlayCircleIcon } from "./icons";
import { cn } from "@/shared/utils/cn";
import type { PostMediaItem, PostType } from "../types/types";

export interface PostMediaProps {
  type: Extract<PostType, "image" | "video">;
  media: PostMediaItem[];
  /** Called on click — wire this up to open a lightbox / video player. */
  onClick?: () => void;
  className?: string;
}

/** Renders the video poster (with a play overlay) or the image grid for a post. Caps the visible grid at 4 tiles, with a "+N" badge on the last one if there are more. */
export function PostMedia({ type, media, onClick, className }: PostMediaProps) {
  if (!media || media.length === 0) return null;

  if (type === "video") {
    const poster = media[0];
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative block w-full h-[220px] rounded-[var(--radius-md)] overflow-hidden bg-[var(--surface-2)] group",
          className
        )}
      >
        {poster.url ? (
          <img src={poster.url} alt={poster.alt ?? ""} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: "var(--brand-gradient)" }} />
        )}
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors duration-150 group-hover:bg-black/35">
          <PlayCircleIcon className="w-14 h-14 text-white drop-shadow" />
        </div>
      </button>
    );
  }

  return <ImageGrid media={media} onClick={onClick} className={className} />;
}

function ImageGrid({ media, onClick, className }: { media: PostMediaItem[]; onClick?: () => void; className?: string }) {
  const count = media.length;

  if (count === 1) {
    return <Tile item={media[0]} onClick={onClick} className={cn("h-[220px]", className)} />;
  }

  if (count === 2) {
    return (
      <div className={cn("grid grid-cols-2 gap-1 h-[180px]", className)}>
        <Tile item={media[0]} onClick={onClick} className="h-full" />
        <Tile item={media[1]} onClick={onClick} className="h-full" />
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className={cn("grid grid-cols-2 gap-1 h-[220px]", className)}>
        <Tile item={media[0]} onClick={onClick} className="h-full" />
        <div className="grid grid-rows-2 gap-1 h-full">
          <Tile item={media[1]} onClick={onClick} className="h-full" />
          <Tile item={media[2]} onClick={onClick} className="h-full" />
        </div>
      </div>
    );
  }

  const overflow = count - 4;
  return (
    <div className={cn("grid grid-cols-2 grid-rows-2 gap-1 h-[220px]", className)}>
      {media.slice(0, 4).map((item, i) => (
        <Tile
          key={item.url + i}
          item={item}
          onClick={onClick}
          className="h-full"
          overlayCount={i === 3 && overflow > 0 ? overflow : undefined}
        />
      ))}
    </div>
  );
}

function Tile({
  item,
  onClick,
  className,
  overlayCount,
}: {
  item: PostMediaItem;
  onClick?: () => void;
  className?: string;
  overlayCount?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-2)]", className)}
    >
      <img src={item.url} alt={item.alt ?? ""} className="w-full h-full object-cover" />
      {overlayCount !== undefined && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-[length:var(--fs-lg)]">
          +{overlayCount}
        </div>
      )}
    </button>
  );
}
