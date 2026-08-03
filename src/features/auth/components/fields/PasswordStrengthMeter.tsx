import {
  PASSWORD_STRENGTH_BAR_COUNT,
  PASSWORD_STRENGTH_META,
} from "../../constants/auth.constants";

interface PasswordStrengthMeterProps {
  score: number;
  /** Register hides the label; Reset Password shows it. */
  showLabel?: boolean;
  barsSpacingClassName?: string;
  labelSpacingClassName?: string;
}

export function PasswordStrengthMeter({
  score,
  showLabel = true,
  barsSpacingClassName = "mb-1.5",
  labelSpacingClassName = "mb-4",
}: PasswordStrengthMeterProps) {
  const meta = PASSWORD_STRENGTH_META[score] ?? PASSWORD_STRENGTH_META[0];

  return (
    <>
      <div className={`flex gap-1.5 ${barsSpacingClassName}`}>
        {Array.from({ length: PASSWORD_STRENGTH_BAR_COUNT }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index < score ? meta.barColorClass : "bg-neutral-bg"
            }`}
          />
        ))}
      </div>
      {showLabel && meta.label && (
        <p className={`text-xs font-medium ${labelSpacingClassName} ${meta.textColorClass}`}>
          {meta.label}
        </p>
      )}
    </>
  );
}