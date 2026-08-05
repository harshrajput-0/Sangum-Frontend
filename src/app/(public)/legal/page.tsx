import LegalHubPage from "@/features/legal/LegalHubPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Center | Sangum",
  description:
    "Access Sangum's legal policies, community standards, and intellectual property guidelines.",
};

export default function Page() {
    return <LegalHubPage />
}