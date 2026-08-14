import type { Metadata } from "next";
import { CompleteEmailShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Complete your account | Sangum",
};

export default function CompleteEmailPage() {
  return <CompleteEmailShell />;
}