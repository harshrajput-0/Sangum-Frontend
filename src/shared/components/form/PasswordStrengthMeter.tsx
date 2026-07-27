import { useMemo } from "react";


/**
 * PasswordStrengthMeter
 * ----------------------
 * Visual weak/fair/good/strong bar for a password value. Drop it under a
 * PasswordInput. Scoring is a simple placeholder heuristic — swap
 * `scorePassword` for a real library (e.g. zxcvbn) if you need something
 * more accurate.
 *
 * Usage:
 *   <PasswordStrengthMeter password={password} />
 */

export interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

type Strength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string; // CSS var reference
};

function scorePassword(password: string): Strength {
  if (!password) return { score: 0, label: "", color: "var(--border-strong)" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const clamped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;

  const levels: Record<0 | 1 | 2 | 3 | 4, Omit<Strength, "score">> = {
    0: { label: "Very weak", color: "var(--danger)" },
    1: { label: "Weak", color: "var(--danger)" },
    2: { label: "Fair", color: "var(--warning)" },
    3: { label: "Good", color: "var(--info)" },
    4: { label: "Strong", color: "var(--success)" },
  };

  return { score: clamped, ...levels[clamped] };
}

const SEGMENTS = 4;

export function PasswordStrengthMeter({ password, className }: PasswordStrengthMeterProps) {
  const strength = useMemo(() => scorePassword(password), [password]);

  return (
    <div className={className} aria-live="polite">
      <div className="mb-[6px] flex gap-(--sp-2)">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <div
            key={i}
            className="h-[4px] flex-1 rounded-[2px] transition-colors duration-200"
            style={{
              background: i < strength.score ? strength.color : "var(--surface-2)",
            }}
          />
        ))}
      </div>
      {strength.label && (
        <span
          className="text-(length:--fs-xs) font-medium"
          style={{ color: strength.color }}
        >
          {strength.label}
        </span>
      )}
    </div>
  );
}

export default PasswordStrengthMeter;
