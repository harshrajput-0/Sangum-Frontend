"use client";

import { Check, Circle } from "lucide-react";
import { Card } from "@/shared/components/ui";
import { VisibilityOption } from "../types";

interface VisibilityTypeSelectorProps {
  options: VisibilityOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function VisibilityTypeSelector({
  options,
  selectedId,
  onSelect,
}: VisibilityTypeSelectorProps) {
  return (
    <Card>
      <p className="mb-4 text-sm font-semibold text-text">Community Type &amp; Visibility</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                "rounded-lg border p-3 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border-strong",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <Circle
                  size={15}
                  className={isSelected ? "text-primary-light" : "text-text-muted"}
                />
                <span
                  className={[
                    "text-sm",
                    isSelected ? "font-medium text-text" : "text-text-secondary",
                  ].join(" ")}
                >
                  {option.label}
                </span>
                {isSelected && <Check size={14} className="ml-auto text-success" />}
              </div>
              <p className="mt-1.5 text-xs text-text-muted">{option.description}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}