import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  /** Login/Register/Reset use 400px; Verify Email uses 420px in the source design. */
  maxWidthClassName?: string;
  align?: "left" | "center";
}

export function AuthCard({
  children,
  maxWidthClassName = "max-w-[400px]",
  align = "left",
}: AuthCardProps) {
  return (
    <div className={`w-full ${maxWidthClassName} ${align === "center" ? "text-center" : ""}`}>
      {children}
    </div>
  );
}