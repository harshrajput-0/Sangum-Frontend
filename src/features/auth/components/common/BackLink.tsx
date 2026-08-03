import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AUTH_ROUTES } from "../../constants/auth.constants";

interface BackLinkProps {
  href?: string;
  label?: string;
  spacingClassName?: string;
}

export function BackLink({
  href = AUTH_ROUTES.login,
  label = "Back to log in",
  spacingClassName = "mb-5",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 text-xs font-medium text-primary-light hover:underline ${spacingClassName}`}
    >
      <ArrowLeft size={13} strokeWidth={2} />
      {label}
    </Link>
  );
}