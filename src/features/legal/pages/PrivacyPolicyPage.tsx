import ArticleLayout, { type ArticleData } from "../components/ArticleLayout";
import { InfoBox, WarningBox, P, H3, UL } from "../components/LegalContent";

const privacyPolicyData: ArticleData = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <P>
          This Privacy Policy explains how Sangum collects, uses, discloses, and safeguards your
          information when you use our Platform. By using Sangum, you agree to the collection and
          use of information in accordance with this policy.
        </P>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <H3 id="information-you-provide">2.1 Information You Provide</H3>
          <P className="mb-4">
            When you create an account, we collect information such as your name, email address,
            username, and password. We also collect any content you choose to post, such as
            community posts, comments, and profile details.
          </P>
          <H3 id="information-collected-automatically">2.2 Information Collected Automatically</H3>
          <P>
            We automatically collect certain information when you use the Platform, including your
            IP address, browser type, device information, pages visited, and the dates and times of
            your visits.
          </P>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Your Information",
      content: (
        <>
          <P className="mb-3">We use the information we collect to:</P>
          <UL className="mb-4">
            <li>Provide, operate, and maintain the Platform</li>
            <li>Personalize your experience and remember your preferences</li>
            <li>Communicate with you about updates, security alerts, and support</li>
            <li>Monitor and analyze usage to improve the Platform</li>
            <li>Detect, prevent, and address fraud, abuse, and security issues</li>
          </UL>
        </>
      ),
    },
    {
      id: "sharing-of-information",
      title: "4. Sharing of Information",
      content: (
        <>
          <P className="mb-4">
            We do not sell your personal information. We may share information with third-party
            service providers who help us operate the Platform (such as hosting and analytics
            providers), and only to the extent necessary for them to perform their services.
          </P>
          <InfoBox>
            We may also disclose information if required to do so by law, or in good faith belief
            that such action is necessary to comply with a legal obligation or protect the rights
            and safety of Sangum or our users.
          </InfoBox>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "5. Data Retention",
      content: (
        <P>
          We retain your personal information for as long as your account is active or as needed
          to provide you services, comply with legal obligations, resolve disputes, and enforce our
          agreements.
        </P>
      ),
    },
    {
      id: "data-security",
      title: "6. Data Security",
      content: (
        <>
          <P className="mb-4">
            We implement reasonable technical and organizational measures designed to protect your
            information from unauthorized access, alteration, disclosure, or destruction.
          </P>
          <WarningBox>
            No method of transmission over the internet or electronic storage is 100% secure, and
            we cannot guarantee absolute security.
          </WarningBox>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "7. Your Rights and Choices",
      content: (
        <P>
          Depending on your location, you may have the right to access, correct, delete, or export
          your personal information. You can update most account information directly in your
          settings, or contact us to exercise these rights.
        </P>
      ),
    },
    {
      id: "childrens-privacy",
      title: "8. Children's Privacy",
      content: (
        <P>
          Sangum is not directed to children under 13, and we do not knowingly collect personal
          information from children under 13. If you believe a child has provided us with personal
          information, please contact us so we can take appropriate action.
        </P>
      ),
    },
    {
      id: "changes-to-policy",
      title: "9. Changes to This Policy",
      content: (
        <P>
          We may update this Privacy Policy from time to time. If we make material changes, we
          will notify you through the Platform or by other reasonable means before the changes take
          effect.
        </P>
      ),
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content: (
        <P>
          If you have questions about this Privacy Policy or how we handle your information, please
          reach out through the support channels listed on the Platform.
        </P>
      ),
    },
  ],
};

/** Route: /legal/privacy-policy — just wires the article data into the layout. */
export function PrivacyPolicyPage() {
  return <ArticleLayout data={privacyPolicyData} />;
}