import Image from "next/image";

interface AvatarProps {
  label: string;
  imageUrl?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
  className?: string;
}

const sizeMap: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "h-8 w-8 text-xs",
  sm: "h-9 w-9 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg sm:h-20 sm:w-20 sm:text-xl",
};

const toneMap: Record<NonNullable<AvatarProps["tone"]>, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-neutral",
};

export function Avatar({
  label,
  imageUrl,
  size = "md",
  shape = "circle",
  tone = "primary",
  className = "",
}: AvatarProps) {
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-xl";

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center font-semibold text-text-on-primary",
        sizeMap[size],
        shapeClass,
        !imageUrl && toneMap[tone],
        "overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={label} fill className="object-cover" />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}