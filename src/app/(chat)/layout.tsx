'use client';

import { ReactNode } from "react";
import { ChatLayout } from "@/layouts/ChatLayout";
// import { useRequireAuth } from "@/features/auth";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
//   const { isAllowed } = useRequireAuth();


//   if (!isAllowed) return null;

  return <ChatLayout>{children}</ChatLayout>; 
}