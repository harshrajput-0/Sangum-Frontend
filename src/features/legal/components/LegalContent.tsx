import type { ReactNode } from "react";

export const InfoBox = ({ children }: { children: ReactNode }) => (
  <div className="mb-4 flex items-start gap-2.5 rounded-md border border-info/25 bg-info/5 p-3.5">
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 shrink-0 text-info"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
    <p className="text-sm leading-relaxed text-text-secondary">{children}</p>
  </div>
);

export const WarningBox = ({ children }: { children: ReactNode }) => (
  <div className="flex items-start gap-2.5 rounded-md border border-warning/25 bg-warning/5 p-3.5">
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 shrink-0 text-warning"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
    <p className="text-sm leading-relaxed text-text-secondary">{children}</p>
  </div>
);

export const P = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <p className={`text-md leading-relaxed text-text-secondary ${className}`}>{children}</p>
);

export const H3 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h3 id={id} className="mb-2 text-base font-semibold text-text">
    {children}
  </h3>
);

export const UL = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <ul className={`list-disc space-y-1.5 pl-5 text-md leading-relaxed text-text-secondary ${className}`}>
    {children}
  </ul>
);