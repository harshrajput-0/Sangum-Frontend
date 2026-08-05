import { cloneElement, isValidElement } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactElement, ReactNode } from "react";
import {Spinner} from "./Spinners";

export type ButtonVariant = "primary" | "secondary" | "outline" | "doutline" | "ghost" | "danger" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-primary text-text-on-primary shadow-sm hover:bg-primary-hover",
  secondary: "border-border bg-surface text-text hover:bg-surface-hover",
  outline: "border-border-strong bg-transparent text-text hover:bg-surface-hover",
  doutline: "border-dborder-strong bg-transparent text-dtext hover:bg-dsurface-hover",
  ghost: "border-transparent bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text",
  danger: "border-transparent bg-danger text-white hover:brightness-110",
  accent: "border-transparent bg-accent text-bg hover:bg-accent-hover",
};

const SIZE_BASE: Record<ButtonSize, string> = {
  sm: "gap-1.5 rounded-sm text-sm",
  md: "gap-2 rounded-md text-md",
  lg: "gap-2 rounded-md text-md",
};

const PADDING: Record<ButtonSize, string> = {
  sm: "px-2 py-1",
  md: "px-3 py-2",
  lg: "px-4 py-2.5",
};

const ICON_ONLY_PADDING: Record<ButtonSize, string> = {
  sm: "p-1.5",
  md: "p-2.5",
  lg: "p-3",
};

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button */
  loading?: boolean;
  /** Square padding for a single icon child with no label — remember to add aria-label */
  iconOnly?: boolean;
  /**
   * Render the single child element instead of a <button>, forwarding all button
   * classes/props onto it. Use this to make a next/link <Link> look like a button:
   * <Button asChild><Link href="/settings">Settings</Link></Button>
   */
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;

}

type ButtonProps = ButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  iconOnly = false,
  asChild = false,
  disabled,
  iconLeft,
  iconRight,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  const classes = [
    "inline-flex items-center justify-center whitespace-nowrap border font-semibold leading-none transition-colors duration-150 ease-brand",
    isDisabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
    SIZE_BASE[size],
    iconOnly ? ICON_ONLY_PADDING[size] : PADDING[size],
    VARIANT_CLASSES[variant],
    className,
  ].join(" ");

  // asChild forwards our classes/props onto the single child element (e.g. a <Link>)
  // instead of rendering our own <button>, so the child keeps its own tag/behavior
  // (navigation, target, etc.) while looking and disabling like a button.
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    const mergedClassName = [classes, isDisabled ? "pointer-events-none" : "", child.props.className]
      .filter(Boolean)
      .join(" ");

    return cloneElement(child, {
      ...props,
      className: mergedClassName,
      "aria-disabled": isDisabled || undefined,
      ...(isDisabled
        ? { tabIndex: -1, onClick: (e: MouseEvent) => e.preventDefault() }
        : {}),
    } as Record<string, unknown>);
  }

  return (
    <button type="button" disabled={isDisabled} className={classes} {...props}>
      {loading && <Spinner size="xs" color="current" />}
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
