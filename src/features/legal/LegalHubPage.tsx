import LegalHub, { type LegalHubGroup } from "./components/LegalHubShell";
import {
  FileText,
  ShieldCheck,
  Cookie,
  TriangleAlert,
  Users,
  FileCheck2,
  Flag,
//   Copyright,
//   Scale,
//   BadgeCheck,
} from "lucide-react";

// Shared so every icon in the hub renders at the same size/weight.
const iconProps = { size: 17, strokeWidth: 1.75 };

const legalGroups: LegalHubGroup[] = [
  {
    title: "Terms & Policies",
    links: [
      {
        href: "/legal/terms-of-service",
        title: "Terms of Service",
        description: "The rules and guidelines for using Sangum and our platform.",
        icon: <FileText {...iconProps} />,
      },
      {
        href: "/legal/privacy-policy",
        title: "Privacy Policy",
        description: "How we collect, use, and protect your personal information.",
        icon: <ShieldCheck {...iconProps} />,
      },
      {
        href: "/legal/cookie-policy",
        title: "Cookie Policy",
        description: "Learn about the cookies we use and how to manage your choices.",
        icon: <Cookie {...iconProps} />,
      },
      {
        href: "/legal/disclaimer",
        title: "Disclaimer",
        description: "Information provided on Sangum is for general purposes only.",
        icon: <TriangleAlert {...iconProps} />,
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        href: "/legal/community-guidelines",
        title: "Community Guidelines",
        description: "Standards for respectful and constructive participation.",
        icon: <Users {...iconProps} />,
      },
      {
        href: "/legal/content-policy",
        title: "Content Policy",
        description: "What kinds of content are and aren't allowed on Sangum.",
        icon: <FileCheck2 {...iconProps} />,
      },
      {
        href: "/legal/reporting-policy",
        title: "Reporting Policy",
        description: "How to report content or behavior that violates our rules.",
        icon: <Flag {...iconProps} />,
      },
    ],
  },
//   {
//     title: "Copyright",
//     links: [
//       {
//         href: "/legal/copyright-policy",
//         title: "Copyright Policy",
//         description: "How we handle copyrighted material shared on the platform.",
//         icon: <Copyright {...iconProps} />,
//       },
//       {
//         href: "/legal/dmca-policy",
//         title: "DMCA Policy",
//         description: "Our process for responding to takedown notices.",
//         icon: <Scale {...iconProps} />,
//       },
//       {
//         href: "/legal/trademark-policy",
//         title: "Trademark Policy",
//         description: "Guidelines for using the Sangum name and brand assets.",
//         icon: <BadgeCheck {...iconProps} />,
//       },
//     ],
//   },
];

/** Route: /legal — just wires the hub groups into LegalHub. */
export default function LegalHubPage() {
  return <LegalHub groups={legalGroups} />;
}