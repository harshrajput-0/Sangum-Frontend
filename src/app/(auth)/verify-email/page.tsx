import type { Metadata } from "next";
import { VerifyEmailShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Verify your email | Sangum",
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email } = await searchParams;
  return <VerifyEmailShell email={email} />;
}