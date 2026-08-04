import {
  AlertTriangle,
  ClipboardCheck,
  Cookie,
  FileText,
  Flag,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import type { LegalHubGroup } from "../legal.types";

export const legalHubGroups: LegalHubGroup[] = [
  {
    id: "terms-policies",
    label: "Terms & Policies",
    items: [
      {
        id: "terms-of-service",
        title: "Terms of Service",
        description: "The rules and guidelines for using Sangum and our platform.",
        icon: FileText,
      },
      {
        id: "privacy-policy",
        title: "Privacy Policy",
        description: "How we collect, use, and protect your personal information.",
        icon: Shield,
      },
      {
        id: "cookie-policy",
        title: "Cookie Policy",
        description: "Learn about the cookies we use and how to manage your choices.",
        icon: Cookie,
      },
      {
        id: "disclaimer",
        title: "Disclaimer",
        description: "Information provided on Sangum is for general purposes only.",
        icon: AlertTriangle,
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    items: [
      {
        id: "community-guidelines",
        title: "Community Guidelines",
        description: "Standards for respectful and constructive participation.",
        icon: Users,
      },
      {
        id: "content-policy",
        title: "Content Policy",
        description: "What kinds of content are and aren't allowed on Sangum.",
        icon: ClipboardCheck,
      },
      {
        id: "reporting-policy",
        title: "Reporting Policy",
        description: "How to report content or behavior that violates our rules.",
        icon: Flag,
      },
    ],
  },
  {
    id: "copyright",
    label: "Copyright",
    items: [
      {
        id: "copyright-policy",
        title: "Copyright Policy",
        description: "How we handle copyrighted material shared on the platform.",
        iconGlyph: "©",
      },
      {
        id: "dmca-policy",
        title: "DMCA Policy",
        description: "Our process for responding to takedown notices.",
        icon: Scale,
      },
      {
        id: "trademark-policy",
        title: "Trademark Policy",
        description: "Guidelines for using the Sangum name and brand assets.",
        iconGlyph: "™",
      },
    ],
  },
];