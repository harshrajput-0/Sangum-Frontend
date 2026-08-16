import type { Metadata } from "next";
import { VerifyEmailTokenShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Verify your email | Sangum",
};

interface VerifyEmailTokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function VerifyEmailTokenPage({
  params,
}: VerifyEmailTokenPageProps) {
  const { token } = await params;
  return <VerifyEmailTokenShell token={token} />;
}
