import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function X({ size = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="X"
      {...props}
    >
      <path d="M18.24 2h3.3l-7.2 8.24L22.8 22h-6.9l-5.4-7.06L4.2 22H.9l7.7-8.8L.5 2h7.06l4.88 6.45L18.24 2Zm-1.16 18.17h1.83L7.02 3.72H5.06l12.02 16.45Z" />
    </svg>
  );
}
