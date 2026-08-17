'use client';

import { ReactNode } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { useRequireAuth } from "@/features/auth";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAllowed } = useRequireAuth();

  // isAllowed is false only while an unauthenticated visitor's
  // redirect to /login is in flight — render nothing rather than
  // flash protected content for a tick.
  if (!isAllowed) return null;

  return <AppLayout>{children}</AppLayout>; 
}