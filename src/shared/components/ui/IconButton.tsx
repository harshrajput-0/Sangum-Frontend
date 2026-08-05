import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string; // used for aria-label + title
  size?: IconButtonSize;
}

export const ICON_BUTTON_SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12"
};

// Exported so non-button usages (e.g. an <a> for an external social link)
// can render the identical look without duplicating the button itself.
export const ICON_BUTTON_BASE_CLASSNAME =
  "inline-flex items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text";

export function IconButton({
  icon,
  label,
  size = "sm",
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        ICON_BUTTON_BASE_CLASSNAME,
        ICON_BUTTON_SIZE_CLASSES[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {icon}
    </button>
  );
}
