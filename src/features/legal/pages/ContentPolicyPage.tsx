import ArticleLayout, { type ArticleData } from "../components/ArticleLayout";
import { InfoBox, P, H3, UL } from "../components/LegalContent";

const contentPolicyData: ArticleData = {
  eyebrow: "Legal",
  title: "Content Policy",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "scope",
      title: "1. Scope",
      content: (
        <P>
          This Content Policy describes the types of content that are and aren&apos;t allowed on
          Sangum. It applies to all content posted on the Platform, including posts, comments,
          profiles, and shared files.
        </P>
      ),
    },
    {
      id: "allowed-content",
      title: "2. Allowed Content",
      content: (
        <P>
          Sangum welcomes original technical writing, project showcases, questions, discussions,
          tutorials, and resources relevant to software development and the communities you
          participate in, as long as it complies with this policy and our{" "}
          <a
            href="/legal/community-guidelines"
            className="text-primary-light underline underline-offset-2"
          >
            Community Guidelines
          </a>
          .
        </P>
      ),
    },
    {
      id: "prohibited-content",
      title: "3. Prohibited Content",
      content: (
        <>
          <H3 id="illegal-content">3.1 Illegal Content</H3>
          <P className="mb-6">
            Content that violates applicable law, including content that infringes intellectual
            property rights, facilitates illegal activity, or violates export control or sanctions
            regulations, is not permitted.
          </P>
          <H3 id="harmful-content">3.2 Harmful Content</H3>
          <P className="mb-6">
            Content that promotes violence, self-harm, terrorism, or exploitation of minors is
            strictly prohibited and will be removed immediately, with the account permanently
            banned.
          </P>
          <H3 id="malicious-code">3.3 Malicious Code</H3>
          <P>
            Sharing malware, exploits, or code intended to gain unauthorized access to systems or
            cause harm is not allowed, except in dedicated security-research communities that
            explicitly permit it under their own posted rules.
          </P>
        </>
      ),
    },
    {
      id: "spam-and-manipulation",
      title: "4. Spam and Manipulation",
      content: (
        <>
          <P className="mb-3">The following are considered spam or manipulation and are not allowed:</P>
          <UL className="mb-4">
            <li>Repetitive, low-effort, or automatically generated posts</li>
            <li>Unsolicited promotion or advertising unrelated to a community&apos;s purpose</li>
            <li>Vote or engagement manipulation, including fake accounts</li>
            <li>Content designed to mislead or deceive other members</li>
          </UL>
          <InfoBox>
            Sharing your own projects is welcome in most communities, but check individual
            community rules for specific self-promotion guidelines.
          </InfoBox>
        </>
      ),
    },
    {
      id: "content-review",
      title: "5. Content Review and Removal",
      content: (
        <P>
          We review content that is reported by users or flagged by automated systems. Content that
          violates this policy may be removed, and repeated or severe violations can result in
          account suspension or termination as described in our Terms of Service.
        </P>
      ),
    },
    {
      id: "appeals",
      title: "6. Appeals",
      content: (
        <P>
          If you believe your content was removed in error, you may appeal the decision through the
          support channels listed on the Platform, and we will review the removal.
        </P>
      ),
    },
    {
      id: "changes",
      title: "7. Changes to This Policy",
      content: (
        <P>
          We may update this Content Policy from time to time to address new types of content or
          emerging risks on the Platform. We encourage you to review this page periodically.
        </P>
      ),
    },
  ],
};

/** Route: /legal/content-policy — just wires the article data into the layout. */
export function ContentPolicyPage() {
  return <ArticleLayout data={contentPolicyData} />;
}