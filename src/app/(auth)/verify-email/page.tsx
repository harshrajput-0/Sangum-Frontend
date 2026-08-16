import type { Metadata } from "next";
import { VerifyEmailShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Verify your email | Sangum",
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string; reason?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email, reason } = await searchParams;
  return <VerifyEmailShell email={email} isPendingConflict={reason === "pending"} />;
}