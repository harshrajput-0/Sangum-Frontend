import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Shield,
  Cookie,
  AlertTriangle,
  Users,
  ClipboardCheck,
  Flag,
  Copyright,
  Scale,
  BadgeCheck,
} from "lucide-react";

/* ---------------------------------- Types --------------------------------- */

export type LegalGroupId = "terms-and-policies" | "community" | "copyright";

export interface LegalGroup {
  id: LegalGroupId;
  label: string;
}

export interface LegalDocSummary {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  group: LegalGroupId;
}

/**
 * A section's body is an ordered list of blocks rather than separate
 * "paragraphs" / "callouts" / "subheadings" arrays. Legal copy interleaves
 * these freely (paragraph, then a callout, then another paragraph), so a
 * single ordered stream is the only shape that represents that without the
 * rendering layer guessing at order.
 */
export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; variant: "info" | "warning"; text: string }
  | { type: "subheading"; id: string; text: string };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument extends LegalDocSummary {
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalGroupWithDocs extends LegalGroup {
  documents: LegalDocSummary[];
}

/* ---------------------------------- Data ----------------------------------- */

export const legalGroups: LegalGroup[] = [
  { id: "terms-and-policies", label: "Terms & Policies" },
  { id: "community", label: "Community" },
  { id: "copyright", label: "Copyright" },
];

/**
 * Wires up routing/TOC/layout for a document before real legal copy exists.
 * Swap the `sections` for the real content when it's ready — nothing else
 * needs to change.
 */
function placeholderDocument(
  summary: Omit<LegalDocument, "lastUpdated" | "sections">
): LegalDocument {
  return {
    ...summary,
    lastUpdated: "Pending",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [{ type: "paragraph", text: `${summary.title} content is coming soon.` }],
      },
    ],
  };
}

export const legalDocuments: LegalDocument[] = [

// =====[ PRIVACY POLICY ]---------------------------------------------------------------
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description: "The rules and guidelines for using Sangum and our platform.",
    icon: FileText,
    group: "terms-and-policies",
    lastUpdated: "August 1, 2026",
    sections: [
      {
        id: "introduction",
        heading: "1. Introduction",
        blocks: [
          {
            type: "paragraph",
            text: 'These Terms of Service ("Terms") govern your access to and use of Sangum, including our website, applications, and related services (collectively, the "Platform"). By creating an account or otherwise using the Platform, you agree to be bound by these Terms.',
          },
          { type: "subheading", id: "about-sangum", text: "1.1 About Sangum" },
          {
            type: "paragraph",
            text: "Sangum is a community platform where developers can create and join communities, share posts and resources, and connect with other members around shared interests.",
          },
          { type: "subheading", id: "acceptance-of-terms", text: "1.2 Acceptance of Terms" },
          {
            type: "paragraph",
            text: "If you do not agree to these Terms, you must not access or use the Platform. We may update these Terms from time to time as described in Section 10, and your continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.",
          },
        ],
      },
      {
        id: "eligibility",
        heading: "2. Eligibility",
        blocks: [
          {
            type: "paragraph",
            text: "You must be at least 13 years old to use Sangum. By using the Platform, you represent that you meet this requirement and that you have the legal capacity to enter into these Terms. If you are using Sangum on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.",
          },
        ],
      },
      {
        id: "your-account",
        heading: "3. Your Sangum Account",
        blocks: [
          { type: "subheading", id: "account-information", text: "3.1 Account Information" },
          {
            type: "paragraph",
            text: "When you create an account, you agree to provide accurate and complete information and to keep it up to date. You are responsible for all activity that occurs under your account.",
          },
          { type: "subheading", id: "account-security", text: "3.2 Account Security" },
          {
            type: "paragraph",
            text: "You are responsible for maintaining the confidentiality of your password and for restricting access to your account. Please notify us immediately if you become aware of any unauthorized use of your account.",
          },
          { type: "subheading", id: "account-termination", text: "3.3 Account Termination" },
          {
            type: "paragraph",
            text: "You may delete your account at any time from your account settings. We may suspend or terminate your account if you violate these Terms or if we reasonably believe your account poses a risk to Sangum or other users.",
          },
        ],
      },
      {
        id: "user-content",
        heading: "4. User Content",
        blocks: [
          {
            type: "paragraph",
            text: 'You retain ownership of any content you post, share, or otherwise make available on Sangum ("User Content"). By posting User Content, you grant Sangum a worldwide, non-exclusive, royalty-free license to host, store, reproduce, and display that content solely for the purpose of operating and improving the Platform.',
          },
          {
            type: "callout",
            variant: "info",
            text: "You're always free to remove your own content, and doing so will end the license granted above, except where a copy has been shared elsewhere by other users prior to removal.",
          },
          {
            type: "paragraph",
            text: "You are solely responsible for the content you post and confirm that you have the necessary rights to share it.",
          },
        ],
      },
      {
        id: "acceptable-use",
        heading: "5. Acceptable Use",
        blocks: [
          { type: "paragraph", text: "When using Sangum, you agree not to:" },
          {
            type: "list",
            items: [
              "Post content that is unlawful, harassing, defamatory, or infringes on the rights of others",
              "Impersonate any person or entity, or misrepresent your affiliation",
              "Attempt to gain unauthorized access to other accounts or Platform systems",
              "Use the Platform to distribute malware, spam, or unsolicited advertising",
              "Interfere with or disrupt the integrity or performance of the Platform",
            ],
          },
          {
            type: "paragraph",
            text: "We may remove content or restrict access for any account that violates this section.",
          },
        ],
      },
      {
        id: "intellectual-property",
        heading: "6. Intellectual Property",
        blocks: [
          {
            type: "paragraph",
            text: "The Sangum name, logo, and Platform design are the property of Sangum and may not be used without our prior written permission. Except for User Content, all other content on the Platform, including text, graphics, and software, is owned by or licensed to Sangum and protected by applicable intellectual property laws.",
          },
        ],
      },
      {
        id: "third-party-services",
        heading: "7. Third-Party Services",
        blocks: [
          {
            type: "paragraph",
            text: "The Platform may contain links to third-party websites or integrate with third-party services. Sangum does not control and is not responsible for the content, policies, or practices of any third party. Your use of any third-party service is subject to that party's own terms.",
          },
        ],
      },
      {
        id: "disclaimers",
        heading: "8. Disclaimers",
        blocks: [
          {
            type: "paragraph",
            text: 'The Platform is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. Sangum does not warrant that the Platform will be uninterrupted, secure, or error-free, or that any content is accurate or reliable.',
          },
        ],
      },
      {
        id: "limitation-of-liability",
        heading: "9. Limitation of Liability",
        blocks: [
          {
            type: "paragraph",
            text: "To the fullest extent permitted by law, Sangum shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the Platform, even if advised of the possibility of such damages.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Some jurisdictions do not allow the exclusion of certain warranties or the limitation of certain damages, so some of the above limitations may not apply to you.",
          },
        ],
      },
      {
        id: "changes-to-terms",
        heading: "10. Changes to These Terms",
        blocks: [
          {
            type: "paragraph",
            text: "We may revise these Terms from time to time. If we make material changes, we will provide notice through the Platform or by other reasonable means before the changes take effect. Your continued use of Sangum after changes become effective constitutes your acceptance of the revised Terms.",
          },
        ],
      },
      {
        id: "contact",
        heading: "11. Contact",
        blocks: [
          {
            type: "paragraph",
            text: "If you have any questions about these Terms, please reach out to us through the support channels listed on the Platform.",
          },
        ],
      },
    ],
  },


// =====[ PRIVACY POLICY ]---------------------------------------------------------------
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information.",
    icon: Shield,
    group: "terms-and-policies",
    lastUpdated: "August 1, 2026",
    sections: [
      {
        id: "introduction",
        heading: "1. Introduction",
        blocks: [
          {
            type: "paragraph",
            text: 'This Privacy Policy explains how Sangum ("we," "us," or "our") collects, uses, shares, and protects your personal information when you use our website, applications, and related services (collectively, the "Platform"). By using the Platform, you agree to the collection and use of information as described in this policy.',
          },
        ],
      },
      {
        id: "information-we-collect",
        heading: "2. Information We Collect",
        blocks: [
          { type: "subheading", id: "account-information", text: "2.1 Account Information" },
          {
            type: "paragraph",
            text: "When you create an account, we collect information such as your name, email address, username, and password. You may also choose to add a profile picture, bio, or other optional details.",
          },
          { type: "subheading", id: "usage-data", text: "2.2 Usage Data" },
          {
            type: "paragraph",
            text: "We automatically collect information about how you interact with the Platform, including pages visited, features used, timestamps, device type, browser type, and IP address.",
          },
          { type: "subheading", id: "cookies-and-tracking", text: "2.3 Cookies and Tracking Technologies" },
          {
            type: "paragraph",
            text: "We use cookies and similar technologies to operate the Platform, remember your preferences, and understand how the Platform is used. See our Cookie Policy for more detail.",
          },
        ],
      },
      {
        id: "how-we-use-information",
        heading: "3. How We Use Your Information",
        blocks: [
          { type: "paragraph", text: "We use the information we collect to:" },
          {
            type: "list",
            items: [
              "Provide, maintain, and improve the Platform",
              "Personalize your experience and remember your preferences",
              "Communicate with you about updates, security alerts, and support",
              "Monitor and analyze usage trends to improve performance and features",
              "Detect, prevent, and address fraud, abuse, and security issues",
            ],
          },
        ],
      },
      {
        id: "how-we-share-information",
        heading: "4. How We Share Your Information",
        blocks: [
          { type: "paragraph", text: "We do not sell your personal information. We may share information with:" },
          {
            type: "list",
            items: [
              "Service providers who perform functions on our behalf, such as hosting, analytics, and customer support",
              "Other users, to the extent you choose to make information public on the Platform",
              "Law enforcement or regulators, when required by law or to protect our rights and the safety of our users",
              "A successor entity, in connection with a merger, acquisition, or sale of assets",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "We require any third party we share data with to handle it in a manner consistent with this Privacy Policy.",
          },
        ],
      },
      {
        id: "data-retention",
        heading: "5. Data Retention",
        blocks: [
          {
            type: "paragraph",
            text: "We retain your personal information for as long as your account is active or as needed to provide the Platform. We may retain certain information for longer periods where required by law or necessary to resolve disputes and enforce our agreements.",
          },
        ],
      },
      {
        id: "your-rights",
        heading: "6. Your Rights and Choices",
        blocks: [
          {
            type: "paragraph",
            text: "Depending on your location, you may have the right to access, correct, delete, or export your personal information, and to object to or restrict certain processing. You can manage most of your account information directly from your account settings, or contact us to make a request.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Some rights may be limited where we have a legal basis to retain certain information, such as for fraud prevention or compliance with legal obligations.",
          },
        ],
      },
      {
        id: "data-security",
        heading: "7. Data Security",
        blocks: [
          {
            type: "paragraph",
            text: "We implement reasonable technical and organizational measures designed to protect your information from unauthorized access, loss, or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
          },
        ],
      },
      {
        id: "childrens-privacy",
        heading: "8. Children's Privacy",
        blocks: [
          {
            type: "paragraph",
            text: "The Platform is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.",
          },
        ],
      },
      {
        id: "international-transfers",
        heading: "9. International Data Transfers",
        blocks: [
          {
            type: "paragraph",
            text: "Your information may be transferred to, stored, and processed in countries other than your own. Where required, we take steps to ensure appropriate safeguards are in place for such transfers.",
          },
        ],
      },
      {
        id: "changes-to-policy",
        heading: "10. Changes to This Policy",
        blocks: [
          {
            type: "paragraph",
            text: "We may update this Privacy Policy from time to time. If we make material changes, we will provide notice through the Platform or by other reasonable means before the changes take effect.",
          },
        ],
      },
      {
        id: "contact",
        heading: "11. Contact Us",
        blocks: [
          {
            type: "paragraph",
            text: "If you have any questions about this Privacy Policy or how we handle your information, please reach out to us through the support channels listed on the Platform.",
          },
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "Learn about the cookies we use and how to manage your choices.",
    icon: Cookie,
    group: "terms-and-policies",
    lastUpdated: "August 1, 2026",
    sections: [
      {
        id: "introduction",
        heading: "1. Introduction",
        blocks: [
          {
            type: "paragraph",
            text: "This Cookie Policy explains how Sangum uses cookies and similar tracking technologies when you visit or use our Platform, and how you can manage your preferences.",
          },
        ],
      },
      {
        id: "what-are-cookies",
        heading: "2. What Are Cookies",
        blocks: [
          {
            type: "paragraph",
            text: "Cookies are small text files placed on your device when you visit a website. They allow the site to recognize your device and store information about your preferences or past actions.",
          },
        ],
      },
      {
        id: "types-of-cookies",
        heading: "3. Types of Cookies We Use",
        blocks: [
          { type: "subheading", id: "essential-cookies", text: "3.1 Essential Cookies" },
          {
            type: "paragraph",
            text: "These cookies are necessary for the Platform to function, such as keeping you signed in and maintaining security. The Platform cannot operate properly without them.",
          },
          { type: "subheading", id: "preference-cookies", text: "3.2 Preference Cookies" },
          {
            type: "paragraph",
            text: "These cookies remember choices you make, such as language or display settings, to provide a more personalized experience.",
          },
          { type: "subheading", id: "analytics-cookies", text: "3.3 Analytics Cookies" },
          {
            type: "paragraph",
            text: "These cookies help us understand how visitors interact with the Platform so we can measure performance and improve features over time.",
          },
          { type: "subheading", id: "marketing-cookies", text: "3.4 Marketing Cookies" },
          {
            type: "paragraph",
            text: "These cookies may be used to deliver relevant content and measure the effectiveness of communications. We only use marketing cookies where permitted and, where required, with your consent.",
          },
        ],
      },
      {
        id: "third-party-cookies",
        heading: "4. Third-Party Cookies",
        blocks: [
          {
            type: "paragraph",
            text: "Some cookies are placed by third-party services we use, such as analytics or embedded content providers. These third parties may collect information about your online activities across different websites.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Third-party cookies are governed by the respective third party's own privacy and cookie policies, not this one.",
          },
        ],
      },
      {
        id: "managing-preferences",
        heading: "5. Managing Your Cookie Preferences",
        blocks: [
          {
            type: "paragraph",
            text: "You can manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies, particularly essential cookies, may affect the functionality of the Platform.",
          },
        ],
      },
      {
        id: "changes-to-policy",
        heading: "6. Changes to This Policy",
        blocks: [
          {
            type: "paragraph",
            text: "We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for operational, legal, or regulatory reasons. Continued use of the Platform after changes take effect constitutes acceptance of the revised policy.",
          },
        ],
      },
      {
        id: "contact",
        heading: "7. Contact Us",
        blocks: [
          {
            type: "paragraph",
            text: "If you have questions about our use of cookies, please reach out to us through the support channels listed on the Platform.",
          },
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Information provided on Sangum is for general purposes only.",
    icon: AlertTriangle,
    group: "terms-and-policies",
    lastUpdated: "August 1, 2026",
    sections: [
      {
        id: "general-information",
        heading: "1. General Information",
        blocks: [
          {
            type: "paragraph",
            text: "The information provided on Sangum is for general informational purposes only. While we strive to keep information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of any content on the Platform.",
          },
        ],
      },
      {
        id: "no-professional-advice",
        heading: "2. No Professional Advice",
        blocks: [
          {
            type: "paragraph",
            text: "Content on the Platform, including posts and resources shared by users, does not constitute professional advice of any kind, including legal, financial, or technical advice. You should seek independent professional guidance before relying on any content shared on Sangum.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Any reliance you place on information from the Platform is strictly at your own risk.",
          },
        ],
      },
      {
        id: "external-links",
        heading: "3. External Links",
        blocks: [
          {
            type: "paragraph",
            text: "The Platform may contain links to third-party websites or resources that are not owned or controlled by Sangum. We have no control over, and assume no responsibility for, the content, privacy practices, or accuracy of any third-party sites.",
          },
        ],
      },
      {
        id: "accuracy-of-information",
        heading: "4. Accuracy of Information",
        blocks: [
          {
            type: "paragraph",
            text: "User-generated content reflects the views of the individual users who posted it and not necessarily those of Sangum. We do not verify or endorse user-generated content and are not responsible for its accuracy.",
          },
        ],
      },
      {
        id: "limitation-of-liability",
        heading: "5. Limitation of Liability",
        blocks: [
          {
            type: "paragraph",
            text: "To the fullest extent permitted by law, Sangum shall not be liable for any loss or damage arising from your use of, or reliance on, information provided on the Platform.",
          },
        ],
      },
      {
        id: "changes-to-disclaimer",
        heading: "6. Changes to This Disclaimer",
        blocks: [
          {
            type: "paragraph",
            text: "We may update this Disclaimer from time to time. Continued use of the Platform after changes take effect constitutes your acceptance of the revised Disclaimer.",
          },
        ],
      },
      {
        id: "contact",
        heading: "7. Contact Us",
        blocks: [
          {
            type: "paragraph",
            text: "If you have any questions about this Disclaimer, please reach out to us through the support channels listed on the Platform.",
          },
        ],
      },
    ],
  },
  // Wired end-to-end (routing, TOC, layout) — swap in real copy when it's ready.
  placeholderDocument({
    slug: "community-guidelines",
    title: "Community Guidelines",
    description: "Standards for respectful and constructive participation.",
    icon: Users,
    group: "community",
  }),
  placeholderDocument({
    slug: "content-policy",
    title: "Content Policy",
    description: "What kinds of content are and aren't allowed on Sangum.",
    icon: ClipboardCheck,
    group: "community",
  }),
  placeholderDocument({
    slug: "reporting-policy",
    title: "Reporting Policy",
    description: "How to report content or behavior that violates our rules.",
    icon: Flag,
    group: "community",
  }),
  placeholderDocument({
    slug: "copyright-policy",
    title: "Copyright Policy",
    description: "How we handle copyrighted material shared on the platform.",
    icon: Copyright,
    group: "copyright",
  }),
  placeholderDocument({
    slug: "dmca-policy",
    title: "DMCA Policy",
    description: "Our process for responding to takedown notices.",
    icon: Scale,
    group: "copyright",
  }),
  placeholderDocument({
    slug: "trademark-policy",
    title: "Trademark Policy",
    description: "Guidelines for using the Sangum name and brand assets.",
    icon: BadgeCheck,
    group: "copyright",
  }),
];

/* ------------------------------- Lookups ------------------------------ */
// Kept as async functions (even though the data is local) so pages don't
// need to change if this ever moves to a CMS/API call.

function toSummary(doc: LegalDocument): LegalDocSummary {
  const { slug, title, description, icon, group } = doc;
  return { slug, title, description, icon, group };
}

export async function getLegalGroups(): Promise<LegalGroupWithDocs[]> {
  return legalGroups.map((group) => ({
    ...group,
    documents: legalDocuments.filter((doc) => doc.group === group.id).map(toSummary),
  }));
}

export async function getLegalDocument(slug: string): Promise<LegalDocument | null> {
  return legalDocuments.find((doc) => doc.slug === slug) ?? null;
}