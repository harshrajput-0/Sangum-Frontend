import ArticleLayout, { type ArticleData } from "../components/ArticleLayout";
import { InfoBox, WarningBox, P, UL } from "../components/LegalContent";

const reportingPolicyData: ArticleData = {
  eyebrow: "Legal",
  title: "Reporting Policy",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      content: (
        <P>
          This policy explains how to report content or behavior on Sangum that you believe
          violates our{" "}
          <a
            href="/legal/community-guidelines"
            className="text-primary-light underline underline-offset-2"
          >
            Community Guidelines
          </a>{" "}
          or{" "}
          <a href="/legal/content-policy" className="text-primary-light underline underline-offset-2">
            Content Policy
          </a>
          , and what happens after you submit a report.
        </P>
      ),
    },
    {
      id: "what-to-report",
      title: "2. What You Can Report",
      content: (
        <>
          <P className="mb-3">You can report:</P>
          <UL>
            <li>Individual posts, comments, or messages</li>
            <li>User profiles engaged in harassment, impersonation, or spam</li>
            <li>Entire communities that violate our guidelines</li>
            <li>Intellectual property concerns, including copyright and trademark issues</li>
          </UL>
        </>
      ),
    },
    {
      id: "how-to-report",
      title: "3. How to Submit a Report",
      content: (
        <>
          <P className="mb-4">
            Use the report option available on posts, comments, and profiles throughout the
            Platform. You&apos;ll be asked to select a reason and can add context to help our team
            review the report accurately.
          </P>
          <InfoBox>
            The more specific detail you provide, the faster and more accurately we can review your
            report.
          </InfoBox>
        </>
      ),
    },
    {
      id: "review-process",
      title: "4. How Reports Are Reviewed",
      content: (
        <P>
          Reports are reviewed against our Community Guidelines and Content Policy. Depending on
          severity, review may happen through automated systems, our trust and safety team, or
          both. We prioritize reports involving safety risks or illegal content.
        </P>
      ),
    },
    {
      id: "possible-outcomes",
      title: "5. Possible Outcomes",
      content: (
        <>
          <P className="mb-3">After review, an outcome may include:</P>
          <UL>
            <li>No action, if the content does not violate our policies</li>
            <li>Content removal or restriction of visibility</li>
            <li>A warning to the account responsible</li>
            <li>Temporary or permanent suspension of the account</li>
          </UL>
        </>
      ),
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality",
      content: (
        <>
          <P className="mb-4">
            We keep the identity of the reporting user confidential from the reported user to the
            extent possible, except where disclosure is required by law.
          </P>
          <WarningBox>
            Submitting reports in bad faith, such as to harass another member or suppress
            legitimate content, is itself a violation of our Community Guidelines.
          </WarningBox>
        </>
      ),
    },
    {
      id: "appeals",
      title: "7. Appeals",
      content: (
        <P>
          If action was taken on your content or account and you believe it was a mistake, you can
          appeal through the support channels listed on the Platform.
        </P>
      ),
    },
    {
      id: "changes",
      title: "8. Changes to This Policy",
      content: (
        <P>
          We may update this Reporting Policy from time to time to improve how we handle reports.
          We encourage you to review this page periodically.
        </P>
      ),
    },
  ],
};

/** Route: /legal/reporting-policy — just wires the article data into the layout. */
export function ReportingPolicyPage() {
  return <ArticleLayout data={reportingPolicyData} />;
}