/*
* Sangum Usuage
* <Alert
*   variant="success"
*   className="shadow-lg animate-in fade-in">
*   Saved successfully.
* </Alert>
*/ 

"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info: "border-info bg-info-bg",
  success: "border-success bg-success-bg",
  warning: "border-warning bg-warning-bg",
  error: "border-danger bg-danger-bg",
};

const ICON_CLASSES: Record<AlertVariant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
};

const ICON_CONTENT: Record<AlertVariant, ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  warning: (
    <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </>
  ),
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-md border px-3.5 py-2.5",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          ICON_CLASSES[variant],
        )}
      >
        {ICON_CONTENT[variant]}
      </svg>

      <div className="flex-1 text-sm">
        {title && (
          <p className="mb-0.5 font-semibold text-text">
            {title}
          </p>
        )}
        <p className="text-text-secondary">{children}</p>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            onDismiss();
          }}
          aria-label="Dismiss"
          className="shrink-0 text-text-muted transition-colors duration-150 ease-brand hover:text-text"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}