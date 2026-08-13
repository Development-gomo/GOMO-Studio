import { SITE_ROUTES } from "@/lib/site-links";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import {
  LegalCallout,
  LegalH3,
  LegalLink,
  LegalOrderedList,
  LegalProseList,
  LegalSection,
} from "@/components/legal/LegalPageShell";
import { BRAND } from "@/lib/brand";
import {
  getLegalContactEmail,
  getLegalEntityName,
  getLegalRegisteredAddress,
} from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH } from "@/lib/legal-urls";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";

export async function generateMetadata() {
  return buildRouteMetadata(PRIVACY_POLICY_PATH, {
    title: "Privacy Policy",
    description: `How ${BRAND.name} collects, uses, and protects personal data.`,
  });
}

const PRIVACY_NAV = [
  { id: "controller", label: "Data controller" },
  { id: "scope", label: "Scope" },
  { id: "personal-data", label: "Personal data" },
  { id: "purposes", label: "Purposes & legal bases" },
  { id: "ai", label: "AI & automation" },
  { id: "cookies", label: "Cookies" },
  { id: "sharing", label: "Recipients" },
  { id: "processor", label: "Business customers" },
  { id: "transfers", label: "International" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your rights" },
  { id: "marketing", label: "Communications" },
  { id: "us-states", label: "US state laws" },
  { id: "children", label: "Children" },
  { id: "integrations", label: "Platforms & APIs" },
  { id: "google-user-data", label: "Google user data" },
  { id: "responsibilities", label: "Your responsibilities" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  const entity = getLegalEntityName();
  const email = getLegalContactEmail();
  const address = getLegalRegisteredAddress();

  return (
    <LegalDocumentLayout
      docKind="privacy"
      title="Privacy Policy"
      subtitle={`${BRAND.name} — transparency & trust`}
      description={`${entity} operates ${BRAND.name}, a conversational analytics product that helps you connect authorized marketing and advertising accounts (such as Google Analytics 4, Google Search Console, Google Ads, and Meta Ads, where we support them) and interact with your data through AI-assisted chat, subject to the features available in your plan. We are based in Pune, Maharashtra, India. This Privacy Policy explains how we (“we”, “us”, “our”) collect, use, disclose, store, and protect personal data when you use our website, create or use an account, connect third-party platforms, or otherwise use the Service. It supports transparency under the EU and UK GDPR, India’s Digital Personal Data Protection Act, 2023 (where applicable), other applicable privacy laws, and the expectations of partners such as Google, Meta, and LinkedIn when you grant OAuth access.`}
      navItems={PRIVACY_NAV}
    >
      <LegalSection id="controller" title="1. Data controller and contact">
        <p>
          The <strong>controller</strong> of personal data described in this policy is
          the entity identified below, unless we notify you that another entity is
          controller for a specific offering (for example, your employer under an
          enterprise agreement).
        </p>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
          <p className="font-semibold text-white">{entity}</p>
          <p className="mt-2 whitespace-pre-line text-[0.9rem] text-white/70">
            {address}
          </p>
          <p className="mt-3 text-[0.9rem]">
            <span className="text-white/60">Email: </span>
            <LegalLink href={`mailto:${email}`}>{email}</LegalLink>
          </p>
        </div>
        <LegalH3>Representatives and processors</LegalH3>
        <p>
          Where we act as a <strong>processor</strong> for a business customer (for
          example, processing end-user data solely on their documented instructions),
          that customer is typically the controller for that processing; our customer
          agreement and data processing terms govern those relationships. This policy
          still applies to personal data for which we are controller (such as account
          data on our systems and operational logs), unless a separate notice applies.
        </p>
        <p>
          If we appoint an EU or UK representative or a data protection officer where
          legally required, we will publish their contact details here or in your
          contract documentation.
        </p>
      </LegalSection>

      <LegalSection id="scope" title="2. Scope and relationship to other notices">
        <p>This policy applies to:</p>
        <LegalProseList
          items={[
            "Visitors to our marketing site and authenticated users of the Service;",
            "Individuals whose personal data we receive when they are invited or provisioned as users by an organization;",
            "Personal data we process to provide OAuth-based integrations, billing, customer support, security, and product analytics.",
          ]}
        />
        <p>
          Third-party sites, ad platforms, or social networks that we link to have
          their own policies. When you connect Google, Meta, LinkedIn, or other
          products, their terms and privacy notices also apply to data held on their
          systems.
        </p>
      </LegalSection>

      <LegalSection id="personal-data" title="3. Categories of personal data">
        <p>
          We adhere to <strong>data minimization</strong>: we collect and process data
          that is adequate, relevant, and limited to what is necessary for the purposes
          in Section 4. Depending on your use of the Service, categories may include:
        </p>
        <LegalH3>3.1 Account, identity, and profile</LegalH3>
        <LegalProseList
          items={[
            "Name, email address, internal user identifiers, authentication data, and profile fields you provide (such as display name or avatar image).",
            "Role, organization affiliation, subscription tier, and entitlement flags maintained for access control and billing.",
          ]}
        />
        <LegalH3>3.2 Service usage, content, and inferences</LegalH3>
        <LegalProseList
          items={[
            "Chat messages, prompts, refinements, attachments, and metadata (e.g. selected AI model, chat and message identifiers, timestamps).",
            "Usage metrics such as token or cost estimates, feature usage, and in-product events used for billing, quotas, reliability, and product improvement.",
          ]}
        />
        <LegalH3>3.3 Technical, device, and security data</LegalH3>
        <LegalProseList
          items={[
            "IP address, approximate location derived from IP, device and browser type, operating system, referrer, session identifiers, and diagnostic logs.",
            "Security signals such as failed logins, rate-limit events, and fraud-prevention telemetry.",
          ]}
        />
        <LegalH3>3.4 OAuth, integrations, and marketing-platform data</LegalH3>
        <LegalProseList
          items={[
            "OAuth tokens, refresh tokens where issued, granted scopes, connected account identifiers, and resource identifiers you select (e.g. GA4 properties, Search Console sites, ad account IDs).",
            "Data retrieved from authorized third-party APIs to fulfill your queries (e.g. aggregated metrics, campaign metadata). This may include identifiers of individuals only where those platforms return such fields in the datasets you request — we process such data solely to provide the Service and as described here.",
          ]}
        />
        <LegalH3>3.5 Billing and payments</LegalH3>
        <LegalProseList
          items={[
            "Billing contact details, plan, invoices or receipt references, payment status, and payment-provider transaction IDs.",
            "We do not store full payment card numbers on our infrastructure; card data is handled by certified payment processors (e.g. PayPal) under their terms.",
          ]}
        />
        <LegalH3>3.6 Enterprise “bring your own key” (BYOK)</LegalH3>
        <p>
          If enabled for your organization, API keys for AI providers may be stored in{" "}
          <strong>encrypted form</strong> so the Service can route inference requests. We
          do not use those keys for unrelated purposes.
        </p>
        <LegalH3>3.7 Special categories and sensitive data</LegalH3>
        <p>
          We do not intentionally collect special categories of data under GDPR Article 9
          (such as health, biometric data for identification, or political opinions). You
          should not include such information in prompts, uploads, or connection scopes
          unless you have a clear legal basis and our prior agreement where required.
        </p>
        <LegalH3>3.8 How we obtain data</LegalH3>
        <LegalOrderedList
          items={[
            "Directly from you when you register, connect integrations, use chat, upload files, correspond with us, or manage billing.",
            "Automatically through your device and our servers when you use the Service.",
            "From third parties such as authentication providers, payment processors, and marketing platforms you authorize via OAuth.",
            "From your employer or reseller when they provision accounts or share contact details for administration.",
          ]}
        />
      </LegalSection>

      <LegalSection id="purposes" title="4. Purposes and legal bases (GDPR)">
        <p>
          Where GDPR applies, we rely on one or more of the following legal bases under
          Article 6(1):
        </p>
        <LegalProseList
          items={[
            <>
              <strong>Contract (Art. 6(1)(b)).</strong> Providing the Service you request:
              account management, chat and analytics features, OAuth-based data retrieval,
              billing for paid plans, and essential service communications.
            </>,
            <>
              <strong>Legitimate interests (Art. 6(1)(f)).</strong> Securing the Service,
              preventing abuse, debugging, improving reliability and performance, internal
              reporting, and limited product analytics, balanced against your rights. You may
              object where applicable (Art. 21).
            </>,
            <>
              <strong>Legal obligation (Art. 6(1)(c)).</strong> Tax, accounting, regulatory
              compliance, and responding to lawful requests from authorities.
            </>,
            <>
              <strong>Consent (Art. 6(1)(a)).</strong> Where required for non-essential
              cookies, certain marketing, or specific optional features; you may withdraw
              consent at any time without affecting prior lawful processing.
            </>,
          ]}
        />
        <LegalH3>Retention drivers</LegalH3>
        <p>
          Purposes drive how long we keep data (see Section 10). We do not use personal
          data for <strong>automated decision-making</strong> that produces legal or
          similarly significant effects solely by automated means without human review.
          Billing and fraud checks may involve rules-based systems with human oversight
          where appropriate.
        </p>
      </LegalSection>

      <LegalSection id="ai" title="5. Artificial intelligence, models, and prompts">
        <p>
          The Service may send your prompts, selected context (including retrieved
          marketing data and uploaded reference files), and system instructions to{" "}
          <strong>third-party model providers</strong> (such as OpenAI, Anthropic, or
          Google) to generate responses. Those providers act as{" "}
          <strong>subprocessors</strong> when we host keys, or may process data as
          independent controllers under their own policies when your organization
          supplies keys directly.
        </p>
        <LegalProseList
          items={[
            "Outputs may be incorrect, incomplete, or outdated. They are not a substitute for professional advice or for verifying metrics in source systems.",
            "Unless we expressly notify you and obtain consent where required, we do not use your content to train public foundation models for our own purposes.",
            "We may log metadata (e.g. model, token counts, error codes) for reliability, billing, and security.",
          ]}
        />
        <LegalH3>Human review</LegalH3>
        <p>
          For high-risk decisions affecting individuals (for example, employment or
          credit), you must not rely solely on model outputs without appropriate human
          oversight and lawful grounds.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="6. Cookies and similar technologies">
        <p>
          We use <strong>cookies</strong>, local storage, and similar technologies for:
        </p>
        <LegalProseList
          items={[
            <>
              <strong>Strictly necessary.</strong> Session continuity, load balancing,
              security, and CSRF protection.
            </>,
            <>
              <strong>Functional.</strong> Preferences where you opt in or where essential to
              a feature you activate.
            </>,
            <>
              <strong>Analytics or performance.</strong> E.g. Vercel Analytics / Speed
              Insights or comparable tools if enabled, to understand aggregate performance.
            </>,
          ]}
        />
        <p>
          Where non-essential cookies require consent under ePrivacy or local law, we
          will obtain it via a suitable mechanism before setting those cookies. You can
          control cookies through your browser; blocking strictly necessary cookies may
          break sign-in or core features. See also our{" "}
          <LegalLink href={SITE_ROUTES.cookies}>Cookies Policy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="sharing" title="7. Recipients, subprocessors, and disclosures">
        <p>We disclose personal data to:</p>
        <LegalProseList
          items={[
            <>
              <strong>Infrastructure and authentication.</strong> E.g. Google Firebase /
              Google Cloud (depending on configuration) for hosting, database, identity, and
              file storage.
            </>,
            <>
              <strong>Payments.</strong> PayPal (or other processors you enable).
            </>,
            <>
              <strong>AI inference.</strong> OpenAI, Anthropic, Google, or other providers
              corresponding to the models you use.
            </>,
            <>
              <strong>Edge and observability.</strong> E.g. Vercel for hosting, analytics,
              and logs.
            </>,
            <>
              <strong>Professional advisers.</strong> Lawyers, accountants, or auditors
              under confidentiality obligations.
            </>,
            <>
              <strong>Authorities.</strong> When required by law, court order, or lawful
              governmental request, or to protect rights, safety, and security.
            </>,
          ]}
        />
        <p>
          <strong>Google user data.</strong> For information received from Google APIs
          (including how we access, use, store, share, transfer, or disclose that data, and
          the named parties involved), see{" "}
          <LegalLink href="#google-user-data">
            Section 16A — Google user data: access, use, storage, and sharing
          </LegalLink>
          .
        </p>
        <p>
          We enter into <strong>data processing agreements</strong> or equivalent
          contractual terms with subprocessors where GDPR requires. A summary list of
          categories of subprocessors is available on request at{" "}
          <LegalLink href={`mailto:${email}`}>{email}</LegalLink>. We will notify business
          customers of material subprocessor changes where our agreements require.
        </p>
      </LegalSection>

      <LegalSection id="processor" title="8. Business customers and processor role">
        <p>
          If your organization subscribes to {BRAND.name} and we process personal data
          about your end users <strong>only</strong> on your documented instructions, we
          are a <strong>processor</strong> for that processing. Your organization is
          typically the controller. The applicable order form, data processing agreement
          (DPA), and security exhibit govern that relationship and prevail over
          conflicting terms in this policy to the extent permitted by law.
        </p>
        <p>
          We assist controllers, as required by Article 28 GDPR, by implementing
          appropriate technical and organizational measures and by supporting requests
          from individuals where contractually agreed.
        </p>
      </LegalSection>

      <LegalSection id="transfers" title="9. International transfers of personal data">
        <p>
          We and our subprocessors may process data in the <strong>EEA</strong>, the{" "}
          <strong>UK</strong>, the <strong>United States</strong>,{" "}
          <strong>India</strong>, and other regions. Where GDPR applies and personal data
          is transferred to countries not subject to an adequacy decision, we implement
          appropriate safeguards such as the{" "}
          <strong>EU Standard Contractual Clauses</strong> (2021), supplemented by transfer
          impact assessments and, where relevant, the <strong>UK Addendum</strong> or{" "}
          <strong>International Data Transfer Agreement</strong>.
        </p>
        <p>
          You may request a copy of relevant transfer mechanisms by contacting{" "}
          <LegalLink href={`mailto:${email}`}>{email}</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="10. Retention">
        <p>We retain personal data only as long as necessary for the purposes above:</p>
        <LegalProseList
          items={[
            <>
              <strong>Account data.</strong> For the life of the account and a reasonable
              period thereafter for backups, disputes, and legal claims unless a shorter
              period is required by law.
            </>,
            <>
              <strong>Chat and message content.</strong> According to product settings, your
              deletion actions, and backup cycles; some residual copies may persist for a
              limited time in encrypted backups.
            </>,
            <>
              <strong>OAuth tokens.</strong> Until you disconnect an integration, revoke
              access at the provider, delete your account, or we detect invalid tokens.
            </>,
            <>
              <strong>Billing records.</strong> As required by tax, accounting, and
              payment network rules (often several years).
            </>,
            <>
              <strong>Security logs.</strong> Typically a rolling window unless extended for
              incident investigation.
            </>,
          ]}
        />
        <p>
          When retention ends, we delete or irreversibly anonymize data where feasible.
        </p>
      </LegalSection>

      <LegalSection id="security" title="11. Security and personal data breaches">
        <p>
          We implement <strong>technical and organizational measures</strong> appropriate
          to the risk, including encryption in transit, access controls, least-privilege
          administrative access, logging and monitoring, secure development practices,
          and vendor due diligence. No system is perfectly secure.
        </p>
        <LegalH3>Personal data breaches</LegalH3>
        <p>
          In the event of a personal data breach likely to result in risk to individuals,
          we will comply with applicable <strong>notification obligations</strong> to
          supervisory authorities and, where required, to affected data subjects, without
          undue delay, in line with GDPR Articles 33–34, the Digital Personal Data
          Protection Act, 2023 (where applicable), and other comparable laws.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="12. Your privacy rights">
        <p>
          Subject to applicable law, you may have the following rights regarding personal
          data we process as controller:
        </p>
        <LegalOrderedList
          items={[
            <>
              <strong>Access.</strong> Obtain confirmation of processing and a copy of your
              personal data (GDPR Art. 15).
            </>,
            <>
              <strong>Rectification.</strong> Correct inaccurate data (Art. 16).
            </>,
            <>
              <strong>Erasure.</strong> Request deletion where grounds apply (Art. 17).
            </>,
            <>
              <strong>Restriction.</strong> Limit processing in certain cases (Art. 18).
            </>,
            <>
              <strong>Portability.</strong> Receive structured, machine-readable data you
              provided where processing is based on consent or contract and automated (Art.
              20).
            </>,
            <>
              <strong>Objection.</strong> Object to processing based on legitimate interests
              or to direct marketing (Art. 21).
            </>,
            <>
              <strong>Withdraw consent.</strong> Where processing is consent-based (Art.
              7(3)).
            </>,
            <>
              <strong>Lodge a complaint.</strong> With your local supervisory authority
              (Art. 77).
            </>,
          ]}
        />
        <p>
          To exercise rights, contact us at{" "}
          <LegalLink href={`mailto:${email}`}>{email}</LegalLink>
          . We may need to verify your identity. We typically respond within{" "}
          <strong>one month</strong> (or timelines required by applicable law), extendable
          where complexity permits under law. You may also use in-product tools (e.g.
          account deletion) where available.
        </p>
        <LegalH3>India</LegalH3>
        <p>
          Where India’s <strong>Digital Personal Data Protection Act, 2023</strong> (DPDP
          Act) applies to our processing of your personal data, you may have rights such
          as obtaining information about processing, correction and erasure, grievance
          redress through {entity}, and nomination, as described in that law and its
          rules. Use the contact details in Section 1 and Section 19 to reach us.
        </p>
      </LegalSection>

      <LegalSection id="marketing" title="13. Marketing and service communications">
        <p>
          We may send <strong>transactional</strong> messages (security alerts, billing
          receipts, policy updates where required) based on contract or legitimate
          interests. <strong>Marketing</strong> emails or in-product promotions, if any,
          are sent where permitted by law and, where required, only with your consent,
          with an unsubscribe option.
        </p>
      </LegalSection>

      <LegalSection id="us-states" title="14. United States — state privacy rights (summary)">
        <p>
          Residents of certain U.S. states (including California, Colorado, Virginia, and
          others with comprehensive privacy laws) may have rights to know, access,
          delete, correct, and opt out of certain processing, including “sale,”
          “sharing,” or targeted advertising as defined locally. We do not sell personal
          information for money. We may use analytics cookies or similar technologies as
          described in Section 6; where opt-out rights apply, we honor browser or
          platform signals if legally required.
        </p>
        <p>
          California residents may use an authorized agent as permitted by the CCPA/CPRA.
          We will not discriminate against you for exercising privacy rights.
        </p>
      </LegalSection>

      <LegalSection id="children" title="15. Children">
        <p>
          The Service is not directed to children under <strong>16</strong> (or the age
          of digital consent in your jurisdiction). We do not knowingly collect personal
          data from children. If you believe we have, contact us at{" "}
          <LegalLink href={`mailto:${email}`}>{email}</LegalLink> and we will take
          appropriate steps to delete it.
        </p>
      </LegalSection>

      <LegalSection id="integrations" title="16. Google, Meta, LinkedIn, and developer policies">
        <p>
          When you connect third-party products, you authorize us to access only the
          scopes and data needed for features you use. You remain responsible for
          complying with each platform’s developer policies, brand guidelines, and
          acceptable use rules.
        </p>
        <LegalH3>Google APIs</LegalH3>
        <p>
          Our use of information received from <strong>Google APIs</strong> adheres to the{" "}
          <LegalLink href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </LegalLink>
          , including the <strong>Limited Use</strong> requirements. The use of information
          received from Google APIs will adhere to the Google API Services User Data Policy,
          including the Limited Use requirements. Detailed disclosures on how we access, use,
          store, share, transfer, and disclose Google user data are in{" "}
          <LegalLink href="#google-user-data">Section 16A</LegalLink> below.
        </p>
        <LegalH3>Meta</LegalH3>
        <p>
          Meta integrations are subject to Meta’s Platform Terms, Developer Policies, and
          Marketing API terms. We access ad and insights data only as authorized by you
          and use it to power {BRAND.name} features you request.
        </p>
        <LegalH3>LinkedIn</LegalH3>
        <p>
          LinkedIn integrations are subject to LinkedIn’s API Terms of Use and advertising
          policies. Disconnecting an integration in {BRAND.name} or revoking access in
          LinkedIn stops new data pulls subject to caching and backup latency.
        </p>
      </LegalSection>

      <LegalSection
        id="google-user-data"
        title="16A. Google user data: access, use, storage, and sharing"
      >
        <p>
          This section specifically discloses how {BRAND.name} accesses, uses, stores,
          shares, transfers, and discloses <strong>Google user data</strong> obtained
          through Google APIs (including Google Analytics 4, Google Search Console, Google
          Ads, Google Tag Manager, Google OAuth / identity, and related Google API Services
          you authorize). It is intended to satisfy Google’s requirement that our Privacy
          Policy state with whom we share, transfer, or disclose Google user data.
        </p>

        <LegalH3>What Google user data we access</LegalH3>
        <LegalProseList
          items={[
            "OAuth tokens, refresh tokens (where issued), granted scopes, and connected Google account or resource identifiers you select (for example GA4 properties, Search Console sites, Google Ads customer IDs, or GTM containers).",
            "Data retrieved from authorized Google APIs to fulfill your requests (for example aggregated metrics, campaign or property metadata, and related reporting fields returned by those APIs).",
            "Basic Google account profile information needed for authentication when you sign in or connect with Google (such as name, email address, and profile identifiers), where applicable.",
          ]}
        />

        <LegalH3>How we use Google user data</LegalH3>
        <p>
          We use Google user data <strong>only</strong> to provide or improve user-facing
          features of {BRAND.name} that you choose to use — including connecting your Google
          accounts, retrieving and displaying metrics, answering chat questions, generating
          summaries or visualizations, enforcing quotas and security, and troubleshooting
          reliability issues. We do not use Google user data for any purpose other than those
          disclosed in this Privacy Policy.
        </p>

        <LegalH3>How we store Google user data</LegalH3>
        <p>
          Google user data (including OAuth tokens and retrieved Integration Data) is stored
          on our production infrastructure with encryption in transit, access controls, and
          least-privilege administrative access. Storage locations may include systems
          operated by the infrastructure providers named below. OAuth tokens are retained
          until you disconnect the integration, revoke access in your Google Account, delete
          your {BRAND.name} account, or we detect that tokens are invalid. Chat content that
          includes Google-derived metrics follows the retention rules in Section 10.
        </p>

        <LegalH3>
          With whom we share, transfer, or disclose Google user data
        </LegalH3>
        <p>
          We share, transfer, or disclose Google user data only to the following categories
          of recipients, and only as necessary to operate the Service you request or as
          required by law:
        </p>
        <LegalOrderedList
          items={[
            <>
              <strong>Infrastructure subprocessors (on our behalf).</strong>{" "}
              <strong>Google Firebase / Google Cloud</strong> (hosting, database, identity,
              and file storage, depending on configuration) and <strong>Vercel</strong>{" "}
              (application hosting, edge delivery, and operational logs). These providers
              process Google user data solely to store and deliver {BRAND.name} under our
              instructions.
            </>,
            <>
              <strong>AI inference subprocessors (to generate responses you request).</strong>{" "}
              When you use AI-assisted chat or related features, selected prompts and context
              — which may include Google user data you asked us to retrieve (for example
              metrics or campaign metadata from Google APIs) — are sent to third-party model
              providers such as <strong>OpenAI</strong>, <strong>Anthropic</strong>, and/or{" "}
              <strong>Google</strong> (corresponding to the model you use). Those providers
              act as <strong>subprocessors</strong> when we host API keys. If your organization
              supplies its own keys (BYOK), the provider may process that data under its own
              terms as disclosed to you for that configuration. We send only what is needed to
              produce the Output you request.
            </>,
            <>
              <strong>Users in your organization or workspace.</strong> Other authenticated
              users you invite or who share your {BRAND.name} organization may access Google
              user data you authorize for shared chats, connections, or resources, subject to
              your role and access controls.
            </>,
            <>
              <strong>Professional advisers.</strong> Lawyers, accountants, or auditors under
              confidentiality obligations, only when necessary (for example legal or compliance
              review).
            </>,
            <>
              <strong>Authorities and legal process.</strong> Courts, regulators, or other
              competent authorities when required by applicable law, court order, or lawful
              governmental request, or to protect rights, safety, and security.
            </>,
            <>
              <strong>Business transfers.</strong> In connection with a merger, acquisition,
              reorganization, or sale of assets, Google user data may be transferred to a
              successor entity, subject to this Privacy Policy and, where required by Google’s
              Limited Use rules, your explicit prior consent.
            </>,
          ]}
        />
        <p>
          We do <strong>not</strong> sell Google user data. We do <strong>not</strong>{" "}
          share, transfer, or disclose Google user data to advertising platforms, data
          brokers, or information resellers. We do <strong>not</strong> use Google user data
          for serving ads (including retargeting, personalized, or interest-based
          advertising), for determining credit-worthiness or lending, or to create, train, or
          improve generalized machine-learning or AI models unrelated to providing{" "}
          {BRAND.name}’s user-facing features for you.
        </p>

        <LegalH3>Limited Use affirmation</LegalH3>
        <p>
          {BRAND.name}’s use and transfer to any other app of information received from Google
          APIs will adhere to the{" "}
          <LegalLink href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </LegalLink>
          , including the <strong>Limited Use</strong> requirements.
        </p>
        <p>
          You can revoke {BRAND.name}’s access to your Google Account at any time in your{" "}
          <LegalLink href="https://myaccount.google.com/permissions">
            Google Account permissions
          </LegalLink>{" "}
          and/or by disconnecting the integration in {BRAND.name}.
        </p>
      </LegalSection>

      <LegalSection id="responsibilities" title="17. Your responsibilities">
        <LegalProseList
          items={[
            "Provide accurate account information and keep credentials secure.",
            "Ensure you have authority and lawful grounds to connect organizational accounts and to upload or describe personal data in prompts.",
            "Comply with applicable marketing, advertising, and data-protection laws when acting on insights from the Service.",
            "Promptly revoke OAuth access for departed employees or compromised accounts where your policies require.",
          ]}
        />
      </LegalSection>

      <LegalSection id="changes" title="18. Changes to this Privacy Policy">
        <p>
          We may update this policy to reflect legal, technical, or business changes. We
          will post the revised version with an updated “Last updated” date and, where
          required, provide additional notice (e.g. email or in-product banner). Material
          changes affecting processing described here will be communicated in line with
          applicable law.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="19. Contact">
        <p>
          For privacy questions or to exercise your rights, contact {entity}:
        </p>
        <LegalProseList
          items={[
            <>
              Email: <LegalLink href={`mailto:${email}`}>{email}</LegalLink>
            </>,
            <>
              Postal address:{" "}
              <span className="whitespace-pre-line">{address}</span>
            </>,
          ]}
        />
      </LegalSection>

      <LegalCallout variant="important" title="Legal disclaimer">
        This Privacy Policy describes how {entity} handles personal data in connection
        with {BRAND.name}. It is <strong>not legal advice</strong>. You may wish to have
        qualified counsel review it if your use of the Service changes materially or if
        applicable law requires additional disclosures.
      </LegalCallout>
    </LegalDocumentLayout>
  );
}
