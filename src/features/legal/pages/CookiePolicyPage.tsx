import ArticleLayout, { type ArticleData } from "../components/ArticleLayout";
import { InfoBox, P, H3, UL } from "../components/LegalContent";

const cookiePolicyData: ArticleData = {
  eyebrow: "Legal",
  title: "Cookie Policy",
  lastUpdated: "August 1, 2026",
  backHref: "/legal",
  backLabel: "Back to Legal",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies",
      content: (
        <P>
          Cookies are small text files placed on your device when you visit a website. They are
          widely used to make websites work more efficiently, remember your preferences, and
          provide information to the site owners.
        </P>
      ),
    },
    {
      id: "how-we-use-cookies",
      title: "2. How We Use Cookies",
      content: (
        <>
          <H3 id="essential-cookies">2.1 Essential Cookies</H3>
          <P className="mb-6">
            These cookies are necessary for the Platform to function, such as keeping you signed in
            and remembering items in your session. The Platform cannot function properly without
            them.
          </P>
          <H3 id="preference-cookies">2.2 Preference Cookies</H3>
          <P className="mb-6">
            These cookies remember choices you make, such as display settings, so we can provide a
            more personalized experience on return visits.
          </P>
          <H3 id="analytics-cookies">2.3 Analytics Cookies</H3>
          <P>
            We use analytics cookies to understand how visitors interact with the Platform, which
            helps us measure and improve its performance.
          </P>
        </>
      ),
    },
    {
      id: "third-party-cookies",
      title: "3. Third-Party Cookies",
      content: (
        <P>
          Some cookies are placed by third-party services that appear on our pages, such as
          analytics providers. We do not control these cookies, and we encourage you to review the
          relevant third party&apos;s cookie policy for more information.
        </P>
      ),
    },
    {
      id: "managing-cookies",
      title: "4. Managing Your Cookie Preferences",
      content: (
        <>
          <P className="mb-3">You can control cookies through:</P>
          <UL className="mb-4">
            <li>The cookie preferences banner shown on your first visit</li>
            <li>Your account cookie settings, where available</li>
            <li>Your browser settings, which let you block or delete cookies</li>
          </UL>
          <InfoBox>
            Disabling essential cookies may prevent parts of the Platform, such as staying signed
            in, from working correctly.
          </InfoBox>
        </>
      ),
    },
    {
      id: "changes",
      title: "5. Changes to This Cookie Policy",
      content: (
        <P>
          We may update this Cookie Policy from time to time to reflect changes in the cookies we
          use or for other operational, legal, or regulatory reasons. We encourage you to review
          this page periodically.
        </P>
      ),
    },
    {
      id: "contact",
      title: "6. Contact",
      content: (
        <P>
          If you have questions about our use of cookies, please reach out through the support
          channels listed on the Platform.
        </P>
      ),
    },
  ],
};

/** Route: /legal/cookie-policy — just wires the article data into the layout. */
export function CookiePolicyPage() {
  return <ArticleLayout data={cookiePolicyData} />;
}