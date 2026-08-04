import type { Metadata } from "next";
import { RegisterShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create your account | Sangum",
};

export default function RegisterPage() {
  return <RegisterShell />;
}