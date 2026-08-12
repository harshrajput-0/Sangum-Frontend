import type { Metadata } from "next";
import { LoginShell } from "@/features/auth/pages/LoginShell";

export const metadata: Metadata = {
  title: "Log in | Sangum",
};

export default function LoginPage() {
  return <LoginShell />;
}