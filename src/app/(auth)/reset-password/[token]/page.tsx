import type { Metadata } from "next";
import { ResetPasswordShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset password | Sangum",
};

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = await params;
  return <ResetPasswordShell token={token} />;
}