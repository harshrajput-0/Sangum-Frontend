import type { Metadata } from "next";
import { ForgotPasswordShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Forgot password | Sangum",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordShell />;
}