import { ReactNode, ElementType } from "react";

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  padding?: "none" | "sm" | "md";
  interactive?: boolean;
  className?: string;
}

const paddingMap: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-4 sm:p-5",
};

export function Card({
  children,
  as: Tag = "div",
  padding = "md",
  interactive = false,
  className = "",
}: CardProps) {
  return (
    <Tag
      className={[
        "rounded-xl border border-border bg-surface",
        paddingMap[padding],
        interactive &&
          "transition-all duration-base hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}