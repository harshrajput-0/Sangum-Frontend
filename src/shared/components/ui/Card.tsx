import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export function Card({
  padded = true,
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-border bg-surface shadow-xs",
        padded ? "p-5" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
