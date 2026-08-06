import ArticleLayout, { type ArticleData } from "../components/ArticleLayout";
import { InfoBox, P } from "../components/LegalContent";

const disclaimerData: ArticleData = {
  eyebrow: "Legal",
  title: "Disclaimer",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "general-information",
      title: "1. General Information",
      content: (
        <P>
          The information provided on Sangum is for general informational purposes only. While we
          aim to keep content accurate and up to date, we make no representations or warranties of
          any kind, express or implied, about the completeness, accuracy, reliability, or
          availability of the Platform or the information, products, or services it contains.
        </P>
      ),
    },
    {
      id: "user-generated-content",
      title: "2. User-Generated Content",
      content: (
        <>
          <P className="mb-4">
            Sangum hosts content created and shared by our community members. Views, opinions, and
            information expressed in User Content belong solely to the individual authors and do
            not represent the views of Sangum.
          </P>
          <InfoBox>
            We do not review or verify User Content for accuracy before it&apos;s published. Use
            your own judgment before relying on information shared by other users.
          </InfoBox>
        </>
      ),
    },
    {
      id: "no-professional-advice",
      title: "3. No Professional Advice",
      content: (
        <P>
          Nothing on Sangum should be construed as professional, legal, financial, or technical
          advice. Any reliance you place on information found on the Platform is strictly at your
          own risk. You should seek independent, qualified advice before acting on anything you
          read here.
        </P>
      ),
    },
    {
      id: "external-links",
      title: "4. External Links",
      content: (
        <P>
          The Platform may contain links to external websites that are not provided or maintained
          by us. We do not guarantee the accuracy, relevance, or completeness of any information
          on these external sites and are not responsible for their content or practices.
        </P>
      ),
    },
    {
      id: "limitation-of-liability",
      title: "5. Limitation of Liability",
      content: (
        <P>
          In no event will Sangum be liable for any loss or damage, including without limitation,
          indirect or consequential loss or damage, arising from loss of data or profits arising
          out of, or in connection with, the use of the Platform.
        </P>
      ),
    },
    {
      id: "changes",
      title: "6. Changes to This Disclaimer",
      content: (
        <P>
          We may update this Disclaimer from time to time to reflect changes to our practices or
          for other operational, legal, or regulatory reasons. We encourage you to review this
          page periodically.
        </P>
      ),
    },
    {
      id: "contact",
      title: "7. Contact",
      content: (
        <P>
          If you have any questions about this Disclaimer, please reach out through the support
          channels listed on the Platform.
        </P>
      ),
    },
  ],
};

/** Route: /legal/disclaimer — just wires the article data into the layout. */
export function DisclaimerPage() {
  return <ArticleLayout data={disclaimerData} />;
}