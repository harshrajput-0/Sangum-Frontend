import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Google({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
      {...props}
    >
      <path d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.41 3.62v3.01h3.9c2.28-2.1 3.54-5.2 3.54-8.66ZM12 24c3.24 0 5.95-1.08 7.96-2.93l-3.9-3.01c-1.08.73-2.46 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.24v3.11C3.24 21.3 7.28 24 12 24ZM5.27 14.26a7.2 7.2 0 0 1 0-4.52V6.63H1.24a11.98 11.98 0 0 0 0 10.74l4.03-3.11ZM12 4.77c1.77 0 3.35.61 4.6 1.8l3.46-3.46C17.94 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.24 6.63l4.03 3.11C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
  );
}
