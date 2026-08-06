import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function YouTube({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YouTube"
      {...props}
    >
      <path d="M23.5 6.19a2.98 2.98 0 0 0-2.1-2.11C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.58a2.98 2.98 0 0 0-2.1 2.11A31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 2.98 2.98 0 0 0 2.1 2.11c1.9.58 9.4.58 9.4.58s7.5 0 9.4-.58a2.98 2.98 0 0 0 2.1-2.11c.33-1.9.5-3.85.5-5.81a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  );
}
