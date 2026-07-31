interface GradientBannerProps {
  height?: "sm" | "md" | "lg";
  gradientClassName?: string;
  className?: string;
}

const heightMap: Record<NonNullable<GradientBannerProps["height"]>, string> = {
  sm: "h-16",
  md: "h-20 sm:h-28",
  lg: "h-16 rounded-lg",
};

export function GradientBanner({
  height = "sm",
  gradientClassName = "from-primary to-info",
  className = "",
}: GradientBannerProps) {
  return (
    <div
      className={[
        "bg-gradient-to-br",
        heightMap[height],
        gradientClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}