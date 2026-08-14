import type { Metadata } from "next";
import { OAuthCallbackShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Signing you in | Sangum",
};

export default function OAuthCallbackPage() {
  return <OAuthCallbackShell />;
}