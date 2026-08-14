import type { Metadata } from "next";
import { LoginShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Log in | Sangum",
};

interface LoginPageProps {
  searchParams: Promise<{ verified?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { verified, error } = await searchParams;
  return <LoginShell verified={verified} error={error} />;
}