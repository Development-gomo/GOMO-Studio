/**
 * Canonical marketing routes and CTA targets for consistent internal linking.
 */
import { MARKETING_CONTACT_PATH, STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";

export const SITE_ROUTES = {
  home: SITE_PATHS.home,
  features: SITE_PATHS.platform.features,
  pricing: SITE_PATHS.platform.pricing,
  about: SITE_PATHS.company.about,
  contact: SITE_PATHS.company.contact,
  contactThankYou: SITE_PATHS.company.contactThankYou,
  blogs: SITE_PATHS.resources.blogs,
  blogPost: blogPostPath,
  integrations: SITE_PATHS.resources.integrations,
  careers: SITE_PATHS.resources.careers,
  cookies: SITE_PATHS.legal.cookies,
  brand: SITE_PATHS.company.brand,
  faq: "/#faq",
  capabilities: {
    aiContent: SITE_PATHS.capabilities.aiContent,
    visualEditor: SITE_PATHS.capabilities.visualEditor,
    publishingWorkflow: SITE_PATHS.capabilities.publishingWorkflow,
  },
};

export const MARKETING_CTAS = {
  signup: { label: "Start free", href: STUDIO_LOGIN_PATH },
  login: { label: "Login", href: STUDIO_LOGIN_PATH },
  demo: { label: "Book a demo", href: MARKETING_CONTACT_PATH },
  pricing: { label: "View pricing", href: SITE_ROUTES.pricing },
};

export { MARKETING_CONTACT_PATH, PRIVACY_POLICY_PATH, STUDIO_LOGIN_PATH, TERMS_OF_SERVICE_PATH };
