"use client";

interface MenuItemProps {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

export function MenuItem({ label, onClick, variant = "default" }: MenuItemProps) {
  const colorClasses =
    variant === "danger"
      ? "text-danger hover:bg-danger-bg hover:text-danger-hover"
      : "text-text-secondary hover:bg-surface-hover hover:text-text";

  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`block w-full rounded-sm border-none bg-transparent px-(--sp-3) py-2.25 text-left font-sans text-base transition-colors duration-120 ease-brand ${colorClasses}`}
    >
      {label}
    </button>
  );
}