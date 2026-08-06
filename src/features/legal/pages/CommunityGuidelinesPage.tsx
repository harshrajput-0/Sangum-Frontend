import ArticleLayout, { type ArticleData } from "../components/ArticleLayout";
import { WarningBox, P, UL } from "../components/LegalContent";

const communityGuidelinesData: ArticleData = {
  eyebrow: "Legal",
  title: "Community Guidelines",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "our-values",
      title: "1. Our Values",
      content: (
        <P>
          Sangum exists to help developers connect, learn, and build together. These guidelines
          exist to keep that space welcoming, constructive, and safe for everyone. They apply to
          every community, post, comment, and message on the Platform.
        </P>
      ),
    },
    {
      id: "be-respectful",
      title: "2. Be Respectful",
      content: (
        <>
          <P className="mb-3">Treat other members the way you&apos;d want to be treated. This means:</P>
          <UL>
            <li>Engaging in good faith, even when you disagree</li>
            <li>Giving constructive, specific feedback rather than personal attacks</li>
            <li>Respecting differing skill levels, backgrounds, and opinions</li>
            <li>Avoiding harassment, hate speech, or discriminatory language</li>
          </UL>
        </>
      ),
    },
    {
      id: "share-responsibly",
      title: "3. Share Responsibly",
      content: (
        <>
          <P className="mb-3">When posting content, please:</P>
          <UL>
            <li>Only share content you have the rights to share</li>
            <li>Give proper credit when building on someone else&apos;s work</li>
            <li>Avoid posting spam, unsolicited promotion, or repetitive content</li>
            <li>Keep discussions relevant to the community you&apos;re posting in</li>
          </UL>
        </>
      ),
    },
    {
      id: "what-is-not-allowed",
      title: "4. What's Not Allowed",
      content: (
        <>
          <P className="mb-3">The following will result in content removal and may lead to account action:</P>
          <UL className="mb-4">
            <li>Harassment, threats, or targeted abuse of any member</li>
            <li>Impersonation of another person, brand, or organization</li>
            <li>Sharing malicious code, exploits, or content intended to cause harm</li>
            <li>Doxxing or sharing another person&apos;s private information without consent</li>
            <li>Content that is sexually explicit, violent, or illegal</li>
          </UL>
          <WarningBox>
            Repeated or severe violations of these guidelines can result in a permanent account
            ban, in addition to any content being removed.
          </WarningBox>
        </>
      ),
    },
    {
      id: "reporting-violations",
      title: "5. Reporting Violations",
      content: (
        <P>
          If you see content or behavior that violates these guidelines, please report it using the
          reporting tools available throughout the Platform. See our{" "}
          <a href="/legal/reporting-policy" className="text-primary-light underline underline-offset-2">
            Reporting Policy
          </a>{" "}
          for more details on how reports are handled.
        </P>
      ),
    },
    {
      id: "enforcement",
      title: "6. Enforcement",
      content: (
        <P>
          Sangum reviews reported content and behavior against these guidelines and may take
          action ranging from a warning to content removal to account suspension or termination,
          depending on the severity and frequency of the violation.
        </P>
      ),
    },
    {
      id: "changes",
      title: "7. Changes to These Guidelines",
      content: (
        <P>
          We may update these Community Guidelines from time to time as our community grows. We
          encourage you to review this page periodically to stay informed.
        </P>
      ),
    },
  ],
};

/** Route: /legal/community-guidelines — just wires the article data into the layout. */
export function CommunityGuidelinesPage() {
  return <ArticleLayout data={communityGuidelinesData} />;
}