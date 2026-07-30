"use client";

import { useState, useRef, type SyntheticEvent } from "react";

/* ============================================================
   MEDIA TYPES
   ============================================================ */

interface ImageMedia {
  type: "image";
  src: string;
  alt: string;
  /** Optional intrinsic size — pass if known to avoid layout shift while loading */
  width?: number;
  height?: number;
}

interface VideoMedia {
  type: "video";
  src: string;
  poster?: string;
  width?: number;
  height?: number;
}

interface GifMedia {
  type: "gif";
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

type CarouselItem = ImageMedia | VideoMedia;

interface CarouselMedia {
  type: "carousel";
  items: CarouselItem[];
}

export type PostMedia = ImageMedia | VideoMedia | GifMedia | CarouselMedia;

/* ============================================================
   POST CONTENT PROPS
   ------------------------------------------------------------
   At least one of `text` / `media` is required — TS will error
   if you pass neither.
   ============================================================ */

type PostContentProps =
  | { text: string; media?: PostMedia; className?: string }
  | { text?: string; media: PostMedia; className?: string };

/**
 * PostContent
 * -------------------------------------------------------------------------
 * Renders a post's text and/or media block. At least one of `text` or
 * `media` must be supplied (enforced at the type level).
 *
 * Media adapts to its own aspect ratio the way LinkedIn's feed does:
 * the frame reserves the image/video's natural aspect ratio (no layout
 * shift once dimensions are known) and caps overall height so a very
 * tall/portrait asset doesn't dominate the feed, while a wide/landscape
 * asset fills the card edge-to-edge.
 *
 * Relies entirely on the semantic tokens in global.css
 * (--color-surface, --color-border, --color-text, --radius-lg, etc.)
 * via Tailwind utilities — no hard-coded colors.
 */
export default function PostContent({ text, media, className = "" }: PostContentProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {text && (
        <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-text">
          {text}
        </p>
      )}
      {media && <MediaFrame media={media} />}
    </div>
  );
}

/* ============================================================
   MEDIA FRAME — dispatches to the right renderer per media type
   ============================================================ */

const MAX_HEIGHT = 552; // LinkedIn-style feed media cap, in px

function MediaFrame({ media }: { media: PostMedia }) {
  if (media.type === "carousel") {
    return <Carousel items={media.items} />;
  }

  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-surface"
      style={{ maxHeight: MAX_HEIGHT }}
    >
      <MediaItemView item={media} />
    </div>
  );
}

/* ============================================================
   SINGLE MEDIA ITEM — image / video / gif
   ------------------------------------------------------------
   Uses `aspect-ratio` (from known dimensions, or measured on
   load) so the box never taller than MAX_HEIGHT, and never
   crops the asset (object-fit: contain), matching LinkedIn's
   "show the whole image, letterbox if needed" behavior.
   ============================================================ */

function MediaItemView({ item }: { item: ImageMedia | VideoMedia | GifMedia }) {
  const [ratio, setRatio] = useState<number | undefined>(
    item.width && item.height ? item.width / item.height : undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) setRatio(naturalWidth / naturalHeight);
  };

  const handleVideoLoad = (e: SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = e.currentTarget;
    if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto flex w-full items-center justify-center bg-dbg"
      style={{
        aspectRatio: ratio ?? 16 / 9,
        maxHeight: MAX_HEIGHT,
      }}
    >
      {item.type === "image" || item.type === "gif" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.alt}
          onLoad={handleImageLoad}
          className="h-full w-full object-contain"
          draggable={false}
        />
      ) : (
        <video
          src={item.src}
          poster={item.poster}
          onLoadedMetadata={handleVideoLoad}
          controls
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}

/* ============================================================
   CAROUSEL — swipeable, snap-scrolling, with dot indicators
   ============================================================ */

function Carousel({ items }: { items: CarouselItem[] }) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ left: scroller.clientWidth * index, behavior: "smooth" });
    setActive(index);
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActive(index);
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-lg border border-border bg-surface"
      >
        {items.map((item, i) => (
          <div key={i} className="w-full shrink-0 snap-center" style={{ maxHeight: MAX_HEIGHT }}>
            <MediaItemView item={item} />
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <div className="absolute right-3 top-3 rounded-full bg-(--overlay) px-2 py-0.5 text-xs font-medium text-dtext">
            {active + 1}/{items.length}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className="h-1.5 rounded-full transition-all duration-(--t-fast)"
                style={{
                  width: i === active ? 16 : 6,
                  backgroundColor: i === active ? "var(--primary)" : "var(--border-strong)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   USAGE EXAMPLE
   ------------------------------------------------------------
   // Text + image (matches the shipped-feature screenshot)
   <PostContent
     text="Just shipped a new feature for resource collections. Would love your feedback! 🚀"
     media={{
       type: "image",
       src: "/preview.png",
       alt: "Feature preview",
       width: 1200,
       height: 400,
     }}
   />

   // Text only
   <PostContent text="No media here — just thoughts." />

   // Media only, portrait video
   <PostContent
     media={{
       type: "video",
       src: "/demo.mp4",
       poster: "/demo-poster.jpg",
     }}
   />

   // Carousel of images
   <PostContent
     text="Swipe through the redesign →"
     media={{
       type: "carousel",
       items: [
         { type: "image", src: "/slide-1.png", alt: "Slide 1" },
         { type: "image", src: "/slide-2.png", alt: "Slide 2" },
         { type: "image", src: "/slide-3.png", alt: "Slide 3" },
       ],
     }}
   />
   ============================================================ */