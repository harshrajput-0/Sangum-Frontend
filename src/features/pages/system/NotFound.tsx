"use client";

import { ErrorState } from "@/features/pages/system/components/ErrorState"
import { usePageTitle } from "@/shared/hooks/usePageTitle";


const NotFound = () => {
  usePageTitle("404 - Page not found")
  return (
    <ErrorState variant="crash" code={404} title="Page not found" message="Looks like you've taken a wrong turn" size="lg" />
  )
}

export default NotFound