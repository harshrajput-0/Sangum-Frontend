import ArticleLayout, { type ArticleData } from "./components/ArticleLayout";

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex items-start gap-2.5 rounded-md border border-info/25 bg-info/5 p-3.5">
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 shrink-0 text-info"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
    <p className="text-sm leading-relaxed text-text-secondary">{children}</p>
  </div>
);

const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2.5 rounded-md border border-warning/25 bg-warning/5 p-3.5">
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentCoDue to unexpected capacity constraints, Claude is unable to respond to your message. Please try again soon. For higher limits, lor"
      strokeWidth="2"
      className="mt-0.5 shrink-0 text-warning"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
    <p className="text-sm leading-relaxed text-text-secondary">{children}</p>
  </div>
);

const P = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <p className={`text-md leading-relaxed text-text-secondary ${className}`}>{children}</p>
);

const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="mb-2 text-base font-semibold text-text">
    {children}
  </h3>
);

const termsOfServiceData: ArticleData = {
  eyebrow: "Legal",
  title: "Terms of Service",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <P className="mb-6">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of Sangum,
            including our website, applications, and related services (collectively, the
            &quot;Platform&quot;). By creating an account or otherwise using the Platform, you
            agree to be bound by these Terms.
          </P>
          <H3 id="about-sangum">1.1 About Sangum</H3>
          <P className="mb-6">
            Sangum is a community platform where developers can create and join communities,
            share posts and resources, and connect with other members around shared interests.
          </P>
          <H3 id="acceptance-of-terms">1.2 Acceptance of Terms</H3>
          <P>
            If you do not agree to these Terms, you must not access or use the Platform. We may
            update these Terms from time to time as described in Section 10, and your continued
            use of the Platform after changes take effect constitutes acceptance of the revised
            Terms.
          </P>
        </>
      ),
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      content: (
        <P>
          You must be at least 13 years old to use Sangum. By using the Platform, you represent
          that you meet this requirement and that you have the legal capacity to enter into these
          Terms. If you are using Sangum on behalf of an organization, you represent that you
          have the authority to bind that organization to these Terms.
        </P>
      ),
    },
    {
      id: "your-account",
      title: "3. Your Sangum Account",
      content: (
        <>
          <H3 id="account-information">3.1 Account Information</H3>
          <P className="mb-6">
            When you create an account, you agree to provide accurate and complete information
            and to keep it up to date. You are responsible for all activity that occurs under
            your account.
          </P>
          <H3 id="account-security">3.2 Account Security</H3>
          <P className="mb-6">
            You are responsible for maintaining the confidentiality of your password and for
            restricting access to your account. Please notify us immediately if you become aware
            of any unauthorized use of your account.
          </P>
          <H3 id="account-termination">3.3 Account Termination</H3>
          <P>
            You may delete your account at any time from your account settings. We may suspend
            or terminate your account if you violate these Terms or if we reasonably believe your
            account poses a risk to Sangum or other users.
          </P>
        </>
      ),
    },
    {
      id: "user-content",
      title: "4. User Content",
      content: (
        <>
          <P className="mb-4">
            You retain ownership of any content you post, share, or otherwise make available on
            Sangum (&quot;User Content&quot;). By posting User Content, you grant Sangum a
            worldwide, non-exclusive, royalty-free license to host, store, reproduce, and display
            that content solely for the purpose of operating and improving the Platform.
          </P>
          <InfoBox>
            You&apos;re always free to remove your own content, and doing so will end the license
            granted above, except where a copy has been shared elsewhere by other users prior to
            removal.
          </InfoBox>
          <P>
            You are solely responsible for the content you post and confirm that you have the
            necessary rights to share it.
          </P>
        </>
      ),
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable Use",
      content: (
        <>
          <P className="mb-3">When using Sangum, you agree not to:</P>
          <ul className="mb-4 list-disc space-y-1.5 pl-5 text-md leading-relaxed text-text-secondary">
            <li>Post content that is unlawful, harassing, defamatory, or infringes on the rights of others</li>
            <li>Impersonate any person or entity, or misrepresent your affiliation</li>
            <li>Attempt to gain unauthorized access to other accounts or Platform systems</li>
            <li>Use the Platform to distribute malware, spam, or unsolicited advertising</li>
            <li>Interfere with or disrupt the integrity or performance of the Platform</li>
          </ul>
          <P>We may remove content or restrict access for any account that violates this section.</P>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      content: (
        <P>
          The Sangum name, logo, and Platform design are the property of Sangum and may not be
          used without our prior written permission. Except for User Content, all other content
          on the Platform, including text, graphics, and software, is owned by or licensed to
          Sangum and protected by applicable intellectual property laws.
        </P>
      ),
    },
    {
      id: "third-party-services",
      title: "7. Third-Party Services",
      content: (
        <P>
          The Platform may contain links to third-party websites or integrate with third-party
          services. Sangum does not control and is not responsible for the content, policies, or
          practices of any third party. Your use of any third-party service is subject to that
          party&apos;s own terms.
        </P>
      ),
    },
    {
      id: "disclaimers",
      title: "8. Disclaimers",
      content: (
        <P>
          The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis
          without warranties of any kind, whether express or implied. Sangum does not warrant
          that the Platform will be uninterrupted, secure, or error-free, or that any content is
          accurate or reliable.
        </P>
      ),
    },
    {
      id: "limitation-of-liability",
      title: "9. Limitation of Liability",
      content: (
        <>
          <P className="mb-4">
            To the fullest extent permitted by law, Sangum shall not be liable for any indirect,
            incidental, special, or consequential damages arising out of or related to your use
            of the Platform, even if advised of the possibility of such damages.
          </P>
          <WarningBox>
            Some jurisdictions do not allow the exclusion of certain warranties or the limitation
            of certain damages, so some of the above limitations may not apply to you.
          </WarningBox>
        </>
      ),
    },
    {
      id: "changes-to-terms",
      title: "10. Changes to These Terms",
      content: (
        <P>
          We may revise these Terms from time to time. If we make material changes, we will
          provide notice through the Platform or by other reasonable means before the changes
          take effect. Your continued use of Sangum after changes become effective constitutes
          your acceptance of the revised Terms.
        </P>
      ),
    },
    {
      id: "contact",
      title: "11. Contact",
      content: (
        <P>
          If you have any questions about these Terms, please reach out to us through the support
          channels listed on the Platform.
        </P>
      ),
    },
  ],
};

/** Route: /legal/terms-of-service — just wires the article data into the layout. */
export default function TermsOfServicePage() {
  return <ArticleLayout data={termsOfServiceData} />;
}