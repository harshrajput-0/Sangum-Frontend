import type { Metadata } from "next";
import { ResetPasswordShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset password | Sangum",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;
  return <ResetPasswordShell token={token} />;
}