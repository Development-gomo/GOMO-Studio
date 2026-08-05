import { getAllBlogSlugs } from "../content/blog-slugs.js";
import { SITE_PATHS } from "./site-paths.js";

const RETIRED_BLOG_SLUGS = [
  "how-to-build-a-thriving-remote-team-culture",
  "how-to-build-a-thriving-remote-team-culture-2",
  "how-to-build-a-thriving-remote-team-culture-3",
  "how-to-build-a-thriving-remote-team-culture-4",
  "how-to-build-a-thriving-remote-team-culture-5",
  "how-to-build-a-thriving-remote-team-culture-6",
  "how-to-build-a-thriving-remote-team-culture-7",
  "how-to-build-a-thriving-remote-team-culture-8",
  "how-to-build-a-thriving-remote-team-culture-9",
  "how-to-build-a-thriving-remote-team-culture-10",
  "ai-powered-analytics-future-of-marketing",
  "maximizing-roas-with-conversational-ai",
  "automated-client-reporting-agencies",
  "ga4-insights-without-sql",
  "bigquery-unified-marketing-data",
  // Retired with the Conalytic → GOMO Studio rebrand (old analytics-product posts).
  "ga4-traffic-drop-search-console",
  "google-ads-ga4-conversion-discrepancy",
  "kpis-tracker-marketing-goals-guide",
  "marketing-kpi-targets-goal-setting",
  "rules-based-vs-ai-kpi-status",
  "report-builder-html-marketing-reports-guide",
  "html-vs-pdf-live-dashboard-reports",
  "should-ai-write-client-reports",
  "client-marketing-report-structure",
  "cross-channel-reporting-gsc-ga4-ads",
  "conversational-analytics-marketing-chat-guide",
  "tracking-ai-assistant-traffic-ga4",
  "what-to-ask-ga4-data",
];

/** 301 redirects from legacy flat URLs / retired products to current canonical paths. */
export function getLegacyMarketingRedirects() {
  const blogIndex = SITE_PATHS.resources.blogs;

  const blogSlugRedirects = getAllBlogSlugs().map((slug) => ({
    source: `/${slug}`,
    destination: `${blogIndex}/${slug}`,
    permanent: true,
  }));

  return [
    { source: "/features", destination: SITE_PATHS.platform.features, permanent: true },
    { source: "/pricing", destination: SITE_PATHS.platform.pricing, permanent: true },
    { source: "/blogs", destination: blogIndex, permanent: true },
    { source: "/blogs/:slug", destination: `${blogIndex}/:slug`, permanent: true },
    { source: "/blog", destination: blogIndex, permanent: true },
    { source: "/resources/blogs/page/:page", destination: blogIndex, permanent: false },
    { source: "/integrations", destination: SITE_PATHS.resources.integrations, permanent: true },
    { source: "/careers", destination: SITE_PATHS.resources.careers, permanent: true },
    { source: "/about-us", destination: SITE_PATHS.company.about, permanent: true },
    { source: "/about", destination: SITE_PATHS.company.about, permanent: true },
    { source: "/contact", destination: SITE_PATHS.company.contact, permanent: true },
    { source: "/contact-us", destination: SITE_PATHS.company.contact, permanent: true },
    { source: "/contact/book", destination: SITE_PATHS.company.contact, permanent: true },
    { source: "/contact/thank-you", destination: SITE_PATHS.company.contactThankYou, permanent: true },
    { source: "/dev/email-preview", destination: SITE_PATHS.company.contact, permanent: false },
    { source: "/brand", destination: SITE_PATHS.company.brand, permanent: true },
    { source: "/privacy", destination: SITE_PATHS.legal.privacy, permanent: true },
    { source: "/privacy-and-policy", destination: SITE_PATHS.legal.privacy, permanent: true },
    { source: "/terms", destination: SITE_PATHS.legal.terms, permanent: true },
    { source: "/terms-of-service", destination: SITE_PATHS.legal.terms, permanent: true },
    { source: "/cookies", destination: SITE_PATHS.legal.cookies, permanent: true },
    // Rebrand: old Conalytic product pages → new GOMO Studio capability pages.
    { source: "/products/conversational-analytics", destination: SITE_PATHS.capabilities.aiContent, permanent: true },
    { source: "/products/report-builder", destination: SITE_PATHS.capabilities.visualEditor, permanent: true },
    { source: "/products/kpis-tracker", destination: SITE_PATHS.capabilities.publishingWorkflow, permanent: true },
    { source: "/products/applicant-tracking-system", destination: SITE_PATHS.platform.features, permanent: true },
    { source: "/products/:path*", destination: SITE_PATHS.platform.features, permanent: true },
    ...blogSlugRedirects,
    ...RETIRED_BLOG_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: blogIndex,
      permanent: true,
    })),
  ];
}
